import Application from 'src/App/Application';

const main = async (): Promise<void> => {
  const application = new Application();
  let exitCode = 0;

  try {
    await application.initialize();
  } catch (e) {
    console.error(e);
    exitCode = 1;

    await application.httpServerInitializer.stop();

    process.exit(exitCode);
  }
}

export default main;