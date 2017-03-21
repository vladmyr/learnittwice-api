import * as Promise from 'bluebird';
import { CommandsBase } from './CommandsBase';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import { Label } from 'src/App/Persistence/Repositories/Neo4jMeta';
import { ILemmaGphDAO, ILemmaCommandsGph, TLemmaGphDAORelationLabel } 
  from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaCommandsGph extends CommandsBase {
  private static CREATE(id: ILemmaGphDAO['id']) {
    return `MERGE (lemma:${Label.LEMMA} { id: ${id} }) RETURN lemma`;
  }

  private static DELETE(id: ILemmaGphDAO['id']) {
    return `REMOVE (:${Label.LEMMA} { id: ${id} })`;
  }

  private static CREATE_RELATION(
    id: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    relationId: number
  ) {
    return `
      MATCH (lemma:${Label.LEMMA} { id: ${id} }), 
        (node:${relationLabel} { id: ${relationId} }) 
      MERGE(lemma)-[relation:${relationLabel}]-(node)
    `;
  }

  private static DELETE_RELATION(
    id: ILemmaGphDAO['id'],
    relationLabel: TLemmaGphDAORelationLabel,
    relationId: number
  ) {
    return `
      MATCH (:${Label.LEMMA} { id: ${id} })-[relation:${relationLabel}]-(:${relationLabel} { id: ${relationId} }) 
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

  public createOne(
    id: ILemmaGphDAO['id'],
    t?: any
  ): Promise<ILemmaGphDAO> {
    return this
      ._getScopeOfExecution(t)((session, fulfill, reject) => {
        return session
          .run(LemmaCommandsGph.CREATE(id))
          .then(fulfill)
          .catch(reject)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  public deleteOne(
    id: ILemmaGphDAO['id'],
    t?: any
  ): Promise<void> {
    return this
      ._getScopeOfExecution(t)((session, fulfill, reject) => {
        return session
          .run(LemmaCommandsGph.DELETE(id))
          .then(fulfill)
          .catch(reject)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  public createRelationOne(
    id: ILemmaGphDAO['id'],
    label: TLemmaGphDAORelationLabel,
    relationId: number,
    t?: any
  ): Promise<void> {
    return this
      ._getScopeOfExecution(t)((session, fulfill, reject) => {
        return session
          .run(LemmaCommandsGph.CREATE_RELATION(id, label, relationId))
          .then(fulfill)
          .catch(reject)
      })
  }

  public deleteRelationOne(
    id: ILemmaGphDAO['id'],
    label: TLemmaGphDAORelationLabel,
    relationId: number,
    t?: any
  ): Promise<void> {
    return this
      ._getScopeOfExecution(t)((session, fulfill, reject) => {
        return session
          .run(LemmaCommandsGph.DELETE_RELATION(id, label, relationId))
          .then(fulfill)
          .catch(reject)
      })
  }
}

export default LemmaCommandsGph;