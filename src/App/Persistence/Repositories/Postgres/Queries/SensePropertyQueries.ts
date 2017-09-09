import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSensePropertyDAO, ISensePropertyQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ISensePropertyRepository';
import AbstractQueries from './AbstractQueries';

class SensePropertyQueries extends AbstractQueries<TuSensePropertyDAO> {
  protected static readonly TableName = TableName.SENSE_PROPERTY;
  protected static Instacne: ISensePropertyQueries

  public static GetInstance(db?: IDatabase<{}>): ISensePropertyQueries {
    return super.GetInstance(db, SensePropertyQueries);
  }
}

export default SensePropertyQueries;