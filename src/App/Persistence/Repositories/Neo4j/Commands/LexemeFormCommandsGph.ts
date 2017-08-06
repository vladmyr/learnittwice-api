import { AbstractCommandsGph } from './AbstractCommandsGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ILexemeFormCommandsGph,
  TLexemeFormGphDAONodeLabel, 
  TLexemeFormGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ILexemeFormRepository';

class LexemeFormCommandsGph extends AbstractCommandsGph<TLexemeFormGphDAORelationLabel, TLexemeFormGphDAONodeLabel> {
  protected static readonly LabelNode = Label.LEXEME_FORM;
  protected static Instance: ILexemeFormCommandsGph;

  public static GetInstance(connector?: Neo4jConnector): ILexemeFormCommandsGph {
    return super.GetInstance(connector, LexemeFormCommandsGph);
  }
}

export default LexemeFormCommandsGph;