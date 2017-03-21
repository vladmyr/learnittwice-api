import * as Promise from 'bluebird';
import { QueriesBase } from './QueriesBase';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { ILemmaGphDAO, ILemmaQueriesGph, TLemmaGphDAORelationLabel } 
  from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaQueriesGph extends QueriesBase {
  private static _instance: ILemmaQueriesGph;
  
  public static GetInstance(connector?: Neo4jConnector): ILemmaQueriesGph {
    if (!LemmaQueriesGph._instance) {
      if (typeof connector == 'undefined') {
        throw new TypeError('[LemmaQueriesGph] argument `connector` can\'t be undefined during instantiation');
      }

      LemmaQueriesGph._instance = new LemmaQueriesGph(connector);
    }

    return LemmaQueriesGph._instance;
  }

  
}

export default LemmaQueriesGph;