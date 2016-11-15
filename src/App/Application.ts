import * as Promise from 'bluebird';
import config from 'src/config';

import MongooseDBConnector from 'src/App/Persistence/Connectors/MongooseDBConnector';

class Application {
  public express;
  public services;
  public mongooseDBConnector:MongooseDBConnector;

  constructor() {
    
  }

  initialize(): Promise<Application> {
    const self = this;

    return Promise
      .resolve()
      .then(() => {
        // instantiate and initialize MongooseDBConnector
        const mongooseDBConnector = new MongooseDBConnector(
          config.database.mongodb.uri,
          config.database.mongodb.options
        );

        return mongooseDBConnector.initialize();
      })
      .then((mongooseDBConnector) => {
        self.mongooseDBConnector = mongooseDBConnector;
        return self; 
      })
  }
}

export default Application;