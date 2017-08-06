import { AbstractQueriesGph } from './AbstractQueriesGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { ILemmaQueriesGph, TuLemmaGphDAO } 
  from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaQueriesGph extends AbstractQueriesGph<TuLemmaGphDAO> {
  protected static LabelNode = Label.LEMMA;
  protected static Instance: ILemmaQueriesGph;
  
  public static GetInstance(connector?: Neo4jConnector): ILemmaQueriesGph {
    return super.GetInstance(connector, LemmaQueriesGph)
  }
}

export default LemmaQueriesGph;