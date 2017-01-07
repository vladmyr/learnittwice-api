import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ILemmaDAO, ILemmaQueries, TFLemmaDAO } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';

class LemmaQueries {
  public static QUERY_FIND_ONE = 
    `SELECT * FROM "${TableName.LEMMA}" WHERE id = $(id)`
  public static QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.LEMMA}" WHERE id IN ($(ids^))`

  private static _instance:ILemmaQueries;
  private _db:IDatabase<{}>;

  private constructor(db:IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?:IDatabase<{}>):ILemmaQueries {
    if (!LemmaQueries._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[LemmaQueries.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      LemmaQueries._instance = new LemmaQueries(db);
    }

    return LemmaQueries._instance;
  }

  public getDb() {
    return this._db;
  }

  public findOne(id: ILemmaDAO['id']):Promise<TFLemmaDAO> {
    return this._db
      .oneOrNone(LemmaQueries.QUERY_FIND_ONE, {
        id
      })
      .then((data:TFLemmaDAO) => {
        return data
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public findMany(ids: Array<ILemmaDAO['id']>):Promise<Array<TFLemmaDAO>> {
    return this._db
      .manyOrNone(LemmaQueries.QUERY_FIND_MANY, {
        ids: Postgres.FormatArray(ids)
      })
      .then((data:Array<TFLemmaDAO> = []) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

export default LemmaQueries;