import * as Promise from 'bluebird';
import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';

// FIXME: TFLemmaDAO -> TuLemmaDAO
export type TFLemmaDAO = ILemmaDAO | undefined;
export type TLemmaGphDAORelationLabel = ILabel['SENSE'];

export interface ILemmaKey {
  id: number
}

export interface ILemmaProps {
  lemma: string
}

export interface ILemmaDAO extends ILemmaKey, ILemmaProps {}
export interface ILemmaGphDAO extends ILemmaKey {}

export interface ILemmaCommands {
  getDb()

  createOne(lemma: ILemmaDAO['lemma']): Promise<ILemmaDAO>
  createOne(lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<ILemmaDAO>

  createMany(lemmas: ILemmaDAO['lemma'][]): Promise<ILemmaDAO[]>
  createMany(lemmas: ILemmaDAO['lemma'][], t: ITask<{}>): Promise<ILemmaDAO[]>

  updateOne(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO>
  updateOne(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<TFLemmaDAO>

  deleteOne(id: ILemmaDAO['id']): Promise<void>
  deleteOne(id: ILemmaDAO['id'], t: ITask<{}>): Promise<void>
}

export interface ILemmaQueries {
  getDb()

  findOne(id: ILemmaDAO['id']): Promise<TFLemmaDAO>
  findOne(id: ILemmaDAO['id'], t: ITask<{}>): Promise<TFLemmaDAO>

  findOneByLemma(lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO>
  findOneByLemma(lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<TFLemmaDAO>
  
  findMany(ids: ILemmaDAO['id'][]): Promise<TFLemmaDAO[]>
  findMany(ids: ILemmaDAO['id'][], t: ITask<{}>): Promise<TFLemmaDAO[]>
}

export interface ILemmaCommandsGph {
  createOne(id: ILemmaGphDAO['id']): Promise<ILemmaGphDAO>
  createOne(id: ILemmaGphDAO['id'], t: any): Promise<ILemmaGphDAO>

  createRelationOne(
    id: ILemmaGphDAO['id'], 
    relationLabel: TLemmaGphDAORelationLabel, 
    relationId: number,
    t?: any
  ): Promise<void>

  deleteOne(id: ILemmaGphDAO['id']): Promise<void>
  deleteOne(id: ILemmaGphDAO['id'], t: any): Promise<void>

  deleteRelationOne(
    id: ILemmaGphDAO['id'], 
    relationLabel: TLemmaGphDAORelationLabel, 
    relationId: number,
    t?: any
  ): Promise<void>
}

export interface ILemmaQueriesGph {

}