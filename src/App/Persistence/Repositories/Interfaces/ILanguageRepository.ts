import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import { 
  IAbstractCommands, 
  IAbstractQueries, 
  IAbstractCommandsGph, 
  IAbstractQueriesGph 
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type TuLanguageDAO = ILanguageDAO | undefined;
export type TLanguageGphDAONodeLabel = ILabel['SENSE'] | ILabel['DEFINITION'];
export type TLanguageGphDAORelationLabel = ILabel['SENSE'] | ILabel['DEFINITION'];

export interface ILanguageKey {
  id: number
}

export interface ILanguageProps {
  iso: string
}

export interface ILanguageDAO extends ILanguageKey, ILanguageProps {}
export interface ILanguageGphDAO extends ILanguageKey {}

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

export interface ILanguageCommandsGph {
  getConnector(): Neo4jConnector

  createOne(id: ILanguageGphDAO['id']): Promise<ILanguageKey>
  createOne(id: ILanguageGphDAO['id'], t: any): Promise<ILanguageKey>

  createRelationOne(
    lemmaId: ILanguageGphDAO['id'], 
    relationLabel: TLanguageGphDAORelationLabel, 
    nodeId: number,
    nodeLabel: TLanguageGphDAONodeLabel,
    t?: any
  ): Promise<boolean>

  deleteOne(id: ILanguageGphDAO['id']): Promise<boolean>
  deleteOne(id: ILanguageGphDAO['id'], t: any): Promise<boolean>

  deleteRelationOne(
    id: ILanguageGphDAO['id'], 
    relationLabel: TLanguageGphDAORelationLabel, 
    nodeId: number,
    nodeLabel: TLanguageGphDAONodeLabel,
    t?: any
  ): Promise<boolean>
}