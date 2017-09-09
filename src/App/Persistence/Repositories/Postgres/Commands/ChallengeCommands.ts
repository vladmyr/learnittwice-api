import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { IChallengeProps, TuChallengeDAO, IChallengeCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/IChallengeRepository';
import AbstractCommands from './AbstractCommands';

class ChallengeCommands 
  extends AbstractCommands<IChallengeProps, TuChallengeDAO> {
    protected static readonly TableName = TableName.CHALLENGE;
    protected static Instance: IChallengeCommands;

    public static GetInstance(db?: IDatabase<{}>): IChallengeCommands {
      return super.GetInstance(db, ChallengeCommands);
    }
}

export default ChallengeCommands;