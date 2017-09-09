import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuCustomPropertyDAO = ICustomPropertyDAO | undefined;

export interface ICustomPropertyKey {
  id: number
}

export interface ICustomPropertyProps {
  knowledgeUnitId: number,
  propertyRelationId: number,
  dataType: string  // TODO: set to tDataType
  name: string
  slug: string
  value: string
}

export interface ICustomPropertyDAO 
  extends ICustomPropertyKey, ICustomPropertyProps {}

export interface ICustomPropertyCommands 
  extends IAbstractCommands<ICustomPropertyProps, ICustomPropertyDAO> {}

export interface ICustomPropertyQueries
  extends IAbstractQueries<TuCustomPropertyDAO> {}