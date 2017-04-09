import * as path from 'path';
import * as P from 'bluebird';
import * as Mocha from 'mocha';
import config from 'config';
import { Fs } from 'src/App/Domain/Helpers/Util';

class TestRunner {
  protected constructor() {};

  public static ListSpecFiles (testBaseDir: string) {
    const regexFileMatch: RegExp = config.regexMatch.specFiles;
    return Fs.ReaddirRecursively(testBaseDir)
      .then((list) => {
        return list.filter((filepath) => {
          return regexFileMatch.test(filepath);
        })
      })
  }

  public static async Run(testBaseDir: string) {
    const mocha = new Mocha();
    const list = await TestRunner.ListSpecFiles(testBaseDir);

    list.forEach(mocha.addFile.bind(mocha));

    return P.fromCallback((resolver) => {
      return mocha.run(resolver);
    });
  }

  public static GetTestBaseDir(dir: string) {
    return path.join(process.cwd(), dir);
  }
}

export default TestRunner;