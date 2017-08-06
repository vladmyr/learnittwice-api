import 'app-module-path/cwd';

process.env.NODE_CONFIG_DIR = './src/Config';

import * as program from 'commander';
import main, { CLI_COMMAND } from 'src/CLI';

let cli;
let command = CLI_COMMAND.HELP;
let args = {};
let exitCode = 0;

cli = program
  .command('pg-neo-sync')
  .command('mongo2pg')
  .command('bindpg2n4j')
  .command('n4jmigrate <subcmd> [options]')
    .option('-n, --name <name>', 'specify the name of a migration')
  .parse(process.argv);

switch (cli.args[0]) {
  case 'mongo2pg':
    command = CLI_COMMAND.MONGO2PG;
    break;
  case 'pg2n4jmap':
    command = CLI_COMMAND.PG2N4JMAP;
    break;
  case 'pg-neo-sync':
    command = CLI_COMMAND.PG2N4JMAP;
    break;
  case 'n4jmigrate':
    switch (cli.args[1]) {
      case 'create':
        command = CLI_COMMAND.N4J_MIGRATE_CREATE;
        args = {
          suffix: cli.name
        }
        break;
      case 'up':
        command = CLI_COMMAND.N4J_MIGRATE_UP;
        break;
      case 'down':
        command = CLI_COMMAND.N4J_MIGRATE_DOWN;
        break;
    }
    break;
  default:
    cli.outputHelp();
}

(async () => {
  try {
    await main(command, args);
  } catch (e) {
    exitCode = 1;
  } finally {
    process.exit(exitCode)
  }
})();