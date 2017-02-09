import * as Promise from 'bluebird';
import Application from 'src/App/Application';

/**
 * Scripts
 */
import { ScriptMongoosePostgresMigration } 
  from 'src/App/Console/Helper/ScriptMongoosePostgresMigration';


const main = ():void => {
  const application = new Application();

  Promise
    .resolve()
    .then(() => {
      // 1. initialize application
      return application.initialize();
    })
    .then(() => {
      return ScriptMongoosePostgresMigration.Execute();
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