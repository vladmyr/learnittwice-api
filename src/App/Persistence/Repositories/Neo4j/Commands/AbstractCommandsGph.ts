import { AbstractCommandQueryGph } from '../AbstractCommandQueryGph';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import ORM from '../ORM';

export abstract class AbstractCommandsGph<TRelationLabel, TTargetNodeLabel> extends AbstractCommandQueryGph {
  protected static readonly LabelNode: string;
  protected static readonly ORM = ORM;

  protected static Instance;

  protected static CREATE(id: number) {
    return `MERGE (node:${this.LabelNode} { id: ${id} }) RETURN node`;
  }

  protected static DELETE(id: number) {
    return `
      MATCH (node:${this.LabelNode} { id: ${id} })
      DETACH DELETE node
    `;
  }

  protected static CREATE_RELATION<TRelationLabel, TTargetNodeLabel>(
    id: number,
    relationLabel: TRelationLabel,
    targetNodeId: number,
    targetNodeLabel: TTargetNodeLabel
  ) {
    return `
      MATCH (node: ${this.LabelNode} { id: ${id} })
      MATCH (targetNode: ${targetNodeLabel} { id: ${targetNodeId} })
      MERGE (node)-[relation:${relationLabel}]-(targetNode)
      RETURN relation
    `;
  }

  protected static DELETE_RELATION<TRelationLabel, TTargetNodeLabel>(
    id: number,
    relationLabel: TRelationLabel,
    targetNodeId: number,
    targetNodeLabel: TTargetNodeLabel
  ) {
    return `
      MATCH (:${this.LabelNode} { id: ${id} })-[relation:${relationLabel}]-(:${targetNodeLabel} { id: ${targetNodeId} })
      DELETE relation
    `;
  }

  // TODO: use composition ineheritance to get rid of "_class" reference
  public static GetInstance(connector?: Neo4jConnector, _class?: any) {
    if (!this.Instance) {
      if (typeof connector == 'undefined') {
        throw new TypeError('[AbstractCommandsGph.GetInstance] argument `connector` can\'t be undefined during instantiation')
      }

      this.Instance = new _class(connector);
    }

    return this.Instance;
  }

  public createOne(
    id: number,
    t?: any
  ): Promise<ORM> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(this.constructor.CREATE(id))
        return new this.constructor.ORM(res.records[0].toObject().node)
      })
  }

  public deleteOne(
    id: number,
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(this.constructor.DELETE(id))
        return res.summary.counters.containsUpdates();
      })
  }

  public createRelationOne(
    lemmaId: number,
    relationLabel: TRelationLabel,
    targetNodeId: number,
    targetNodeLabel: TTargetNodeLabel,
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(
          this.constructor.CREATE_RELATION(
            lemmaId, 
            relationLabel, 
            targetNodeId, 
            targetNodeLabel
          )
        )
        return res.summary.counters.containsUpdates();
      })
  }

  public deleteRelationOne(
    id: number,
    relationLabel: TRelationLabel,
    targetNodeId: number,
    targetNodeLabel: TTargetNodeLabel,
    t?: any
  ): Promise<boolean> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(
          this.constructor.DELETE_RELATION(
            id, 
            relationLabel, 
            targetNodeId, 
            targetNodeLabel
          )
        )
        return res.summary.counters.containsUpdates();
      })
  }

  // NOTE: ts 2.4 does not have strongly typed constructors and
  // this workaround allows to call static properties of a class.
  // Reference: https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-298199835
  'constructor': typeof AbstractCommandsGph;
}