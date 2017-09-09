import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuCustomPropertyDAO, ICustomPropertyQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ICustomPropertyRepository';
import AbstractQueries from './AbstractQueries';

class CustomPropertyQueries extends AbstractQueries<TuCustomPropertyDAO> {
  protected static readonly TableName = TableName.CUSTOM_PROPERTY;
  protected static Instacne: ICustomPropertyQueries

  public static GetInstance(db?: IDatabase<{}>): ICustomPropertyQueries {
    return super.GetInstance(db, CustomPropertyQueries);
  }
}

export default CustomPropertyQueries;