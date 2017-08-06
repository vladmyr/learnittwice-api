import { ITask } from 'pg-promise';

import { ILabel } from '../Neo4jMeta';
import { 
  IAbstractCommands, 
  IAbstractQueries, 
  IAbstractCommandsGph, 
  IAbstractQueriesGph 
} from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';

// FIXME: TFLemmaDAO -> TuLemmaDAO
export type TFLemmaDAO = ILemmaDAO | undefined;
export type TuLemmaGphDAO = ILemmaGphDAO | undefined;
export type TLemmaGphDAONodeLabel = ILabel['SENSE'];
export type TLemmaGphDAORelationLabel = ILabel['SENSE'];

export interface ILemmaKey {
  id: number
}

export interface ILemmaProps {
  lemma: string
}

export interface ILemmaDAO extends ILemmaKey, ILemmaProps {}
export interface ILemmaGphDAO extends ILemmaKey {}

export interface ILemmaCommands extends IAbstractCommands<ILemmaProps, ILemmaDAO> {}

export interface ILemmaQueries extends IAbstractQueries<TFLemmaDAO> {
  findOneByLemma(lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO>
  findOneByLemma(lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<TFLemmaDAO>
}

export interface ILemmaCommandsGph 
  extends IAbstractCommandsGph<TLemmaGphDAORelationLabel, TLemmaGphDAONodeLabel> {}

export interface ILemmaQueriesGph extends IAbstractQueriesGph<ILemmaGphDAO> {}