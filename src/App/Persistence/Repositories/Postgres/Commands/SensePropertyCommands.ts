import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ISensePropertyProps, TuSensePropertyDAO, ISensePropertyCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ISensePropertyRepository';
import AbstractCommands from './AbstractCommands';

class SensePropertyCommands 
  extends AbstractCommands<ISensePropertyProps, TuSensePropertyDAO> {
    protected static readonly TableName = TableName.SENSE_PROPERTY;
    protected static Instance: ISensePropertyCommands;

    public static GetInstance(db?: IDatabase<{}>): ISensePropertyCommands {
      return super.GetInstance(db, SensePropertyCommands);
    }
}

export default SensePropertyCommands;