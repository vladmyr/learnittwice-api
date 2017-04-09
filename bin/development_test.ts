import * as program from 'commander';

process.env.NODE_ENV = 'development_test';
process.env.NODE_CONFIG_DIR = 'src/Config';

import main, { TEST_SCOPE } from 'src/Test';

interface ITestCLI extends program.ICommand {
  scope?: string
}

program
  .option('-h, --help', 'Prints help')
  .option('-s, --scope <scope>', 'Scope of testing', /^(pg|n4j)$/i);

const cli: ITestCLI = program.parse(process.argv)

if (cli.scope) {
  switch (cli.scope) {
    case 'pg':
      main(TEST_SCOPE.POSTGRES);
      break;
    case 'n4j':
      main(TEST_SCOPE.NEO4J);
      break;
    default:
      cli.outputHelp();
      process.exit(0);
  }
} else {
  cli.outputHelp();
  process.exit(0);
}