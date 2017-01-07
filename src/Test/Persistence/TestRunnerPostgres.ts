import * as path from 'path';
import * as Promise from 'bluebird';
import * as Mocha from 'mocha';
import config from 'config';
import { Fs } from 'src/App/Domain/Helpers/Util';

const PATH_PERSISTENCE_DIR = path.join(process.cwd(), config.path.persistence.postgres);

class TestRunnerPostgres {
  private constructor() {};

  public static ListSpecFiles () {
    const regexFileMatch: RegExp = config.regexMatch.specFiles;
    return Fs.ReaddirRecursively(PATH_PERSISTENCE_DIR)
      .then((list) => {
        return list.filter((filepath) => {
          return regexFileMatch.test(filepath);
        })
      })
  }

  public static Run() {
    const mocha = new Mocha();

    return Promise.resolve()
      .then(() => {
        return TestRunnerPostgres.ListSpecFiles()
      })
      .then((list) => {
        list.forEach(mocha.addFile.bind(mocha));

        return Promise.fromCallback((resolver) => {
          return mocha.run(resolver);
        });
      });
  }
}

export default TestRunnerPostgres;