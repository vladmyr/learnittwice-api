import * as Promise from 'bluebird';
import * as pgPromise from 'pg-promise';

import PostgresModels from 'src/App/Persistence/Repositories/PostgresModels';

interface IConnectionConfig extends pgPromise.IConfig {
  poolSize: number
}

class PostgresDBConnector {
  private _connectionConfig: IConnectionConfig
  private _pgp: pgPromise.IMain;
  private _db: pgPromise.IDatabase<{}>;

  public constructor(
    host: string,
    port: number,
    database: string,
    user: string,
    password: string,
    ssl: boolean,
    binary: boolean,
    poolSize: number
  ) {
    const initOptions = {
      promiseLib: Promise,
      capSQL: true
    }

    this._connectionConfig = {
      host: host,
      port: port,
      database: database,
      user: user,
      password: password,
      ssl: ssl,
      binary: binary,
      poolSize: poolSize
    };
    this._pgp = pgPromise(initOptions);
  }

  public initialize(): PostgresDBConnector {
    this._db = this._pgp(this._connectionConfig);
    this._initContext();
    this._initModels();

    return this;
  }

  public getDB(): pgPromise.IDatabase<{}> {
    return this._db;
  }

  public disconnect(): void {
    this._pgp.end();
  }

  private _initContext(): void {

  }

  private _initModels(): void {
    // iterate over all CQRS models
    for (let modelName in PostgresModels) {
      // initialize an instance of each model
      PostgresModels[modelName].GetInstance(this._db);
    }
  }
}

export default PostgresDBConnector;

