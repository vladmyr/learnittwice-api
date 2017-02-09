import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSynsetDAO, ISynsetDAO, ISynsetQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';

class SynsetQueries {
  public static readonly QUERY_FIND_ONE =
    `SELECT * FROM "${TableName.SYNSET}" WHERE id = $(id)`
  public static readonly QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.SYNSET}" WHIERE id IN ($(ids^))`

  private static _instance: ISynsetQueries;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): ISynsetQueries {
    if (!SynsetQueries._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('SynsetQueries.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      SynsetQueries._instance = new SynsetQueries(db);
    }

    return SynsetQueries._instance;
  }

  public getDb() {
    return this._db;
  }

  public findOne(
    id: ISynsetDAO['id'], 
    t: ITask<{}> = undefined
  ): Promise<TuSynsetDAO> {
    return this._getScopeOfExecution(t)
      .one(SynsetQueries.QUERY_FIND_ONE, {
        id
      })
      .then((data: TuSynsetDAO) => {
        return data;
      })
  }

  public findMany(
    ids: ISynsetDAO['id'][], 
    t: ITask<{}> = undefined
  ): Promise<TuSynsetDAO[]> {
    return this._getScopeOfExecution(t)
      .manyOrNone(SynsetQueries.QUERY_FIND_MANY, {
        ids: Postgres.FormatArray(ids)
      })
      .then((data: TuSynsetDAO[] = []) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default SynsetQueries;