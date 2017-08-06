import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import { 
  IAbstractCommands, 
  IAbstractQueries, 
  IAbstractCommandsGph, 
  IAbstractQueriesGph 
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import Neo4jConnector from 'src/App/Persistence/Connectors/Neo4jDBConnector';

export type TuDefinitionDAO = IDefinitionDAO | undefined;
export type TDefinitionGphDAONodeLabel = ILabel['SYNSET'] 
  | ILabel['LANGUAGE'];
export type TDefinitionGphDAORelationLabel = ILabel['DEFINITION'] 
  | ILabel['LANGUAGE'];

export interface IDefinitionKey {
  id: number
}

export interface IDefinitionProps {
  synsetId: number
  languageId: number
  definition: string
}

export interface IDefinitionDAO extends IDefinitionKey, IDefinitionProps {}
export interface IDefinitionGphDAO extends IDefinitionKey {}

export interface IDefinitionQueries extends IAbstractQueries<IDefinitionDAO> {}

// export interface IDefinitionCommands 
//   extends IAbstractCommands<IDefinitionProps, IDefinitionDAO> {}
export interface IDefinitionCommands {
  getDb()
  createOne(props: IDefinitionProps, t?: ITask<{}>): Promise<TuDefinitionDAO>
}

export interface IDefinitionCommandsGph extends IAbstractCommandsGph
  <TDefinitionGphDAORelationLabel, TDefinitionGphDAONodeLabel> {}