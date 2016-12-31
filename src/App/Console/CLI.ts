class CLI {
  private static _instance;

  private constructor() {

  }

  public static GetInstance() {
    if (!CLI._instance) {
      CLI._instance = new CLI();
    }

    return CLI._instance;
  }

  // private _outputHelp() {
  //   return null;
  // }
}

const cli = CLI.GetInstance();