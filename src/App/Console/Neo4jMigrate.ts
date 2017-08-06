import * as Bluebird from 'bluebird';
import * as Path from 'path';
import { Fs, Str } from 'src/App/Domain/Helpers/Util';
import Neo4jDbConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

interface INeo4jMigrateConfig {
  nodeLabel: string,
  path: string
}

interface INeo4jMigrateGraphNode {
  id: 1
  filename: string
  executedAt: string
}


/**
 * Responsible for comitting/rollbacking migrations over Neo4j Database
 * ToDo checklist:
 * - [x] Creates a template of a migration
 * - [x] Applies migrations for very beginning
 * - [x] Rollbacks migrations to very beginning
 * - [ ] Saves the migration state in database
 * - [ ] Handles max number of migrations to apply/rollback
 * 
 * @class Neo4jMigrate
 */
class Neo4jMigrate {
  private static readonly REG_UP = /_up.cql/g;
  private static readonly REG_DOWN = /_down.cql/g;
  private static readonly CQL_INIT_MIGRATION = (nodeLabel: string) => {
    return `CREATE INDEX ON :${nodeLabel}(id);`;
  }

  private _connector: Neo4jDbConnector;
  private _config: INeo4jMigrateConfig;

  public constructor(connector: Neo4jDbConnector, config: INeo4jMigrateConfig) {
    this._connector = connector;
    this._config = config;
  }

  public async create(suffix: string = ''): Promise<void> {
    const dirName = this._getTime() + (suffix ? `_${suffix}` : '');
    const dirPath = Path.join(this._config.path, dirName);
    const filepathUp = Path.join(dirPath, `${dirName}_up.cql`);
    const filepathDown = Path.join(dirPath, `${dirName}_down.cql`);

    try {
      await Fs.Mkdir(dirPath);
      await Promise.all([
        Fs.Touch(filepathUp),
        Fs.Touch(filepathDown)
      ]);
    } catch(err) {
      console.error(err);
    }
  }

  public async up(): Promise<void> {
    const upMigrations = await this._getMigrations(Neo4jMigrate.REG_UP);
    return await this._runMigrations(upMigrations.sort());
  }

  public async down(): Promise<void> {
    const downMigrations = await this._getMigrations(Neo4jMigrate.REG_DOWN);
    return await this._runMigrations(downMigrations.sort((a,b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    }));
  }

  private async _initialize(): Promise<void> {
    return this._connector.inSession2<void>(async (session) => {
      const iterable = Str.SplitIterable(
        Neo4jMigrate.CQL_INIT_MIGRATION(this._config.nodeLabel)
      );

      let cq = iterable.next();
      while (!cq.done) {
        await session.run(cq.value);
        cq = iterable.next();
      }

      return ;
    });
  }

  private async _runMigrations(migrations: string[]): Promise<void> {
    try {
      await this._initialize();
      return this._connector.inSession2<void>(async (session) => {

        return Bluebird.each(migrations, async (path) => {
          const migration = await Fs.ReadFile(path);
          const iterable = Str.SplitIterable(migration);

          let cq = iterable.next();
          while (!cq.done) {
            await session.run(cq.value);
            cq = iterable.next();
          }

          return
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async _getMigrations(regMatch: RegExp): Promise<string[]> {
    const files = await Fs.ReaddirRecursively(this._config.path);
    return files
      .filter((filepath) => regMatch.test(filepath));
  }

  private _getTime(): number {
    return (new Date()).getTime();
  }
}

export default Neo4jMigrate;