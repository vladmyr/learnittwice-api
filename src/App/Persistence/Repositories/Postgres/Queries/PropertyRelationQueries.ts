import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuPropertyRelationDAO, IPropertyRelationQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/IPropertyRelationRepository';
import AbstractQueries from './AbstractQueries';

class PropertyRelationQueries extends AbstractQueries<TuPropertyRelationDAO> {
  protected static readonly TableName = TableName.PROPERTY_RELATION;
  protected static Instacne: IPropertyRelationQueries

  public static GetInstance(db?: IDatabase<{}>): IPropertyRelationQueries {
    return super.GetInstance(db, PropertyRelationQueries);
  }
}

export default PropertyRelationQueries;