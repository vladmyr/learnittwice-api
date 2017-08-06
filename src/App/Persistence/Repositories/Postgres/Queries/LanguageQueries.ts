import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { TuLanguageDAO, ILanguageDAO, ILanguageQueries } 
  from 'src/App/Persistence/Repositories/Interfaces/ILanguageRepository';
import { Tx } 
  from 'src/App/Persistence/Repositories/Interfaces/IAbstractRepository';
import AbstractQueries from './AbstractQueries';

class LanguageQueries extends AbstractQueries<TuLanguageDAO> {
  protected static readonly TableName = TableName.LANGUAGE;
  protected static Instance: ILanguageQueries;

  public static readonly QUERY_FIND_ALL =
    `SELECT * FROM "${TableName.LANGUAGE}" LIMIT $(limit^) OFFSET $(offset)`


  public static GetInstance(db?: IDatabase<{}>): ILanguageQueries {
    return super.GetInstance(db, LanguageQueries);
  }

  public async findAll(
    limit: number = 0, 
    offset: number = 0, 
    t?: Tx
  ): Promise<ILanguageDAO[]> {
    const executionScope = this._getScopeOfExecution(t);
    const data: ILanguageDAO[] = await executionScope
      .manyOrNone(LanguageQueries.QUERY_FIND_ALL, {
        limit: limit || 'ALL',
        offset: offset
      });
    
      return data;
  }
}

export default LanguageQueries;