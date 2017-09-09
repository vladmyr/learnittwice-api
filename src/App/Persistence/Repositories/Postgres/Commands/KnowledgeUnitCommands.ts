import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { IKnowledgeUnitProps, TuKnowledgeUnitDAO, IKnowledgeUnitCommands } 
  from 'src/App/Persistence/Repositories/Interfaces/IKnowledgeUnitRepository';
import AbstractCommands from './AbstractCommands';

class KnowledgeUnitCommands 
  extends AbstractCommands<IKnowledgeUnitProps, TuKnowledgeUnitDAO> {
    protected static readonly TableName = TableName.KNOWLEDGE_UNIT;
    protected static Instance: IKnowledgeUnitCommands;

    public static GetInstance(db?: IDatabase<{}>): IKnowledgeUnitCommands {
      return super.GetInstance(db, KnowledgeUnitCommands);
    }
}

export default KnowledgeUnitCommands;