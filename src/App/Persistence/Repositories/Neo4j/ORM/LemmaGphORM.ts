import { ILemmaKey } 
  from 'src/App/Persistence/Repositories/Interfaces/ILemmaRepository'

class LemmaGphORM implements ILemmaKey {
  public id: number;

  public constructor(lemmaNode) {
    this.id = lemmaNode.properties.id.toNumber();
  }
}

export default LemmaGphORM;