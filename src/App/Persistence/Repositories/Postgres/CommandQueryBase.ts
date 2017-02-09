import { IDatabase, ITask } from 'pg-promise';
import * as Knex from 'knex';

export abstract class CommandQueryBase {
  private _db: IDatabase<{}>;

  protected _knex = Knex({ client: 'pg' });

  constructor(db) {
    this._db = db;
  }

  public getDb() {
    return this._db;
  }

  protected _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}