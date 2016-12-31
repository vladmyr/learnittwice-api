import { IDatabase, ParameterizedQuery } from 'pg-promise';
import { TFLemmaDAO, ILemmaDAO, ILemmaCommands } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';

class LemmaCommands {
  private static _instance:ILemmaCommands;
  private _db:IDatabase<{}>;

  private constructor(db:IDatabase<{}>) {
    this._db = db;
  }

  public static GetInstance(db?:IDatabase<{}>):ILemmaCommands {
    if (!LemmaCommands._instance) {
      if (typeof db == 'undefined') {
        throw new TypeError('[LemmaCommands.GetInstance] argument `db` can\'t be undefined during instantiation')
      }

      LemmaCommands._instance = new LemmaCommands(db);
    }

    return LemmaCommands._instance;
  }

  public create(lemma: ILemmaDAO['lemma']): Promise<ILemmaDAO> {
    return this._db
      .one(this.createQuery(lemma))
      .then((data:ILemmaDAO) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  public createQuery(lemma: ILemmaDAO['lemma']): ParameterizedQuery {
    return new ParameterizedQuery(
      'INSERT INTO "Lemma"("lemma") VALUES($1) RETURNING *', 
      [lemma]
    );
  }

  public update(id: ILemmaDAO['id'], lemma: ILemmaDAO['lemma']): Promise<TFLemmaDAO> {
    return this._db
      .one(this.updateQuery(id, lemma))
      .then((data:TFLemmaDAO) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  public updateQuery(
    id: ILemmaDAO['id'], 
    lemma: ILemmaDAO['lemma']
  ): ParameterizedQuery {
    return new ParameterizedQuery(
      'Update "Lemma" SET lemma = $1 WHERE id = $2 RETURNING *',
      [lemma, id]
    );
  }

  delete(id: ILemmaDAO['id']): Promise<void> {
    return this._db
      .none(this.deleteQuery(id))
      .catch((err) => {
        console.error(err);
      })
  }

  public deleteQuery(id: ILemmaDAO['id']): ParameterizedQuery {
    return new ParameterizedQuery(
      'DELETE FROM "Lemma" WHERE id = $1',
      [id]
    );
  }
}

export default LemmaCommands;