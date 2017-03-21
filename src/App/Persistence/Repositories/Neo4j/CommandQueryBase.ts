import * as Promise from 'bluebird';
import Neo4jDBConnector, { IScopeCallback }
  from 'src/App/Persistence/Connectors/Neo4jDBConnector';

interface IScopeExecution {
  (callback: IScopeCallback): Promise<any>
}

export abstract class CommandQueryBase {
  private _connector: Neo4jDBConnector;

  constructor(connector: Neo4jDBConnector) {
    this._connector = connector;
  }

  protected _getConnector() {
    return this._connector;
  }

  protected _getScopeOfExecution(session?: any): IScopeExecution {
    if (!session) {
      return (callback) => {
        return this._connector.inSession(callback);
      }
    }

    return (callback) => {
      return new Promise((fulfill, reject) => {
        callback(session, fulfill, reject);
        return;
      })
    }
  }
}