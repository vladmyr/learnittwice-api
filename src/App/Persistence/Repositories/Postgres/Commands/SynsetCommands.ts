import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSynsetDAO, ISynsetProps, ISynsetCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';

class SynsetCommands {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.SYNSET}" DEFAULT VALUES RETURNING *`;

  private static _instance: ISynsetCommands;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): ISynsetCommands {
    if (!SynsetCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('SynsetCommands.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      SynsetCommands._instance = new SynsetCommands(db);
    }

    return SynsetCommands._instance;
  }

  public getDb() {
    return this._db;
  }

  public createOne(
    props: ISynsetProps,
    t: ITask<{}> = undefined
  ): Promise<TuSynsetDAO> {
    return this._getScopeOfExecution(t)
      .one(SynsetCommands.COMMAND_CREATE, {
        ...props
      })
      .then((data: TuSynsetDAO) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default SynsetCommands;