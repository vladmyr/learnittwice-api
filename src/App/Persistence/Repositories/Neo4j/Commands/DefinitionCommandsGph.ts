import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  IDefinitionCommandsGph, 
  TDefinitionGphDAONodeLabel, 
  TDefinitionGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/IDefinitionRepository';

class DefinitionCommandsGph extends AbstractCommandsGph<TDefinitionGphDAORelationLabel, TDefinitionGphDAONodeLabel> {
  protected static readonly LabelNode = Label.DEFINITION;
  protected static Instance: IDefinitionCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): IDefinitionCommandsGph {
    return super.GetInstance(connector, DefinitionCommandsGph);
  }
}

export default DefinitionCommandsGph;