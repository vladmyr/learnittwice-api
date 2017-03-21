import { v1 as Neo4j } from 'neo4j-driver';
import * as Promise from 'bluebird';
import Neo4jModels from 'src/App/Persistence/Repositories/Neo4jModels';

export interface IScopeCallback {
  (session: any, fulfill: (thenableOrResult?: any | Promise.Thenable<any>) => void, reject: (error?: any) => void): void;
}

// TODO: add support for transactions
class Neo4jDBConnector {
  // meta attributes
  private _host: string
  private _port: number
  private _user: string
  private _password: string
  private _poolSize: number

  // operable attributes
  private _driver
  private _freeSessions: number = 0
  private _queueSessionRequest = [];

  // method bindings
  private _getSessionBound = this._getSession.bind(this);

  public constructor(
    host: string,
    port: number,
    user: string,
    password: string,
    poolSize: number = 1
  ) {
    this._host = host;
    this._port = port;
    this._user = user;
    this._password = password;
    this._poolSize = poolSize;
    this._freeSessions = poolSize;
  }

  public initialize(): Neo4jDBConnector {
    this._driver = Neo4j.driver(
      `bolt://${this._host}:${this._port}`, 
      Neo4j.auth.basic(this._user, this._password), 
      { encrypted: 'ENCRYPTION_ON' }
    );
    this._initializeModels();

    return this;
  }

  public getDriver() {
    return this._driver;
  }

  public inSession(callback: IScopeCallback): Promise<any> {
    // 1. receive session and occupy pool slot
    // 2. execute queries
    // 3. close session and free pool slot
    // ToDo: find better way to resolve all of it
    return Promise.resolve(this._getSessionBound())
      .then((session) => {
        return new Promise((fulfill, reject) => {
          callback(session, fulfill, reject);
          return;
        })
        .then((result) => {
          return this
            ._freeSession(session)
            .then(() => { return result; });
        })
        .catch((err) => {
          console.error(err);
          return this._freeSession(session)
        })
      });
  }

  private _getSession() {
    if (this._freeSessions > 0) {
      // free slots are available, occupy one
      this._freeSessions--;
      return this._driver.session();
    }

    return new Promise((fulfill) => {
      // no slots are available - add to queue
      this._queueSessionRequest.push(fulfill);
      return;
    })
  }

  private _freeSession(session) {
    const close = Promise.promisify(session.close.bind(session));

    return close().then(() => {
      this._freeSessions++;

      if (this._queueSessionRequest.length === 0) {
        // there are no request in the queue
        return;
      }

      // there are requests in the queue
      const request = this._queueSessionRequest.shift();

      return request(this._getSession());
    })
  }

  private _initializeModels(): void {
    for (let modelName in Neo4jModels) {
      Neo4jModels[modelName].GetInstance(this);
    }
  }
}

export default Neo4jDBConnector;