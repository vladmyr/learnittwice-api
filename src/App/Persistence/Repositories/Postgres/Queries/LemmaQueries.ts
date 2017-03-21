import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ILemmaDAO, ILemmaQueries, TFLemmaDAO } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';
import { CommandQueryBase } from '../CommandQueryBase';

class LemmaQueries extends CommandQueryBase {
  public static readonly QUERY_FIND_ONE = 
    `SELECT * FROM "${TableName.LEMMA}" WHERE id = $(id)`;
  public static readonly QUERY_FIND_ONE_BY_LEMMA = 
    `SELECT * FROM "${TableName.LEMMA}" WHERE "lemma" = $(lemma)`;
  public static readonly QUERY_FIND_MANY =
    `SELECT * FROM "${TableName.LEMMA}" WHERE id IN ($(ids^))`;

  private static _instance:ILemmaQueries;

  private constructor(db:IDatabase<{}>) {
    super(db);
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

  public findOne(
    id: ILemmaDAO['id'],
    t?: ITask<{}>
  ):Promise<TFLemmaDAO> {
    return this._getScopeOfExecution(t)
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

  public findOneByLemma(
    lemma: ILemmaDAO['lemma'],
    t?: ITask<{}>
  ): Promise<TFLemmaDAO> {
    return this._getScopeOfExecution(t)
      .oneOrNone(LemmaQueries.QUERY_FIND_ONE_BY_LEMMA, {
        lemma
      })
      .then((data: TFLemmaDAO) => {
        return data;
      })
  }

  public findMany(
    ids: Array<ILemmaDAO['id']>,
    t?: ITask<{}>
  ): Promise<Array<TFLemmaDAO>> {
    return this._getScopeOfExecution(t)
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