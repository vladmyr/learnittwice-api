import {
  IAbstractCommands,
  IAbstractQueries
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

export type TuCourseDAO = ICourseDAO | undefined;

export interface ICourseKey {
  id: number
}

export interface ICourseProps {
  title: string,
  slug: string,
  briefDescription: string
}

export interface ICourseDAO 
  extends ICourseKey, ICourseProps {}

export interface ICourseCommands 
  extends IAbstractCommands<ICourseProps, ICourseDAO> {}

export interface ICourseQueries
  extends IAbstractQueries<TuCourseDAO> {}