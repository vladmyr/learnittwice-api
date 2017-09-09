/**
 * IAbstractRepository
 * abstraction over all the repositories
 */

import { ITask, IArrayExt } from 'pg-promise';
import { QueryBuilder } from 'knex';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type Tx = ITask<{}>

export interface IAbstractCommands<TProps, TDao> {
  getDb()

  createOne(props: TProps, t?: Tx): Promise<TDao>
  createMany(lstProps: TProps[], t?: Tx): Promise<TProps[]>
  updateOne(id: number, props: TProps, t?: Tx): Promise<TDao | undefined>
  deleteOne(id: number, t?: Tx): Promise<void>
  deleteMany(ids: number[], t?: Tx): Promise<void>

  build<T>(queryBuilder, t?: Tx): Promise<IArrayExt<T>>
}

export interface IAbstractQueries<T> {
  getDb()

  count(t?: Tx): Promise<number>
  findOne(id: number, t?: Tx): Promise<T | undefined>
  findMany(ids: number[], t?: Tx): Promise<T[]>

  build<U>(queryBuilder: QueryBuilder, t?: Tx): Promise<IArrayExt<U>>
}

export interface IAbstractCommandsGph<TRelLabel, TNodeLabel> {
  getConnector(): Neo4jConnector

  createOne(id: number, t?: any): Promise<{ id: number }>
  deleteOne(id: number, t?: any): Promise<boolean>
  
  createRelationOne(
    id: number,
    relationLabel: TRelLabel,
    targetNodeId: number,
    targetNodeLabel: TNodeLabel,
    t?: any
  ): Promise<boolean>

  deleteRelationOne(
    id: number,
    relationLabel: TRelLabel,
    targetNodeId: number,
    targetNodeLabel: TNodeLabel,
    t?: any
  ): Promise<boolean>
}

export interface IAbstractQueriesGph<T> {
  getConnector(): Neo4jConnector

  findOne(id: number, t?: any): Promise<T | undefined>
  findMany(ids: number[], t?: any): Promise<T[]>
}