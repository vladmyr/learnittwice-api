import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ILemmaDAO, ILemmaQueries, TFLemmaDAO } from 
  'src/App/Persistence/Repositories/Interfaces/ILemmaRepository';
import { Tx } from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import AbstractQueries from './AbstractQueries';

class LemmaQueries extends AbstractQueries<TFLemmaDAO> {
  protected static readonly TableName = TableName.LEMMA;
  protected static Instance: ILemmaQueries;

  public static readonly QUERY_FIND_ONE_BY_LEMMA = 
    `SELECT * FROM "${LemmaQueries.TableName}" WHERE "lemma" = $(lemma)`;

  public static GetInstance(db?:IDatabase<{}>): ILemmaQueries {
    return super.GetInstance(db, LemmaQueries);
  }

  public async findOneByLemma(
    lemma: ILemmaDAO['lemma'],
    t?: Tx
  ): Promise<TFLemmaDAO> {
    const executionScope = this._getScopeOfExecution(t)
    const data: TFLemmaDAO = await executionScope
      .oneOrNone(LemmaQueries.QUERY_FIND_ONE_BY_LEMMA, { lemma })
    
    return data;
  }
}

export default LemmaQueries;