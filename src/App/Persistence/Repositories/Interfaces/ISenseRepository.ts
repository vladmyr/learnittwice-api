import { ITask } from 'pg-promise';

export type TuSenseDAO = ISenseDAO | undefined;

export interface ISenseProps {
  lemmaId: number
  languageId: number
  synsetId: number
  tagCount: number
}

export interface ISenseDAO extends ISenseProps{
  id: number
}

export interface ISenseQueries {
  getDb()
  findOne(id: ISenseDAO['id']): Promise<TuSenseDAO>
  findOne(id: ISenseDAO['id'], t: ITask<{}>): Promise<TuSenseDAO>
  findMany(ids: ISenseDAO['id'][]): Promise<ISenseDAO[]>
  findMany(ids: ISenseDAO['id'][], t: ITask<{}>): Promise<ISenseDAO[]>
}

export interface ISenseCommands {
  getDb()
  createOne(props: ISenseProps): Promise<ISenseDAO>
  createOne(props: ISenseProps, t: ITask<{}>): Promise<ISenseDAO>
}