import { ITask } from 'pg-promise';

export type TuDefinitionDAO = IDefinitionDAO | undefined;

export interface IDefinitionProps {
  synsetId: number
  languageId: number
  definition: string
}

export interface IDefinitionDAO extends IDefinitionProps {
  id: number
}

export interface IDefinitionQueries {
  getDb()
  findOne(id: IDefinitionDAO['id']): Promise<TuDefinitionDAO>
  findOne(id: IDefinitionDAO['id'], t: ITask<{}>): Promise<TuDefinitionDAO>
  findMany(ids: IDefinitionDAO['id'][]): Promise<IDefinitionDAO[]>
  findMany(ids: IDefinitionDAO['id'][], t: ITask<{}>): Promise<IDefinitionDAO[]>
}

export interface IDefinitionCommands {
  getDb()
  createOne(props: IDefinitionProps): Promise<IDefinitionDAO>
  createOne(props: IDefinitionProps, t: ITask<{}>): Promise<IDefinitionDAO>
}