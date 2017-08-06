import * as Path from 'path';
import Neo4jDBConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import config from 'config';
import { Fs } from 'src/App/Domain/Helpers/Util';

const FILEPATH_GRAPH_SEED = Path.join(process.cwd(), config.filepath.databaseDump.neo4j);

class TestDatabaseBuilderNeo4j {
  private static QUERY_DROP_GRAPH = 'MATCH (n) DETACH DELETE n';

  private static _instance: TestDatabaseBuilderNeo4j;
  private _dbConnector: Neo4jDBConnector;

  private constructor(dbConnector: Neo4jDBConnector) {
    this._dbConnector = dbConnector;
  }

  public static GetInstance(dbConnector: Neo4jDBConnector) {
    if (!TestDatabaseBuilderNeo4j._instance) {
      if (typeof dbConnector == 'undefined') {
        throw new TypeError(`[${TestDatabaseBuilderNeo4j}.GetInstance] argument 'dbConnector' can't be undefined during initialization`);
      }

      TestDatabaseBuilderNeo4j._instance = new TestDatabaseBuilderNeo4j(dbConnector);
    }

    return TestDatabaseBuilderNeo4j._instance;
  }

  public async restoreGraph(): Promise<void> {
    await this._dropGraph();
    await this._seedGraph();
  }

  private async _dropGraph(): Promise<void> {
    return this._dbConnector.inSession2<void>((session) => {
      return session
        .run(TestDatabaseBuilderNeo4j.QUERY_DROP_GRAPH);
    })
  }

  private async _seedGraph(): Promise<void> {
    const graphSeed: string = await Fs.ReadFile(FILEPATH_GRAPH_SEED);

    return this._dbConnector.inSession2<void>(async (session) => {
      return session.run(graphSeed);
    })
  }
}

export default TestDatabaseBuilderNeo4j;