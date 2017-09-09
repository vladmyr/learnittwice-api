import * as Promise from 'bluebird';
import config from 'config';

import MongooseDBConnector from 'src/App/Persistence/Connectors/MongooseDBConnector';
import PostgresDBConnector from 'src/App/Persistence/Connectors/PostgresDBConnector';
import Neo4jDBConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

import HttpServerInitializer
  from 'src/App/Controllers/Initializer/HttpServerInitializer';

interface CollectionDBConnector {
  mongooseDBConnector?: MongooseDBConnector;
  postgresDBConnector?: PostgresDBConnector;
  neo4jDBConnector?: Neo4jDBConnector
}

class Application {
  public config = config;
  public httpServerInitializer: HttpServerInitializer;
  public dbConnectors: CollectionDBConnector = {};

  public constructor() {}

  public initialize(): Promise<Application> {
    const self = this;

    return Promise
      .resolve()
      .then(() => {
      //   // 1. instantiate and initialize MongooseDBConnector
      //   const mongooseDBConnector = new MongooseDBConnector(
      //     config.database.mongodb.uri,
      //     config.database.mongodb.options
      //   );

      //   return mongooseDBConnector.initialize();
      // })
      // .then((mongooseDBConnector) => {
      //   self.dbConnectors.mongooseDBConnector = mongooseDBConnector;

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

        // 3. instantiate and initialize Neo4jDBConnector
        const neo4jDBConnector = new Neo4jDBConnector(
          config.database.neo4j.host,
          config.database.neo4j.port,
          config.database.neo4j.user,
          config.database.neo4j.password,
          config.database.neo4j.poolSize,
        );

        return neo4jDBConnector.initialize();
      })
      .then((neo4jDBConnector) => {
        self.dbConnectors.neo4jDBConnector = neo4jDBConnector;

        // 4. initialize http server
        self.httpServerInitializer = new HttpServerInitializer(config.server.api);
        self.httpServerInitializer.initialize();

        return self.httpServerInitializer.start();
      })
      .then(() => {
        return self;
      })
  }
}

export default Application;