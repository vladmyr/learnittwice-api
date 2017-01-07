import * as Promise from 'bluebird';
import Application from 'src/App/Application';
import TestDatabaseBuilderPostgres 
  from './Test/Persistence/TestDatabaseBuilderPostgres';
import TestRunnerPostgres from './Test/Persistence/TestRunnerPostgres';

const main = ():void => {
  const application = new Application();

  Promise
    .resolve()
    .then(() => {
      // 1. initialize application
      return application.initialize();
    })
    .then(() => {
      if (typeof application.dbConnectors.postgresDBConnector == 'undefined') {
        throw new ReferenceError('[Test] application.dbConnectors are not initialized');
      }

      // 2. restore default state of test database
      const testDatabaseBuilderPostgres = TestDatabaseBuilderPostgres
        .GetInstance(application.dbConnectors.postgresDBConnector.getDB());
      return testDatabaseBuilderPostgres.import()
    })
    .then(() => {
      // 3. execute test
      return TestRunnerPostgres.Run();
    })
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(0);
    })
}

export default main;