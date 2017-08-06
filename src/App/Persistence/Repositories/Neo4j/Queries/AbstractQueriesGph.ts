import { AbstractCommandQueryGph } from '../AbstractCommandQueryGph';
import * as _ from 'underscore';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';
import ORM from '../ORM';

export abstract class AbstractQueriesGph<TDAO> extends AbstractCommandQueryGph {
  protected static readonly LabelNode: string;
  protected static readonly ORM = ORM;

  protected static Instance;

  protected static FIND_ONE(id: number) {
    return `MATCH (node:${this.LabelNode} { id: ${id} }) RETURN node LIMIT 1`;
  }

  protected static FIND_MANY(ids: number[]) {
    return `
      MATCH (node:${this.LabelNode}) 
      WHERE node.id IN [${ids.join(',')}] 
      RETURN node
    `;
  }

  // TODO: use composition ineheritance to get rid of "_class" reference
  public static GetInstance(connector?: Neo4jConnector, _class?: any) {
    if (!this.Instance) {
      if (typeof connector == 'undefined') {
        throw new TypeError('[AbstractQueriesGph.GetInstance] argument `connector` can\'t be undefined during instantiation');
      }

      this.Instance = new _class(connector);
    }

    return this.Instance;
  }

  public findOne(id: number, t?: any): Promise<TDAO> {
    return this
      ._getScope(t)(async (session) => {
        const res = await session.run(this.constructor.FIND_ONE(id));

        if (!res.records || res.records.length == 0) {
          return undefined;
        }

        return new this.constructor.ORM(res.records[0].toObject().node);
      })
  }

  public findMany(ids: number[], t?: any): Promise<TDAO[]> {
    return this._getScope(t)(async (session) => {
      const res = await session.run(this.constructor.FIND_MANY(ids));

      if (!res.records || res.records.length == 0) {
        return [];
      }

      return _.map(res.records, (record: any) => {
        return new this.constructor.ORM(record.toObject().node);
      });
    })
  }

  // NOTE: ts 2.4 does not have strongly typed constructors and
  // this workaround allows to call static properties of a class.
  // Reference: https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-298199835
  'constructor': typeof AbstractQueriesGph;
}