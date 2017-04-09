import * as Promise from 'bluebird';
import * as program from 'commander';
import Application from 'src/App/Application';

/**
 * Scripts
 */
import { ScriptMongoosePostgresMigration } 
  from 'src/App/Console/Helper/ScriptMongoosePostgresMigration';

// const renderExamples = (): void => {
//   console.log(`
//     Examples:

//       $ node bin/development_test.js -s pg
//       $ node bin/development_test.js -s n4j
//   `);
// }

const main = ():void => {
  // program
  //     .option('-h, --help', 'Print help', )
  //     .option('-s, --scope <scope>', 'Scope of testing', /^(pg|n4j)$/i)
  //     .parse(process.argv);

  // console.log(process.argv)

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