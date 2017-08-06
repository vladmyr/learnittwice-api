import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ISynsetCommandsGph, 
  TSynsetGphDAONodeLabel, 
  TSynsetGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ISynsetRepository';

class SynsetCommandsGph extends AbstractCommandsGph<TSynsetGphDAORelationLabel, TSynsetGphDAONodeLabel> {
  protected static readonly LabelNode = Label.SYNSET;
  protected static Instance: ISynsetCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): ISynsetCommandsGph {
    return super.GetInstance(connector, SynsetCommandsGph);
  }
}

export default SynsetCommandsGph;