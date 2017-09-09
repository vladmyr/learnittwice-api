import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuSensePropertyDAO = ISensePropertyDAO | undefined;

export interface ISensePropertyKey {
  id: number
}

export interface ISensePropertyProps {
  knowledgeUnitId: number,
  propertyRelationId: number,
  senseId: number
}

export interface ISensePropertyDAO 
  extends ISensePropertyKey, ISensePropertyProps {}

export interface ISensePropertyCommands 
  extends IAbstractCommands<ISensePropertyProps, ISensePropertyDAO> {}

export interface ISensePropertyQueries
  extends IAbstractQueries<TuSensePropertyDAO> {}