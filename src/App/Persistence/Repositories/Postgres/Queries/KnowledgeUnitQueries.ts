import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuKnowledgeUnitDAO, IKnowledgeUnitQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/IKnowledgeUnitRepository';
import AbstractQueries from './AbstractQueries';

class KnowledgeUnitQueries extends AbstractQueries<TuKnowledgeUnitDAO> {
  protected static readonly TableName = TableName.KNOWLEDGE_UNIT;
  protected static Instacne: IKnowledgeUnitQueries

  public static GetInstance(db?: IDatabase<{}>): IKnowledgeUnitQueries {
    return super.GetInstance(db, KnowledgeUnitQueries);
  }
}

export default KnowledgeUnitQueries;