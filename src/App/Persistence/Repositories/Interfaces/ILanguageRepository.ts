import { ITask } from 'pg-promise';

export type TuLanguageDAO = ILanguageDAO | undefined;

export interface ILanguageProps {
  iso: string
}

export interface ILanguageDAO extends ILanguageProps{
  id: number
}

export interface ILanguageQueries {
  getDb()
  findOne(id: ILanguageDAO['id']): Promise<TuLanguageDAO>
  findOne(id: ILanguageDAO['id'], t: ITask<{}>): Promise<TuLanguageDAO>
  
  findMany(ids: ILanguageDAO['id'][]): Promise<ILanguageDAO[]>
  findMany(ids: ILanguageDAO['id'][], t: ITask<{}>): Promise<ILanguageDAO[]>

  findAll(): Promise<ILanguageDAO[]>
  findAll(limit: number): Promise<ILanguageDAO[]>
  findAll(limit: number, offset: number): Promise<ILanguageDAO[]>
  findAll(limit: number, offset: number, t: ITask<{}>): Promise<ILanguageDAO[]>
}

export interface ILanguageCommands {
  getDb()
  createOne(iso: ILanguageDAO['iso']): Promise<ILanguageDAO>
  createOne(iso: ILanguageDAO['iso'], t: ITask<{}>): Promise<ILanguageDAO>
}