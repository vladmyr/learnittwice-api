import * as Promise from 'bluebird';
import config from 'src/config';

import MongooseDBConnector from 'src/App/Persistence/Connectors/MongooseDBConnector';
import PostgresDBConnector from 'src/App/Persistence/Connectors/PostgresDBConnector';

interface CollectionDBConnector {
  mongooseDBConnector?:MongooseDBConnector;
  postgresDBConnector?:PostgresDBConnector;
}

class Application {
  public express;
  public services;
  public dbConnectors:CollectionDBConnector = {};

  public constructor() {

  }

  public initialize(): Promise<Application> {
    const self = this;

    return Promise
      .resolve()
      .then(() => {
        // 1. instantiate and initialize MongooseDBConnector
        const mongooseDBConnector = new MongooseDBConnector(
          config.database.mongodb.uri,
          config.database.mongodb.options
        );

        return mongooseDBConnector.initialize();
      })
      .then((mongooseDBConnector) => {
        self.dbConnectors.mongooseDBConnector = mongooseDBConnector;
      })
      .then(() => {
        // 2. instantiate and initialize PostgresDBConnector
        const postgresDBConnector = new PostgresDBConnector(
          config.database.postgres.host,
          config.database.postgres.port,
          config.database.postgres.database,
          config.database.postgres.user,
          config.database.postgres.password,
          config.database.postgres.ssl,
          config.database.postgres.binary,
          config.database.postgres.poolSize,
        )

        return postgresDBConnector.initialize();
      })
      .then((postgresDBConnector) => {
        self.dbConnectors.postgresDBConnector = postgresDBConnector;
        return self;
      })
  }
}

export default Application;