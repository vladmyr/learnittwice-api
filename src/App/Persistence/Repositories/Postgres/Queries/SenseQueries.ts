import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuSenseDAO, ISenseQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';
import AbstractQueries from './AbstractQueries';

class SenseQueries extends AbstractQueries<TuSenseDAO> {
  protected static readonly TableName = TableName.SENSE
  protected static Instance: ISenseQueries;

  public static readonly QUERY_FIND_BY_LEMMA_ID =
    `SELECT * FROM "${TableName.SENSE}" AS s WHERE s."lemmaId" = $(id)`
  public static readonly QUERY_FIND_BY_LANGUAGE_ID =
    `SELECT * FROM "${TableName.SENSE}" AS s WHERE s."languageId" = $(id)`
  public static readonly QUERY_FIND_BY_SYNSET_ID =
    `SELECT * FROM "${TableName.SENSE}" AS s WHERE s."synsetId" = $(id)`

  public static GetInstance(db?: IDatabase<{}>): ISenseQueries {
    return super.GetInstance(db, SenseQueries);
  }
}

export default SenseQueries;