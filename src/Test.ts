import config from 'config';
import Application from 'src/App/Application';
import TestDatabaseBuilderPostgres 
  from './Test/Persistence/TestDatabaseBuilderPostgres';
import TestDatabaseBuilderNeo4j 
  from './Test/Persistence/TestDatabaseBuilderNeo4j'
import TestRunner from './Test/TestRunner';

export enum TEST_SCOPE {
  POSTGRES,
  NEO4J,
  CONTROLLERS
}

const main = async (scope: TEST_SCOPE) => {
  const application = new Application();

  try {
    await application.initialize({
      disableHttpServerInitialization: scope != TEST_SCOPE.CONTROLLERS
    });

    const testDatabaseBuilderPostgres = TestDatabaseBuilderPostgres
      .GetInstance(application.dbConnectors.postgresDBConnector.getDB());
    const testDatabaseBuilderNeo4j = TestDatabaseBuilderNeo4j
      .GetInstance(application.dbConnectors.neo4jDBConnector);

    switch(scope) {

      // scope pg
      case TEST_SCOPE.POSTGRES:
        await testDatabaseBuilderPostgres.import();
        await TestRunner
          .Run(TestRunner.GetTestBaseDir(config.path.persistence.postgres));
        break;

      // scope n4j
      case TEST_SCOPE.NEO4J:
        await testDatabaseBuilderNeo4j.restoreGraph();
        await TestRunner
          .Run(TestRunner.GetTestBaseDir(config.path.persistence.neo4j));
        break;

      // scope controllers
      case TEST_SCOPE.CONTROLLERS:
        await testDatabaseBuilderPostgres.import();
        await testDatabaseBuilderNeo4j.restoreGraph();
        await TestRunner
          .Run(TestRunner.GetTestBaseDir(config.path.controllers));
        break;
    }
  } catch(err) {
    console.error(err);
  } finally {
    return process.exit(0);
  }
}

export default main;