import Application from 'src/App/Application';
import Neo4jModels from 'src/App/Persistence/Repositories/Neo4jModels';

const main = async (): Promise<void> => {
  const application = new Application();
  let exitCode = 0;

  try {
    await application.initialize();

    await Neo4jModels.LemmaCommandsGph.GetInstance()
      .createOne(1)
      .then((data) => {
        console.log('Neo4j -> Lemma', data);
      })

    await application.dbConnectors.neo4jDBConnector
      .inSession2(async (session) => {
        const lemmaCommandsGph = Neo4jModels.LemmaCommandsGph.GetInstance();

        await lemmaCommandsGph.createOne(2, session);
        await lemmaCommandsGph.createOne(3, session);
      });
  } catch (e) {
    console.error(e);
    exitCode = 1;
  } finally {
    process.exit(exitCode);
  }
}

export default main;