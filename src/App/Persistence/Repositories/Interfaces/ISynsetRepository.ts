import { IDatabase, ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import { 
  IAbstractCommands, 
  IAbstractQueries, 
  IAbstractCommandsGph, 
  IAbstractQueriesGph 
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type TuSynsetDAO = ISynsetDAO | undefined;
export type TSynsetGphDAONodeLabel = ILabel['SYNSET'];
export type TSynsetGphDAORelationLabel = ILabel['SYNSET'];

export interface ISynsetProps {}

export interface ISynsetKey {
  id: number
}

export interface ISynsetDAO extends ISynsetKey, ISynsetProps {}
export interface ISynsetGphDAO extends ISynsetKey {}

export interface ISynsetQueries extends IAbstractQueries<ISynsetDAO> {}

export interface ISynsetCommands {
  getDb(): IDatabase<{}>
  createOne(props: ISynsetProps): Promise<ISynsetDAO>
  createOne(props: ISynsetProps, t: ITask<{}>): Promise<ISynsetDAO>
}

export interface ISynsetCommandsGph {
  getConnector(): Neo4jConnector

  createOne(id: ISynsetGphDAO['id']): Promise<ISynsetKey>
  createOne(id: ISynsetGphDAO['id'], t: any): Promise<ISynsetKey>

  deleteOne(id: ISynsetGphDAO['id']): Promise<boolean>
  deleteOne(id: ISynsetGphDAO['id'], t: any): Promise<boolean>

  createRelationOne(
    id: ISynsetGphDAO['id'],
    relationLabel: TSynsetGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TSynsetGphDAONodeLabel,
    t?: any
  ): Promise<boolean>

  deleteRelationOne(
    id: ISynsetGphDAO['id'],
    relationLabel: TSynsetGphDAORelationLabel,
    nodeId: number,
    nodeLabel: TSynsetGphDAONodeLabel,
    t?: any
  ): Promise<boolean>
}