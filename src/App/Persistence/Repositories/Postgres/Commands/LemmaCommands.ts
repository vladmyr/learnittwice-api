import * as Promise from 'bluebird';
import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TFLemmaDAO, ILemmaDAO, ILemmaCommands } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { CommandsBase } from './CommandsBase';
import ArrayUtil from 'src/App/Domain/Helpers/Modules/Array';

class LemmaCommands extends CommandsBase {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.LEMMA}" (lemma) VALUES($(lemma)) RETURNING *`;
  public static readonly COMMAND_UPDATE =
    `UPDATE "${TableName.LEMMA}" SET lemma = $(lemma) WHERE id = $(id) RETURNING *`;
  public static readonly COMMAND_DELETE =
    `DELETE FROM "${TableName.LEMMA}" WHERE id = $(id)`;

  private static _instance:ILemmaCommands;

  private constructor(db:IDatabase<{}>) {
    super(db);
  }

  public static GetInstance(db?:IDatabase<{}>):ILemmaCommands {
    if (!LemmaCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[LemmaCommands.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      LemmaCommands._instance = new LemmaCommands(db);
    }

    return LemmaCommands._instance;
  }

  public createOne(
    lemma: ILemmaDAO['lemma'], 
    t: ITask<{}> = undefined
  ): Promise<ILemmaDAO> {
    return this._getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_CREATE, {
        lemma
      })
      .then((data: ILemmaDAO) => {
        return data;
      })
  }

  public createMany(
    lemmas: ILemmaDAO['lemma'][], 
    t: ITask<{}> = undefined
  ): Promise<ILemmaDAO[]> {
    const mappedLemmas = lemmas.map<{ lemma: string }>((lemma) => {
      return { lemma };
    });
    const chunks = ArrayUtil.Chunk<{ lemma: string }>(mappedLemmas, this._INSERT_CHUNK_SIZE);
    
    return Promise
      .map(chunks, (chunk) => {
        return this._getScopeOfExecution(t)
          .many(
            this._knex(TableName.LEMMA)
              .insert(chunk, '*')
              .toString()
          )
          .then((data: ILemmaDAO[] = []) => {
            return data;
          })
      }, { concurrency: 1 })
      .then((data: ILemmaDAO[][] = []) => {
        return [].concat.apply([], data);
      })
  }

  public updateOne(
    id: ILemmaDAO['id'], 
    lemma: ILemmaDAO['lemma'], 
    t: ITask<{}> = undefined
  ): Promise<TFLemmaDAO> {
    return this._getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_UPDATE, {
        id,
        lemma
      })
      .then((data:TFLemmaDAO) => {
        return data;
      })
  }

  public deleteOne(id: ILemmaDAO['id'], t: ITask<{}> = undefined): Promise<void> {
    return this._getScopeOfExecution(t)
      .none(LemmaCommands.COMMAND_DELETE, { 
        id 
      })
  }
}

export default LemmaCommands;