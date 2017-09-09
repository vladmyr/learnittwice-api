import * as Bluebird from 'bluebird';
import { IDatabase, ITask } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TFLemmaDAO, ILemmaDAO, ILemmaProps, ILemmaCommands } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import AbstractCommands from './AbstractCommands';
import ArrayUtil from 'src/App/Domain/Helpers/Modules/Array';

class LemmaCommands extends AbstractCommands<ILemmaProps, TFLemmaDAO> {
  protected static readonly TableName = TableName.LEMMA;
  protected static Instance: ILemmaCommands;

  private constructor(db:IDatabase<{}>) {
    super(db);
  }

  public static GetInstance(db?: IDatabase<{}>): ILemmaCommands {
    return super.GetInstance(db, LemmaCommands);
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
}

export default LemmaCommands;