import { IDatabase, IArrayExt } from 'pg-promise';
import * as Knex from 'knex';
import { Tx } 
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export abstract class CommandQueryBase {
  private _db: IDatabase<{}>;

  protected _knex = Knex({ client: 'pg' });

  constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public getDb() {
    return this._db;
  }

  protected _getScopeOfExecution(t?: Tx) {
    return t || this._db;
  }

  public async build<T>(queryBuilder: Knex.QueryBuilder, t?: Tx): Promise<IArrayExt<T>> {
    const executionScope = this._getScopeOfExecution(t);
    return executionScope.any(queryBuilder.toString());
  }
}