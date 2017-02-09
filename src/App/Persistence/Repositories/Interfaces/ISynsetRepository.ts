import { IDatabase, ITask } from 'pg-promise';

export type TuSynsetDAO = ISynsetDAO | undefined;

export interface ISynsetProps {

}

export interface ISynsetDAO extends ISynsetProps {
  id: number
}

export interface ISynsetQueries {
  getDb(): IDatabase<{}>
  findOne(id: ISynsetDAO['id']): Promise<TuSynsetDAO>
  findOne(id: ISynsetDAO['id'], t: ITask<{}>): Promise<TuSynsetDAO>
  findMany(ids: ISynsetDAO['id'][]): Promise<ISynsetDAO[]>
  findMany(ids: ISynsetDAO['id'][], t: ITask<{}>): Promise<ISynsetDAO[]>
}

export interface ISynsetCommands {
  getDb(): IDatabase<{}>
  createOne(props: ISynsetProps): Promise<ISynsetDAO>
  createOne(props: ISynsetProps, t: ITask<{}>): Promise<ISynsetDAO>
}