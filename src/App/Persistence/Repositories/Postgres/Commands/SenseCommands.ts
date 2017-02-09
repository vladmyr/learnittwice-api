import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSenseDAO, ISenseProps, ISenseCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';

class SenseCommands {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.SENSE}" ("lemmaId", "languageId", "synsetId", "tagCount") \
     VALUES($(lemmaId), $(languageId), $(synsetId), $(tagCount)) \
     RETURNING *`

  private static _instance: ISenseCommands;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): ISenseCommands {
    if (!SenseCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('SenseCommands.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      SenseCommands._instance = new SenseCommands(db);
    }

    return SenseCommands._instance;
  }

  public getDb() {
    return this._db;
  }

  public createOne(
    props: ISenseProps,
    t: ITask<{}> = undefined
  ): Promise<TuSenseDAO> {
    return this._getScopeOfExecution(t)
      .one(SenseCommands.COMMAND_CREATE, {
        ...props
      })
      .then((data: TuSenseDAO) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default SenseCommands;