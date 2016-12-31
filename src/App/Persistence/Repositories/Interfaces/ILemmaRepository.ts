import { ParameterizedQuery } from 'pg-promise';

type TFLemmaDAO = ILemmaDAO | undefined;

interface ILemmaDAO {
  id: number;
  lemma: string;
}

interface ILemmaCommands {
  create(lemma: ILemmaDAO['lemma']): Promise<ILemmaDAO>;
  createQuery(lemma: ILemmaDAO['lemma']): ParameterizedQuery
  update(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO>;
  updateQuery(
    id: ILemmaDAO['id'], 
    lemma: ILemmaDAO['lemma']
  ): ParameterizedQuery;
  delete(id: ILemmaDAO['id']): Promise<void>;
  deleteQuery(id: ILemmaDAO['id']): ParameterizedQuery;
}

interface ILemmaQueries {
  findOne(id: ILemmaDAO['id']): Promise<TFLemmaDAO>;
  findOneQuery(id: ILemmaDAO['id']): ParameterizedQuery;
  findMany(ids: Array<ILemmaDAO['id']>): Promise<Array<TFLemmaDAO>>;
  findManyQuery(ids: Array<ILemmaDAO['id']>): ParameterizedQuery;
}

export { ILemmaDAO, ILemmaCommands, ILemmaQueries, TFLemmaDAO };