import { Tx }
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import LemmaQueries 
  from 'src/App/Persistence/Repositories/Postgres/Queries/LemmaQueries';

class RollbackTrigger extends Error {
  private static readonly MESSAGE = 'TRIGGER ROLLBACK';

  constructor () {
    super(RollbackTrigger.MESSAGE);
  }
}

class Postgres {
  public static FormatName(tableName: string | string[]): string {
    const arrTableName = Array.isArray(tableName)
      ? tableName
      : [tableName] 

    return arrTableName.map((tableName) => {
      return `"${tableName}"`;
    }).join(',')
  }

  public static FormatArray(arr: any[] = []) {
    if (!arr.length) { return ''; }

    const isStringType = typeof arr[0] == 'string';

    return arr.map((item) => {
      return isStringType ? `'${item}'` : item;
    }).join(',');
  }

  public static async DryRun(fn): Promise<void> {
    return await LemmaQueries.GetInstance().getDb().tx(async (t: Tx) => {
      await fn(t);

      // throw an exception to trigger rollback action
      return Promise.reject(new RollbackTrigger());
    }).catch((e) => {
      // at this point transaction get rollback'ed
      if (e instanceof RollbackTrigger) {
        // resolve exception
        return;
      } else {
        // otherwise raise exception
        throw e;
      }
    })
  }
}

export default Postgres;