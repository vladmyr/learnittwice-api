import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type TuSenseDAO = ISenseDAO | undefined;
export type TSenseGphDAONodeLabel = ILabel['SYNSET'] 
  | ILabel['LEMMA']
  | ILabel['LEXEME_FORM']
  | ILabel['LANGUAGE'];
export type TSenseGphDAORelationLabel = ILabel['SYNSET'] 
  | ILabel['SENSE']
  | ILabel['LEXEME_FORM']
  | ILabel['LANGUAGE'];

export interface ISenseProps {
  lemmaId: number
  languageId: number
  synsetId: number
  tagCount: number
}

export interface ISenseKey extends ISenseProps {
  id: number
}

export interface ISenseDAO extends ISenseKey, ISenseProps {}
export interface ISenseGphDAO extends ISenseKey {}

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

export interface ISenseCommandsGph {
  getConnector(): Neo4jConnector

  createOne(id: ISenseGphDAO['id']): Promise<ISenseKey>
  createOne(id: ISenseGphDAO['id'], t: any): Promise<ISenseKey>

  createRelationOne(
    id: ISenseGphDAO['id'], 
    relationLabel: TSenseGphDAORelationLabel, 
    nodeId: number,
    nodeLabel: TSenseGphDAONodeLabel,
    t?: any
  ): Promise<boolean>

  deleteOne(id: ISenseGphDAO['id']): Promise<boolean>
  deleteOne(id: ISenseGphDAO['id'], t: any): Promise<boolean>

  deleteRelationOne(
    id: ISenseGphDAO['id'], 
    relationLabel: TSenseGphDAORelationLabel, 
    nodeId: number,
    nodeLabel: TSenseGphDAONodeLabel,
    t?: any
  ): Promise<boolean>
}