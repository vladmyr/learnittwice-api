import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ILemmaCommandsGph, 
  TLemmaGphDAONodeLabel, 
  TLemmaGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaCommandsGph extends AbstractCommandsGph<TLemmaGphDAORelationLabel, TLemmaGphDAONodeLabel> {
  protected static readonly LabelNode = Label.LEMMA;
  protected static Instance: ILemmaCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): ILemmaCommandsGph {
    return super.GetInstance(connector, LemmaCommandsGph);
  }
}

export default LemmaCommandsGph;