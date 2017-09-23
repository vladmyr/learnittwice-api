export class Postgres {
  private static MESSAGE_ROLLBACK = 'TRIGGER ROLLBACK';

  public static ResolveTest(p: Promise<any>) {
    return p.catch((err: Error) => {
      if (err && err.message == Postgres.MESSAGE_ROLLBACK) {
        return undefined;
      } else {
        return Promise.reject(err);
      }
    })
  }

  public static Rollback() {
    return Promise.reject(new Error(Postgres.MESSAGE_ROLLBACK));
  }

  public static async DryRun(fn) {
    
  }
}