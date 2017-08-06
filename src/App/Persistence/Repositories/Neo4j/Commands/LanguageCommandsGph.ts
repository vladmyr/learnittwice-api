import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ILanguageCommandsGph, 
  TLanguageGphDAONodeLabel, 
  TLanguageGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';

class LanguageCommandsGph extends AbstractCommandsGph<TLanguageGphDAORelationLabel, TLanguageGphDAONodeLabel> {
  protected static readonly LabelNode = Label.LANGUAGE;
  protected static Instance: ILanguageCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): ILanguageCommandsGph {
    return super.GetInstance(connector, LanguageCommandsGph);
  }
}

export default LanguageCommandsGph;