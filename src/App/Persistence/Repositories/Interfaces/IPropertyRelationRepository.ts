import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuPropertyRelationDAO = IPropertyRelationDAO | undefined;

export interface IPropertyRelationKey {
  id: number
}

export interface IPropertyRelationProps {
  value: string   // TODO: change type to tPropertyRelation
}

export interface IPropertyRelationDAO 
  extends IPropertyRelationKey, IPropertyRelationProps {}

export interface IPropertyRelationCommands 
  extends IAbstractCommands<IPropertyRelationProps, IPropertyRelationDAO> {}

export interface IPropertyRelationQueries
  extends IAbstractQueries<TuPropertyRelationDAO> {}