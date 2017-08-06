import { IDatabase } from 'pg-promise';
import { Tx } 
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';
import { CommandQueryBase } from '../CommandQueryBase';

export default abstract class AbstractQueries<TDAO> extends CommandQueryBase {
  protected static readonly TableName: string;
  protected static Instance;

  public static readonly QUERY_FIND_ONE = 
    `SELECT * FROM "$(tableName^)" WHERE id = $(id)`;
  public static readonly QUERY_FIND_MANY = 
    `SELECT * FROM "$(tableName^)" WHERE id IN ($(ids^))`;
  public static readonly QUERY_COUNT =
    `SELECT COUNT(1) as count FROM "$(tableName^)"`;

  // TODO: use composition ineheritance to get rid of "_class" reference
  public static GetInstance(db?: IDatabase<{}>, _class?: any) {
    if (!this.Instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[AbstractQueries.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      this.Instance = new _class(db);
    }

    return this.Instance;
  }

  public async count(t?: Tx): Promise<number> {
    const executionScope = this._getScopeOfExecution(t);
    let result: number = 0;

    try {
      const r = await executionScope.one(AbstractQueries.QUERY_COUNT, {
        tableName: this.constructor.TableName
      })
      result = parseInt(r.count);
    } catch (err) {
      console.error(err);
    } finally {
      return result;
    }
  }

  public async findOne(id: number, t?: Tx): Promise<TDAO> {
    const executionScope = this._getScopeOfExecution(t);
    let result: TDAO;

    try {
      result = await executionScope.oneOrNone(AbstractQueries.QUERY_FIND_ONE, {
        tableName: this.constructor.TableName,
        id
      })
    } catch (err) {
      console.error(err);
    } finally {
      return result;
    }
  }

  public async findMany(ids: number[], t?: Tx): Promise<TDAO[]> {
    const executionScope = this._getScopeOfExecution(t);
    let results: TDAO[] = [];

    try {
      results = await executionScope.manyOrNone(AbstractQueries.QUERY_FIND_MANY, {
        tableName: this.constructor.TableName,
        ids: Postgres.FormatArray(ids)
      })
    } catch (err) {
      console.error(err);
    } finally {
      return results;
    }
  }

  // NOTE: ts 2.4 does not have strongly typed constructors and
  // this workaround allows to call static properties of a class.
  // Reference: https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-298199835
  'constructor': typeof AbstractQueries;
}