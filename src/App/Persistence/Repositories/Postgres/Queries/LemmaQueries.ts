import { IDatabase, ParameterizedQuery } from 'pg-promise';
import { ILemmaDAO, ILemmaQueries, TFLemmaDAO } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaQueries {
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

  public findOneQuery(id: ILemmaDAO['id']):ParameterizedQuery {
    return new ParameterizedQuery(
      'SELECT * FROM "Lemma" WHERE id = $1', 
      [id]
      );
  }

  public findOne(id: ILemmaDAO['id']):Promise<TFLemmaDAO> {
    return this._db
      .oneOrNone(this.findOneQuery(id))
      .then((data:TFLemmaDAO) => {
        return data
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public findManyQuery(ids: Array<ILemmaDAO['id']>):ParameterizedQuery {
    return new ParameterizedQuery(
      'SELECT * FROM "Lemma" WHERE id = ANY($1::int[])', 
      [ids]
    )
  }

  public findMany(ids: Array<ILemmaDAO['id']>):Promise<Array<TFLemmaDAO>> {
    return this._db
      .manyOrNone(this.findManyQuery(ids))
      .then((data:Array<TFLemmaDAO> = []) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

export default LemmaQueries;