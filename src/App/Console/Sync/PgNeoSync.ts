import * as Bluebird from 'bluebird';
import * as Knex from 'knex';
import * as ProgressBar from 'progress';

import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta'
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';

import { ISynsetDAO } from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';
import { ISenseDAO } from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';
import { ILemmaDAO } from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { ILanguageDAO, ILanguageKey } from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';
import { IDefinitionDAO } from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';

// pg queries
import LanguageQueries from 'src/App/Persistence/Repositories/Postgres/Queries/LanguageQueries';
import SynsetQueries from 'src/App/Persistence/Repositories/Postgres/Queries/SynsetQueries';
import SenseQueries from 'src/App/Persistence/Repositories/Postgres/Queries/SynsetQueries';
import LemmaQueries from 'src/App/Persistence/Repositories/Postgres/Queries/LemmaQueries';
import DefinitionQueries from 'src/App/Persistence/Repositories/Postgres/Queries/DefinitionQueries';

// neo4j commands
import LanguageCommandsGph from 'src/App/Persistence/Repositories/Neo4j/Commands/LanguageCommandsGph';
import SynsetCommandsGph from 'src/App/Persistence/Repositories/Neo4j/Commands/SynsetCommandsGph';
import SenseCommandsGph from 'src/App/Persistence/Repositories/Neo4j/Commands/SenseCommandsGph';
import LemmaCommandsGph from 'src/App/Persistence/Repositories/Neo4j/Commands/LemmaCommandsGph';
import DefinitionCommandsGph from 'src/App/Persistence/Repositories/Neo4j/Commands/DefinitionCommandsGph';

class PgNeoSync {
  private static _QueryBuilder = Knex({ client: 'pg' });
  private static _CHUNK_SIZE = 1;

  private static _PgDatabase;
  private static _NeoConnector;

  private static _SynsetCount = 0;
  private static _SynsetProcessedCount = 0;

  private static _ProgressBar;

  private static * _GetSynsetChunksGenerator() {
    const chunksTotal = Math.ceil(this._SynsetCount / this._CHUNK_SIZE);

    for (let i = 0; i < chunksTotal; i++) {
      const queryBuilder = this._QueryBuilder
        .select()
        .from(TableName.SYNSET)
        .offset(this._CHUNK_SIZE * i)
        .limit(this._CHUNK_SIZE);

      yield SynsetQueries.GetInstance().build<ISynsetDAO>(queryBuilder);
    }
  }

  private static async _SyncAllLanguages() {
    const languageQueries = LanguageQueries.GetInstance();
    const languageCommandsGph = LanguageCommandsGph.GetInstance();

    const languages = languageQueries.findAll();
    return Bluebird.each<ILanguageDAO, ILanguageKey>(languages, (language) => {
       return languageCommandsGph.createOne(language.id);
    })
  }

  private static async _SyncAllSynsets() {
    return new Bluebird(async (resolve, reject) => {
      for (let pChunk of this._GetSynsetChunksGenerator()) {
        await Promise
          .resolve(pChunk)
          .then((chunk) => {
            return this._SyncSynsetChunk(chunk);
          })
          .catch((e) => {
            return reject(e);
          })
      }

      return resolve();
    })
  }

  private static async _SyncSynsetChunk(chunk: ISynsetDAO[]) {
    return Bluebird.each(chunk, (synset) => {
      return this._SyncSynsetWithRelations(synset);
    });
  }

  private static async _SyncSynsetWithRelations(synset: ISynsetDAO, t?: any) {
    await SynsetCommandsGph.GetInstance().createOne(synset.id);

    await this._SyncDefinition(synset);
    await this._SyncSenseWithRelations(synset);

    this._SynsetProcessedCount++;

    return;
  }

  private static async _SyncSenseWithRelations(
    synset: ISynsetDAO, 
    t?: any
  ): Promise<void> {
    const senseQueries = SenseQueries.GetInstance();
    const senseCommandsGph = SenseCommandsGph.GetInstance();
    const queryBuilder = this._QueryBuilder
      .select()
      .from(TableName.SENSE)
      .where('synsetId', synset.id)

    const senses = await senseQueries.build<ISenseDAO>(queryBuilder);

    await Bluebird.each<ISenseDAO, void>(senses, async (sense) => {
      await senseCommandsGph.createOne(sense.id);
      await this._SyncLemma(sense);

      await Bluebird.all([
        // sense -> synset
        senseCommandsGph.createRelationOne(
          sense.id,
          Label.SYNSET,
          sense.synsetId,
          Label.SYNSET
        ),
        // sense -> language
        senseCommandsGph.createRelationOne(
          sense.id,
          Label.LANGUAGE,
          sense.languageId,
          Label.LANGUAGE
        ),
        // sense -> lemma
        senseCommandsGph.createRelationOne(
          sense.id,
          Label.SENSE,
          sense.lemmaId,
          Label.LEMMA
        )
      ])

      return;
    })

    return;
  }

  private static async _SyncLemma(sense: ISenseDAO, t?: any): Promise<void> {
    const lemmaQueries = LemmaQueries.GetInstance();
    const lemmaCommandsGph = LemmaCommandsGph.GetInstance();
    const senseCommandsGph = SenseCommandsGph.GetInstance();

    const lemma = await lemmaQueries.findOne(sense.lemmaId);

    await lemmaCommandsGph.createOne(lemma.id);
    await senseCommandsGph.createRelationOne(
      sense.id,
      Label.SENSE,
      sense.lemmaId,
      Label.LEMMA
    )

    return;
  }

  private static _SyncLexemeForm(t?: any) {

  }

  private static async _SyncDefinition(synset: ISynsetDAO, t?: any) {
    const definitionCommandsGph = DefinitionCommandsGph.GetInstance()

    // obtain definitions from pg
    const queryBuilder = this._QueryBuilder
      .select()
      .from(TableName.DEFINITION)
      .where('synsetId', synset.id)
    const definitions = DefinitionQueries
      .GetInstance()
      .build<IDefinitionDAO>(queryBuilder);

    // sync neo4j
    return Bluebird.each<IDefinitionDAO, void>(definitions, async (definition) => {
      await definitionCommandsGph.createOne(definition.id);
      await Bluebird.all([
        definitionCommandsGph.createRelationOne(
          definition.id,
          Label.DEFINITION,
          synset.id,
          Label.SYNSET
        ),
        definitionCommandsGph.createRelationOne(
          definition.id,
          Label.LANGUAGE,
          definition.languageId,
          Label.LANGUAGE
        )
      ])
    })
  }

  private static _InitProcessReporter() {
    this._ProgressBar = new ProgressBar(':bar :current/:total', {
      complete: '=',
      incoplete: ' ',
      width: 20,
      total: this._SynsetCount,
      clear: true
    });

    console.log('Synchronization progress:');
    const timer = setInterval(() => {
      this._ProgressBar.tick(this._SynsetProcessedCount);

      if (this._ProgressBar.complete) {
        clearInterval(timer);
        console.log('Complete!')
      }
    }, 100);

    

    return
  }

  public static async Execute() {
    if (!this._PgDatabase) {
      this._PgDatabase = SynsetQueries.GetInstance().getDb();
    }

    if (!this._NeoConnector) {
      this._NeoConnector = SynsetCommandsGph.GetInstance().getConnector();
    }

    try {
      this._SynsetCount = await SynsetQueries.GetInstance().count();
      
      this._InitProcessReporter();

      await this._SyncAllLanguages();
      await this._SyncAllSynsets();
    } catch (e) {
      throw e;
    }
  }

  private constructor() {}
}

export default PgNeoSync;