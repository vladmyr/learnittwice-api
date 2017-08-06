import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuDefinitionDAO, IDefinitionQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';
import AbstractQueries from './AbstractQueries';

class DefinitionQueries extends AbstractQueries<TuDefinitionDAO> {
  protected static readonly TableName = TableName.DEFINITION;
  protected static Instance: IDefinitionQueries;

  public static GetInstance(db?: IDatabase<{}>): IDefinitionQueries {
    return super.GetInstance(db, DefinitionQueries)
  }
}

export default DefinitionQueries;