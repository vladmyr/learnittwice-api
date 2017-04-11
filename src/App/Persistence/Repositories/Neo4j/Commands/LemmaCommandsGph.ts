import { CommandsBase } from './CommandsBase';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { 
  ILemmaKey, 
  ILemmaGphDAO, 
  ILemmaCommandsGph, 
  TLemmaGphDAONodeLabel, 
  TLemmaGphDAORelationLabel 
} from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import LemmaGphORM from '../ORM/LemmaGphORM';

class LemmaCommandsGph extends CommandsBase {
  private static CREATE(id: ILemmaGphDAO['id']) {
    return `MERGE (lemma:${Label.LEMMA} { id: ${id} }) RETURN lemma`;
  }

  private static DELETE(id: ILemmaGphDAO['id']) {
    return `
      MATCH (lemma:${Label.LEMMA} { id: ${id} })
      DETACH DELETE lemma
    `;
  }

  private static CREATE_RELATION(
    id: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TLemmaGphDAONodeLabel
  ) {
    return `
      MATCH (lemma:${Label.LEMMA} { id: ${id} })
      MATCH (node:${nodeLabel} { id: ${nodeId} })
      MERGE (lemma)-[relation:${relationLabel}]-(node)
      RETURN relation
    `;
  }

  private static DELETE_RELATION(
    id: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TLemmaGphDAONodeLabel
  ) {
    return `
      MATCH (:${Label.LEMMA} { id: ${id} })-[relation:${relationLabel}]-(:${nodeLabel} { id: ${nodeId} }) 
      DELETE relation
    `;
  }

  private static _instance: ILemmaCommandsGph;
  
  public static GetInstance(connector?: Neo4jConnector): ILemmaCommandsGph {
    if (!LemmaCommandsGph._instance) {
      if (typeof connector == 'undefined') {
        throw new TypeError('[LemmaCommandsGph] argument `connector` can\'t be undefined during instantiation');
      }

      LemmaCommandsGph._instance = new LemmaCommandsGph(connector);
    }

    return LemmaCommandsGph._instance;
  }

  public async createOne(
    id: ILemmaGphDAO['id'],
    t?: any
  ): Promise<ILemmaKey> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(LemmaCommandsGph.CREATE(id))
        return new LemmaGphORM(res.records[0].toObject().lemma)
      })
  }

  public async deleteOne(
    id: ILemmaGphDAO['id'],
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(LemmaCommandsGph.DELETE(id))
        return res.summary.counters.containsUpdates();
      })
  }

  public async createRelationOne(
    lemmaId: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TLemmaGphDAONodeLabel,
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(
          LemmaCommandsGph.CREATE_RELATION(lemmaId, relationLabel, nodeId, nodeLabel)
        )
        return res.summary.counters.containsUpdates();
      })
  }

  public async deleteRelationOne(
    id: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TLemmaGphDAONodeLabel,
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(
          LemmaCommandsGph.DELETE_RELATION(id, relationLabel, nodeId, nodeLabel)
        )
        return res.summary.counters.containsUpdates();
      })
  }
}

export default LemmaCommandsGph;