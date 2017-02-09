import * as Promise from 'bluebird';
import { MongooseModels } from 'src/App/Persistence/ODM/Mongoose/Models';
import PostgresModels from 'src/App/Persistence/Repositories/PostgresModels';

import { ILanguageDAO } 
  from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';
import { ISynsetCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';
import { IDefinitionCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';
import { ILanguageQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';
import { ILemmaCommands, ILemmaQueries }
  from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { ISenseCommands }
  from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';


interface IndexedLanguages {
  [lng: string]: ILanguageDAO
}

export class ScriptMongoosePostgresMigration {
  private static readonly _CHUNK_CONCURRENCY = 1;

  private static _LanguageQueries: ILanguageQueries;
  private static _SynsetCommands: ISynsetCommands;
  private static _DefinitionCommands: IDefinitionCommands;
  private static _LemmaCommands: ILemmaCommands;
  private static _LemmaQueries: ILemmaQueries;
  private static _SenseCommands: ISenseCommands;

  private static _LemmaTotal = 0;
  private static _LemmaProcessed = 0;
  private static _SynsetTotal = 0;
  private static _SynsetProcessed = 0;
  private static _IndexedLanguages: IndexedLanguages = {};

  public static Execute() {
    ScriptMongoosePostgresMigration._LanguageQueries =
      PostgresModels.LanguageQueries.GetInstance();
    ScriptMongoosePostgresMigration._SynsetCommands = 
      PostgresModels.SynsetCommands.GetInstance();
    ScriptMongoosePostgresMigration._DefinitionCommands =
      PostgresModels.DefinitionCommands.GetInstance();
    ScriptMongoosePostgresMigration._SenseCommands =
      PostgresModels.SenseCommands.GetInstance();
    ScriptMongoosePostgresMigration._LemmaCommands =
      PostgresModels.LemmaCommands.GetInstance();
    ScriptMongoosePostgresMigration._LemmaQueries =
      PostgresModels.LemmaQueries.GetInstance();

    return Promise.resolve(this._ObtainMetadata())
      .then(this._ObtainLanguages.bind(this))
      .then(this._TrackPrintStats.bind(this))
      // .then(this._ImportLemmas.bind(this));
      .then(this._Import.bind(this))
  }

  private static _Import() {
    let i = 0;
    let isResolved = false;

    return new Promise((resolve, reject) => {
      const generator = this._ImportSynsetGenerator(() => {
        const next = generator.next();

        if (!isResolved && next.done) {
          return resolve();
        }
      });

      for (; i < this._CHUNK_CONCURRENCY; i++) {
        generator.next();
      }
    })
  }

  private static * _ImportSynsetGenerator(callback: any) {
    const chunkSize = 1000;
    const chunkTotal = Math.ceil(this._SynsetTotal / chunkSize);
    let i = 0;

    for(; i < chunkTotal; i++) {
      yield MongooseModels.Synset
        .find()
        .skip(i * chunkSize)
        .limit(chunkSize)
        .exec()
        .then((arrSynset) => {
          return new Promise((resolve) => {
            let next;
            const generator = this._ImportSynsetChunkGenerator(arrSynset, () => {
              const next = generator.next();

              if (next.done) {
                return resolve();
              }
            })

            next = generator.next();
          })
        })
        .then(callback)
    }
  }

  private static * _ImportSynsetChunkGenerator(arrSynset: any[], callback: any) {
    let i = 0;

    for (; i < arrSynset.length; i++) {
      yield this._MigrateSynset(arrSynset[i], callback);
    }
  }

  private static _MigrateSynset(synset: any, callback: any) {
    return MongooseModels.Lemma.find({
        'info.sense.synsetId': synset.id
      })
      .then((arrLemma: any) => {
        // filter infos and senses by synset id
        arrLemma = arrLemma.map((lemma) => {
          lemma.info = lemma.info.reduce((reduction, info) => {
            info.sense = info.sense.filter((sense) => {
              if (!sense || !sense.synsetId) {
                return false
              }

              return sense.synsetId.equals(synset.id);
            });

            if (info.sense && info.sense.length) {
              reduction.push(info);
            }

            return reduction;
          }, []);

          return lemma;
        });

        return this._ImportSynset(synset, arrLemma);
      })
      .then(callback);
  }

  private static _ImportSynset(synset, arrLemma) {
    const self = this;

    return self._SynsetCommands.getDb().tx((t) => {
      ScriptMongoosePostgresMigration._SynsetProcessed++;

      return self._SynsetCommands.createOne({}, t)
        .then((pgSynset) => {
          // import definitions
          return Promise.map(synset.definition, (definition: any) => {
            return self._DefinitionCommands.createOne({
              languageId: ScriptMongoosePostgresMigration._IndexedLanguages[definition.language].id,
              synsetId: pgSynset.id,
              definition: definition.text 
            }, t)
          }, { concurrency: 1 })
          .then(() => {
            // import lemma & sense
            return Promise.map(arrLemma, (lemma: any) => {
              return ScriptMongoosePostgresMigration._LemmaQueries
                .findOneByLemma(lemma.lemma, t)
                .then((pgLemma) => {
                  return Promise.map(lemma.info, (info: any) => {
                    return Promise.map(info.sense, (sense: any) => {
                      return ScriptMongoosePostgresMigration._SenseCommands.createOne({
                        languageId: ScriptMongoosePostgresMigration
                          ._IndexedLanguages[info.language].id,
                        lemmaId: pgLemma.id,
                        synsetId: pgSynset.id,
                        tagCount: sense.tagCount
                      }, t);
                    });
                  })
                })
            })
          })
      })
    })
  }

  private static _ObtainMetadata() {
    return Promise.all([
      this._ObtainLemmaTotal(),
      this._ObtainSynsetTotal()
    ]);
  }

  private static _ObtainLemmaTotal() {
    return Promise.resolve()
      .then(() => {
        return MongooseModels.Lemma.count({});
      })
      .then((lemmaTotal) => {
        this._LemmaTotal = lemmaTotal;
      });
  }

  private static _ObtainSynsetTotal() {
    return Promise.resolve()
      .then(() => {
        return MongooseModels.Synset.count({});
      })
      .then((synsetTotal) => {
        this._SynsetTotal = synsetTotal;
      });
  }

  private static _ObtainLanguages() {
    return Promise.resolve()
      .then(() => {
        return this._LanguageQueries.findAll();
      })
      .then((languages) => {
        languages.forEach((language) => {
          ScriptMongoosePostgresMigration._IndexedLanguages[language.iso.slice(0, 2)] = language;
          return;
        });
      });
  }

  private static _GetStats() {
    return {
      synsetTotal: ScriptMongoosePostgresMigration._SynsetTotal,
      synsetCount: ScriptMongoosePostgresMigration._SynsetProcessed,
      synsetPercentage: Math.floor(
        ScriptMongoosePostgresMigration._SynsetProcessed / ScriptMongoosePostgresMigration._SynsetTotal * 10000
      ) / 100,
      lemmaTotal: ScriptMongoosePostgresMigration._LemmaTotal,
      lemmaCount: ScriptMongoosePostgresMigration._LemmaProcessed,
      lemmaPercentage: Math.floor(
        ScriptMongoosePostgresMigration._LemmaProcessed / ScriptMongoosePostgresMigration._LemmaTotal * 10000
      ) / 100
    }
  }

  private static _TrackPrintStats() {
    const self = this;
    let interval = setInterval(() => {
      if (self._SynsetProcessed >= self._SynsetTotal) {
        clearInterval(interval);

        console.log('Execution has finished');

        return;
      }

      console.log(self._GetStats())
    }, 10000);
  }

  private static _ImportLemmas() {
    return new Promise((resolve, reject) => {
      const generator = this._ImportLemmaChunkGenerator(() => {
        const next = generator.next();

        if (next.done) {
          return resolve();
        }
      });

      generator.next();
    });
  }

  private static * _ImportLemmaChunkGenerator(callback: Function) {
    const chunkSize = 50;
    const chunkTotal = Math.ceil(this._LemmaTotal / chunkSize);
    let i = 0;

    for(; i < chunkTotal; i++) {
      yield this._FindMongooseLemma(i * chunkSize, chunkSize)
        .then((lemmas) => {
          const mappedLemmas: string[] = lemmas.map(lemma => lemma.lemma);
          return this._LemmaCommands.createMany(mappedLemmas);
        })
        .then((lemmas) => {
          this._LemmaProcessed += lemmas.length;
          return callback();
        })
    }
  }

  private static _FindMongooseLemma(skip: number, limit: number) {
    return Promise.resolve()
      .then(() => {
        return MongooseModels.Lemma
          .find()
          .skip(skip)
          .limit(limit)
          .exec();
      });
  }
}