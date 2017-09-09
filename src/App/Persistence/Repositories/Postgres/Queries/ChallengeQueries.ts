import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuChallengeDAO, IChallengeQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/IChallengeRepository';
import AbstractQueries from './AbstractQueries';

class ChallengeQueries extends AbstractQueries<TuChallengeDAO> {
  protected static readonly TableName = TableName.CHALLENGE;
  protected static Instacne: IChallengeQueries

  public static GetInstance(db?: IDatabase<{}>): IChallengeQueries {
    return super.GetInstance(db, ChallengeQueries);
  }
}

export default ChallengeQueries;