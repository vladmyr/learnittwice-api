import Application from 'src/App/Application';

/**
 * Scripts
 */
import { ScriptMongoosePostgresMigration } 
  from 'src/App/Console/Helper/ScriptMongoosePostgresMigration';
import Neo4jMigrate from 'src/App/Console/Neo4jMigrate';
import PgNeoSync from 'src/App/Console/Sync/PgNeoSync';

export enum CLI_COMMAND {
  HELP,
  PG2N4JMAP,
  MONGO2PG,

  N4J_MIGRATE_CREATE,
  N4J_MIGRATE_UP,
  N4J_MIGRATE_DOWN
}

const main = async (command: CLI_COMMAND, args: any = null) => {
  const application = new Application();
  let neo4jMigrate: Neo4jMigrate;
  let exitCode = 0;

  try {
    await application.initialize();

    switch (command) {
      case CLI_COMMAND.PG2N4JMAP:
        await PgNeoSync.Execute();
        break;
      case CLI_COMMAND.MONGO2PG:
        await ScriptMongoosePostgresMigration.Execute();
        break;
      case CLI_COMMAND.N4J_MIGRATE_CREATE:
        neo4jMigrate = new Neo4jMigrate(
          application.dbConnectors.neo4jDBConnector,
          application.config.database.neo4jMigrations
        );
        await neo4jMigrate.create(args.suffix);
        break;
      case CLI_COMMAND.N4J_MIGRATE_UP:
        neo4jMigrate = new Neo4jMigrate(
          application.dbConnectors.neo4jDBConnector,
          application.config.database.neo4jMigrations
        );
        await neo4jMigrate.up();
        break;
      case CLI_COMMAND.N4J_MIGRATE_DOWN:
        neo4jMigrate = new Neo4jMigrate(
          application.dbConnectors.neo4jDBConnector,
          application.config.database.neo4jMigrations
        );
        await neo4jMigrate.down();
        break;
    }
  } catch (err) {
    console.error(err);
    exitCode = 1;
  } finally {
    return process.exit(exitCode);
  }
}

export default main;