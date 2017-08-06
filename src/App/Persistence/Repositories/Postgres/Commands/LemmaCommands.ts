import * as Bluebird from 'bluebird';
import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TFLemmaDAO, ILemmaDAO, ILemmaProps, ILemmaCommands } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { CommandsBase } from './CommandsBase';
import ArrayUtil from 'src/App/Domain/Helpers/Modules/Array';

class LemmaCommands extends CommandsBase {
  public static readonly COMMAND_CREATE =
    `INSERT INTO "${TableName.LEMMA}" (lemma) VALUES($(lemma)) RETURNING *`;
  public static readonly COMMAND_UPDATE =
    `UPDATE "${TableName.LEMMA}" SET lemma = $(lemma) WHERE id = $(id) RETURNING *`;
  public static readonly COMMAND_DELETE =
    `DELETE FROM "${TableName.LEMMA}" WHERE id = $(id)`;

  private static _instance:ILemmaCommands;

  private constructor(db:IDatabase<{}>) {
    super(db);
  }

  public static GetInstance(db?: IDatabase<{}>): ILemmaCommands {
    if (!LemmaCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[LemmaCommands.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      LemmaCommands._instance = new LemmaCommands(db);
    }

    return LemmaCommands._instance;
  }

  public createOne(
    props: ILemmaProps, 
    t?: ITask<{}>
  ): Promise<ILemmaDAO> {
    return this._getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_CREATE, props)
      .then((data: ILemmaDAO) => {
        return data;
      })
  }

  public async createMany(
    lstProps: ILemmaProps[], 
    t?: ITask<{}>
  ): Promise<ILemmaDAO[]> {
    const chunks = ArrayUtil.Chunk<ILemmaProps>(lstProps, this._INSERT_CHUNK_SIZE);
    
    return await Bluebird
      .map(chunks, async (chunk) => {
        const executionScope = this._getScopeOfExecution(t);

        return await executionScope.many(
          this._knex(TableName.LEMMA)
            .insert(chunk, '*')
            .toString()
        )
      }, { concurrency: 1 })
      .then((data: ILemmaDAO[][] = []) => {
        return [].concat.apply([], data);
      })
  }

  public updateOne(
    id: number, 
    props: ILemmaProps, 
    t?: ITask<{}>
  ): Promise<TFLemmaDAO> {
    return this._getScopeOfExecution(t)
      .one(LemmaCommands.COMMAND_UPDATE, {
        id,
        lemma: props.lemma
      })
      .then((data:TFLemmaDAO) => {
        return data;
      })
  }

  public deleteOne(id: number, t?: ITask<{}>): Promise<void> {
    return this._getScopeOfExecution(t)
      .none(LemmaCommands.COMMAND_DELETE, { 
        id 
      })
  }
}

export default LemmaCommands;