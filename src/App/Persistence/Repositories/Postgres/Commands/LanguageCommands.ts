import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuLanguageDAO, ILanguageDAO, ILanguageCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';

class LanguageCommands {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.LANGUAGE}" (iso) VALUES($(iso)) RETURNING *`

  private static _instance: ILanguageCommands;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): ILanguageCommands {
    if (!LanguageCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('LanguageCommands.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      LanguageCommands._instance = new LanguageCommands(db);
    }

    return LanguageCommands._instance;
  }

  public getDb() {
    return this._db;
  }

  public createOne(
    iso: ILanguageDAO['iso'],
    t: ITask<{}> = undefined
  ): Promise<TuLanguageDAO> {
    return this._getScopeOfExecution(t)
      .one(LanguageCommands.COMMAND_CREATE, {
        iso
      })
      .then((data: TuLanguageDAO) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default LanguageCommands;