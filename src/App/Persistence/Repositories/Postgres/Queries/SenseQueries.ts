import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSenseDAO, ISenseDAO, ISenseQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';

class SenseQueries {
  public static readonly QUERY_FIND_ONE =
    `SELECT * FROM "${TableName.SENSE}" WHERE id = $(id)`
  public static readonly QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.SENSE}" WHIERE id IN ($(ids^))`

  private static _instance: ISenseQueries;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): ISenseQueries {
    if (!SenseQueries._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('SenseQueries.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      SenseQueries._instance = new SenseQueries(db);
    }

    return SenseQueries._instance;
  }

  public getDb() {
    return this._db;
  }

  public findOne(
    id: ISenseDAO['id'], 
    t: ITask<{}> = undefined
  ): Promise<TuSenseDAO> {
    return this._getScopeOfExecution(t)
      .one(SenseQueries.QUERY_FIND_ONE, {
        id
      })
      .then((data: TuSenseDAO) => {
        return data;
      })
  }

  public findMany(
    ids: ISenseDAO['id'][], 
    t: ITask<{}> = undefined
  ): Promise<TuSenseDAO[]> {
    return this._getScopeOfExecution(t)
      .manyOrNone(SenseQueries.QUERY_FIND_MANY, {
        ids: Postgres.FormatArray(ids)
      })
      .then((data: TuSenseDAO[] = []) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default SenseQueries;