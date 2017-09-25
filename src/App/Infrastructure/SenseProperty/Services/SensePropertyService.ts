import { Tx }
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

import { ISensePropertyProps }
  from 'src/App/Persistence/Repositories/Interfaces/ISensePropertyRepository'


class SensePropertyService {
  public static async CreateOne(props: ISensePropertyProps, t?: Tx) {

  }
  
  public static async UpdateOne(id: number, props: ISensePropertyProps, t?: Tx) {

  }

  public static async FindOne(id: number, t?: Tx) {

  }

  public static async DeleteOne(id: number, t?: Tx) {

  }

  // ToDo:
  // Search by
  // - lemma
  // - part of speech
  // - definition
  public static async SearchMany(
    lemma: string, 
    partOfSpeech: string, 
    definition: string, 
    t?:Tx
  ) {

  }
}

export default SensePropertyService;