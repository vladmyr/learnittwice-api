import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSynsetDAO, ISynsetQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';
import AbstractQueries from './AbstractQueries';

class SynsetQueries extends AbstractQueries<TuSynsetDAO> {
  protected static readonly TableName = TableName.SYNSET;
  protected static Instacne: ISynsetQueries

  public static GetInstance(db?: IDatabase<{}>): ISynsetQueries {
    return super.GetInstance(db, SynsetQueries);
  }
}

export default SynsetQueries;