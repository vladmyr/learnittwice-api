import { ITask } from 'pg-promise';

type TFLemmaDAO = ILemmaDAO | undefined;

interface ILemmaDAO {
  id: number;
  lemma: string;
}

interface ILemmaCommands {
  getDb();
  createOne(lemma: ILemmaDAO['lemma']): Promise<ILemmaDAO>;
  createOne(lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<ILemmaDAO>;
  updateOne(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO>;
  updateOne(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma'], t: ITask<{}>): Promise<TFLemmaDAO>;
  deleteOne(id: ILemmaDAO['id']): Promise<void>;
  deleteOne(id: ILemmaDAO['id'], t: ITask<{}>): Promise<void>;
}

interface ILemmaQueries {
  getDb();
  findOne(id: ILemmaDAO['id']): Promise<TFLemmaDAO>;
  findMany(ids: Array<ILemmaDAO['id']>): Promise<Array<TFLemmaDAO>>;
}

export { ILemmaDAO, ILemmaCommands, ILemmaQueries, TFLemmaDAO };