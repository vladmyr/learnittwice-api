import * as path from 'path';
import * as _ from 'underscore';
import config from 'config';
import { Postgres } from 'src/App/Domain/Helpers/Util';
import { IDatabase, QueryFile } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';

const FILEPATH_DB_DUMP = path.join(process.cwd(), config.filepath.databaseDump.postgres);
const PG_TRUNCATE = `TRUNCATE TABLE $1^ RESTART IDENTITY CASCADE`;

class TestDatabaseBuilderPostgres {
  private static _instance: TestDatabaseBuilderPostgres;
  private _db: IDatabase<{}>;
  
  private constructor(_db: IDatabase<{}>) {
    this._db = _db;
  }

  public static GetInstance(db?: IDatabase<{}>) {
    if (!TestDatabaseBuilderPostgres._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError(`[${TestDatabaseBuilderPostgres}.GetInstance] argument 'db' can't be undefined during initialization`);
      }

      TestDatabaseBuilderPostgres._instance = new TestDatabaseBuilderPostgres(db);
    }

    return TestDatabaseBuilderPostgres._instance;
  }

  public async import(): Promise<void> {
    await this.truncateAllTables();
    await this.restoreDump();
  }

  private truncateAllTables(): Promise<any> {
    const arrTableName = _.without(TableName.ToArray(), TableName.MIGRATIONS);
    return this._db.any(PG_TRUNCATE, [Postgres.FormatName(arrTableName)]);
  }

  private async restoreDump(): Promise<void> {
    const dump = new QueryFile(FILEPATH_DB_DUMP);
    await this._db.any(dump);
    return;
  }
}

export default TestDatabaseBuilderPostgres;