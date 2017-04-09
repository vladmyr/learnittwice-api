import config from 'config';
import Application from 'src/App/Application';
import TestDatabaseBuilderPostgres 
  from './Test/Persistence/TestDatabaseBuilderPostgres';
import TestDatabaseBuilderNeo4j 
  from './Test/Persistence/TestDatabaseBuilderNeo4j'
import TestRunner from './Test/Persistence/TestRunner';

export enum TEST_SCOPE {
  POSTGRES,
  NEO4J
}

const main = async (scope: TEST_SCOPE) => {
  const application = new Application();

  try {
    await application.initialize()

    switch(scope) {
      case TEST_SCOPE.POSTGRES:
        const testDatabaseBuilderPostgres = TestDatabaseBuilderPostgres
          .GetInstance(application.dbConnectors.postgresDBConnector.getDB());
        await testDatabaseBuilderPostgres.import()
        await TestRunner
          .Run(TestRunner.GetTestBaseDir(config.path.persistence.postgres));
        break;
      case TEST_SCOPE.NEO4J:
        const testDatabaseBuilderNeo4j = TestDatabaseBuilderNeo4j
          .GetInstance(application.dbConnectors.neo4jDBConnector);
        await testDatabaseBuilderNeo4j.restoreGraph();
        await TestRunner
          .Run(TestRunner.GetTestBaseDir(config.path.persistence.neo4j));
        break;
    }
  } catch(err) {
    console.error(err);
  } finally {
    return process.exit(0);
  }
}

export default main;