import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type TuLexemeFormDAO = ILexemeFormDAO | undefined;
export type TLexemeFormGphDAONodeLabel = ILabel['LEXEME_FORM'];
export type TLexemeFormGphDAORelationLabel = ILabel['LEXEME_FORM'];

export interface ILexemeFormKey {
  id: number
}

export interface ILexemeFormProps {
  form: string
}

export interface ILexemeFormDAO extends ILexemeFormKey, ILexemeFormProps {}
export interface ILexemeFormGphDAO extends ILexemeFormKey {}

export interface ILexemeFormQueries {
  getDb()

  findOne(id: ILexemeFormKey['id']): Promise<TuLexemeFormDAO>
  findOne(id: ILexemeFormKey['id'], t: ITask<{}>): Promise<TuLexemeFormDAO>
  
  findMany(ids: ILexemeFormKey['id'][]): Promise<TuLexemeFormDAO[]>
  findMany(ids: ILexemeFormKey['id'][], t: ITask<{}>): Promise<TuLexemeFormDAO[]>
}

export interface ILexemeFormCommands {
  getDb()

  createOne(props: ILexemeFormProps): Promise<ILexemeFormDAO>
  createOne(props: ILexemeFormProps, t: ITask<{}>): Promise<ILexemeFormDAO>

  createMany(lstProps: ILexemeFormProps[]): Promise<ILexemeFormDAO[]>
  createMany(lstProps: ILexemeFormProps[], t: ITask<{}>): Promise<ILexemeFormDAO[]>

  updateOne(id: ILexemeFormDAO['id'], props: ILexemeFormProps): Promise<ILexemeFormDAO>
  updateOne(id: ILexemeFormDAO['id'], props: ILexemeFormProps, t: ITask<{}>): Promise<ILexemeFormDAO>

  deleteOne(id: ILexemeFormDAO['id']): Promise<boolean>
  deleteOne(id: ILexemeFormDAO['id'], t: ITask<{}>): Promise<boolean>
}

export interface ILexemeFormCommandsGph {
  getConnector(): Neo4jConnector

  createOne(id: ILexemeFormGphDAO['id']): Promise<ILexemeFormKey>
  createOne(id: ILexemeFormGphDAO['id'], t: any): Promise<ILexemeFormKey>

  deleteOne(id: ILexemeFormDAO['id']): Promise<boolean>
  deleteOne(id: ILexemeFormDAO['id'], t: any): Promise<boolean>

  createRelationOne(
    id: ILexemeFormGphDAO['id'],
    relationLabel: TLexemeFormGphDAORelationLabel,
    targetNodeId: number,
    targetNodeLabel: TLexemeFormGphDAONodeLabel
  ): Promise<boolean>

  deleteRelationOne(
    id: ILexemeFormGphDAO['id'],
    relationLabel: TLexemeFormGphDAORelationLabel,
    targetNodeId: number,
    targetNodeLabel: TLexemeFormGphDAONodeLabel
  ): Promise<boolean>
}