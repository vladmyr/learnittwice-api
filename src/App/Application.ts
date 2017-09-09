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

interface IInitConfig {
  disableHttpServerInitialization: boolean
}

const DEFAULT_INIT_CONFIG: IInitConfig = {
  disableHttpServerInitialization: false
}

class Application {
  public config = config;
  public httpServerInitializer: HttpServerInitializer;
  public dbConnectors: CollectionDBConnector = {};

  public constructor() {}

  public async initialize(
    initConfig: IInitConfig = DEFAULT_INIT_CONFIG
  ): Promise<Application> {

    // 1. instantiate and initialize PostgresDBConnector
    this.dbConnectors.postgresDBConnector = new PostgresDBConnector(
      config.database.postgres.host,
      config.database.postgres.port,
      config.database.postgres.database,
      config.database.postgres.user,
      config.database.postgres.password,
      config.database.postgres.ssl,
      config.database.postgres.binary,
      config.database.postgres.poolSize,
    )
    await this.dbConnectors.postgresDBConnector.initialize();

    // 2. instantiote and initialize Noe4jDBConnector
    this.dbConnectors.neo4jDBConnector = new Neo4jDBConnector(
      config.database.neo4j.host,
      config.database.neo4j.port,
      config.database.neo4j.user,
      config.database.neo4j.password,
      config.database.neo4j.poolSize,
    );
    await this.dbConnectors.neo4jDBConnector.initialize();

    // 3. instantiate and initialize http server
    if (!initConfig.disableHttpServerInitialization) {
      this.httpServerInitializer = new HttpServerInitializer(config.server.api);
      this.httpServerInitializer.initialize();

      await this.httpServerInitializer.start();
    }

    return this;
  }
}

export default Application;