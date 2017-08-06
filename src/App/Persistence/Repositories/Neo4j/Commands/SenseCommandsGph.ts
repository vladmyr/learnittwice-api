import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ISenseCommandsGph, 
  TSenseGphDAONodeLabel, 
  TSenseGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ISenseRepository';

class SenseCommandsGph extends AbstractCommandsGph<TSenseGphDAORelationLabel, TSenseGphDAONodeLabel> {
  protected static readonly LabelNode = Label.SENSE;
  protected static Instance: ISenseCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): ISenseCommandsGph {
    return super.GetInstance(connector, SenseCommandsGph);
  }
}

export default SenseCommandsGph;