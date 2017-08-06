import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuDefinitionDAO, IDefinitionProps, IDefinitionCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';

class DefinitionCommands {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.DEFINITION}" ("synsetId", "languageId", "definition") \
     VALUES($(synsetId), $(languageId), $(definition)) \
     RETURNING *`

  private static _instance: IDefinitionCommands;
  private _db: IDatabase<{}>

  private constructor(db: IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?: IDatabase<{}>): IDefinitionCommands {
    if (!DefinitionCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('DefinitionCommands.GetInstance argument `db` can\'t be undefined during instantiation');
      }

      DefinitionCommands._instance = new DefinitionCommands(db);
    }

    return DefinitionCommands._instance;
  }

  public getDb() {
    return this._db;
  }

  public createOne(
    props: IDefinitionProps,
    t?: ITask<{}>
  ): Promise<TuDefinitionDAO> {
    return this._getScopeOfExecution(t)
      .one(DefinitionCommands.COMMAND_CREATE, {
        ...props
      })
      .then((data: TuDefinitionDAO) => {
        return data;
      })
  }

  private _getScopeOfExecution(t: ITask<{}> = undefined) {
    return t || this._db;
  }
}

export default DefinitionCommands;