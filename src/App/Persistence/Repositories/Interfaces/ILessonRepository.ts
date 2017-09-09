import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuLessonDAO = ILessonDAO | undefined;

export interface ILessonKey {
  id: number
}

export interface ILessonProps {
  courseId: number,
  order: number,
  isPublished: boolean
}

export interface ILessonDAO 
  extends ILessonKey, ILessonProps {}

export interface ILessonCommands 
  extends IAbstractCommands<ILessonProps, ILessonDAO> {}

export interface ILessonQueries
  extends IAbstractQueries<TuLessonDAO> {}