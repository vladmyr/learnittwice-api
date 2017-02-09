import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuLanguageDAO, ILanguageDAO, ILanguageQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';
import { CommandQueryBase } from '../CommandQueryBase';

class LanguageQueries extends CommandQueryBase {
  public static readonly QUERY_FIND_ONE =
    `SELECT * FROM "${TableName.LANGUAGE}" WHERE id = $(id)`;
  public static readonly QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.LANGUAGE}" WHIERE id IN ($(ids^))`;
  public static readonly QUERY_FIND_ALL =
    `SELECT * FROM "${TableName.LANGUAGE}" LIMIT $(limit^) OFFSET $(offset)`

  private static _instance: ILanguageQueries;

  private constructor(db: IDatabase<{}>) {
    super(db);
  }

  public static GetInstance(db?: IDatabase<{}>): ILanguageQueries {
    if (!LanguageQueries._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('LanguageQueries.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      LanguageQueries._instance = new LanguageQueries(db);
    }

    return LanguageQueries._instance;
  }

  public findOne(
    id: ILanguageDAO['id'], 
    t: ITask<{}> = undefined
  ): Promise<TuLanguageDAO> {
    return this._getScopeOfExecution(t)
      .one(LanguageQueries.QUERY_FIND_ONE, {
        id
      })
      .then((data: TuLanguageDAO) => {
        return data;
      })
  }

  public findMany(
    ids: ILanguageDAO['id'][], 
    t: ITask<{}> = undefined
  ): Promise<ILanguageDAO[]> {
    return this._getScopeOfExecution(t)
      .manyOrNone(LanguageQueries.QUERY_FIND_MANY, {
        ids: Postgres.FormatArray(ids)
      })
      .then((data: ILanguageDAO[] = []) => {
        return data;
      })
  }

  public findAll(
    limit: number = 0,
    offset: number = 0,
    t: ITask<{}> = undefined
  ): Promise<ILanguageDAO[]> {
    return this._getScopeOfExecution(t)
      .manyOrNone(LanguageQueries.QUERY_FIND_ALL, {
        limit: limit || 'ALL',
        offset: offset
      })
      .then((data: ILanguageDAO[] = []) => {
        return data;
      })
  }
}

export default LanguageQueries;