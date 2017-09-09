import { IDatabase } from 'pg-promise';
import { Tx }
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import { Postgres } from 'src/App/Domain/Helpers/Util';
import { CommandQueryBase } from '../CommandQueryBase';

export default abstract class AbstractCommands<TProps, TDAO> 
  extends CommandQueryBase {

  protected static readonly TableName: string;
  protected static Instance;

  public static readonly COMMAND_DELETE_ONE =
    `DELETE FROM "$(tableName^)" WHERE id = $(id)`;
  public static readonly COMMAND_DELETE_MANY =
    `DELETE FROM "$(tableName^)" WHERE id IN ($(ids^))`;

  // TODO: use composition ineheritance to get rid of "_class" reference
  public static GetInstance(db?: IDatabase<{}>, _class?: any) {
    if (!this.Instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[AbstractCommands.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      this.Instance = new _class(db);
    }

    return this.Instance;
  }

  public async createOne(props: TProps, t?: Tx): Promise<TDAO> {
    const executionScope = this._getScopeOfExecution(t);
    const query = this._knex(this.constructor.TableName)
      .returning('*')
      .insert(props)
      .toString();

    let result: TDAO;

    try {
      result = await executionScope.one(query);
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  public async updateOne(id: number, props: TProps, t?: Tx): Promise<TDAO> {
    const executionScope = this._getScopeOfExecution(t);
    const query = this._knex(this.constructor.TableName)
      .returning('*')
      .where('id', id)
      .update(props)
      .toString()
    let result: TDAO;

    try {
      result = await executionScope.oneOrNone(query);
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  public async deleteOne (id: number, t?: Tx): Promise<void> {
    const executionScope = this._getScopeOfExecution(t);

    try {
      await executionScope.none(AbstractCommands.COMMAND_DELETE_ONE, {
        tableName: this.constructor.TableName,
        id
      })
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteMany (ids: number[], t?: Tx): Promise<void> {
    const executionScope = this._getScopeOfExecution(t);

    try {
      await executionScope.none(AbstractCommands.COMMAND_DELETE_MANY, {
        tableName: this.constructor.TableName,
        ids: Postgres.FormatArray(ids)
      })
    } catch (err) {
      console.error(err);
    }
  }

  // NOTE: ts 2.4 does not have strongly typed constructors and
  // this workaround allows to call static properties of a class.
  // Reference: https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-298199835
  'constructor': typeof AbstractCommands;
}