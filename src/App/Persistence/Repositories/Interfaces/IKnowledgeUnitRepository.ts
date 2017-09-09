import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuKnowledgeUnitDAO = IKnowledgeUnitDAO | undefined;

export interface IKnowledgeUnitKey {
  id: number
}

export interface IKnowledgeUnitProps {
  lessonId: number,
  order: number,
  isPublished: boolean
}

export interface IKnowledgeUnitDAO 
  extends IKnowledgeUnitKey, IKnowledgeUnitProps {}

export interface IKnowledgeUnitCommands 
  extends IAbstractCommands<IKnowledgeUnitProps, IKnowledgeUnitDAO> {}

export interface IKnowledgeUnitQueries
  extends IAbstractQueries<TuKnowledgeUnitDAO> {}