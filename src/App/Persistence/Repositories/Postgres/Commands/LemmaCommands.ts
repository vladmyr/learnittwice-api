import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TFLemmaDAO, ILemmaDAO, ILemmaCommands } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaCommands {
  public static COMMAND_CREATE =
    `INSERT INTO "${TableName.LEMMA}" (lemma) VALUES($(lemma)) RETURNING *`;
  public static COMMAND_UPDATE =
    `UPDATE "${TableName.LEMMA}" SET lemma = $(lemma) WHERE id = $(id) RETURNING *`;
  public static COMMAND_DELETE =
    `DELETE FROM "${TableName.LEMMA}" WHERE id = $(id)`;

  private static _instance:ILemmaCommands;
  private _db:IDatabase<{}>;

  private constructor(db:IDatabase<{}>) {
    this._db = db;
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

  public getDb() {
    return this._db;
  }

  public createOne(lemma: ILemmaDAO['lemma'], t: ITask<{}> = undefined): Promise<ILemmaDAO> {
    return this.getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_CREATE, {
        lemma
      })
      .then((data:ILemmaDAO) => {
        return data;
      })
  }

  public updateOne(
    id: ILemmaDAO['id'], 
    lemma: ILemmaDAO['lemma'], 
    t: ITask<{}> = undefined
  ): Promise<TFLemmaDAO> {
    return this.getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_UPDATE, {
        id,
        lemma
      })
      .then((data:TFLemmaDAO) => {
        return data;
      })
  }

  public deleteOne(id: ILemmaDAO['id'], t: ITask<{}> = undefined): Promise<void> {
    return this.getScopeOfExecution(t)
      .none(LemmaCommands.COMMAND_DELETE, { 
        id 
      })
  }

  private getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default LemmaCommands;