import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuDefinitionDAO, IDefinitionDAO, IDefinitionQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';

class DefinitionQueries {
  public static readonly QUERY_FIND_ONE =
    `SELECT * FROM "${TableName.DEFINITION}" WHERE id = $(id)`
  public static readonly QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.DEFINITION}" WHIERE id IN ($(ids^))`

  private static _instance: IDefinitionQueries;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): IDefinitionQueries {
    if (!DefinitionQueries._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('DefinitionQueries.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      DefinitionQueries._instance = new DefinitionQueries(db);
    }

    return DefinitionQueries._instance;
  }

  public getDb() {
    return this._db;
  }

  public findOne(
    id: IDefinitionDAO['id'], 
    t: ITask<{}> = undefined
  ): Promise<TuDefinitionDAO> {
    return this._getScopeOfExecution(t)
      .one(DefinitionQueries.QUERY_FIND_ONE, {
        id
      })
      .then((data: TuDefinitionDAO) => {
        return data;
      })
  }

  public findMany(
    ids: IDefinitionDAO['id'][], 
    t: ITask<{}> = undefined
  ): Promise<TuDefinitionDAO[]> {
    return this._getScopeOfExecution(t)
      .manyOrNone(DefinitionQueries.QUERY_FIND_MANY, {
        ids: Postgres.FormatArray(ids)
      })
      .then((data: TuDefinitionDAO[] = []) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default DefinitionQueries;