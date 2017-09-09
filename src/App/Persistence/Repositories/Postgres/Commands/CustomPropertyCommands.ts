import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ICustomPropertyProps, TuCustomPropertyDAO, ICustomPropertyCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/ICustomPropertyRepository';
import AbstractCommands from './AbstractCommands';

class CustomPropertyCommands 
  extends AbstractCommands<ICustomPropertyProps, TuCustomPropertyDAO> {
    protected static readonly TableName = TableName.CUSTOM_PROPERTY;
    protected static Instance: ICustomPropertyCommands;

    public static GetInstance(db?: IDatabase<{}>): ICustomPropertyCommands {
      return super.GetInstance(db, CustomPropertyCommands);
    }
}

export default CustomPropertyCommands;