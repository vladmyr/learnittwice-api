import Neo4jDBConnector, { IScopeCallbackPromise }
  from 'src/App/Persistence/Connectors/Neo4jDBConnector';

interface IScope {
  (callback: IScopeCallbackPromise): Promise<any>
}

export abstract class AbstractCommandQueryGph {
  private _connector: Neo4jDBConnector;

  constructor(connector: Neo4jDBConnector) {
    this._connector = connector;
  }

  public getConnector() {
    return this._connector;
  }

  protected _getScope(session?: any): IScope {
    if (!session) {
      return (callback) => {
        return this._connector.inSession2(callback);
      }
    }

    return (callback) => {
      return callback(session);
    }
  }
}