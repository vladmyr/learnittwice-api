import { Node } from 'neo4j-driver/types/v1/graph-types';
import Integer from 'neo4j-driver/types/v1/integer';

interface INode extends Node {
  properties: {
    id: Integer
  }
}

export interface IORM {
  id: number
}

class ORM implements IORM {
  public id: number;

  public constructor(node: INode) {
    this.id = node.properties.id.toNumber();
  }
}

export default ORM;