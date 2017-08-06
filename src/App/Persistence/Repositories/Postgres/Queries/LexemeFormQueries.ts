import { IDatabase } from 'pg-promise';
import { TableName } from 'src/App/Persistence/Repositories/PostgresMeta';
import { ILexemeFormQueries, TuLexemeFormDAO } from
  'src/App/Persistence/Repositories/Interfaces/ILexemeFormRepository.ts';
import AbstractQueries from "src/App/Persistence/Repositories/Postgres/Queries/AbstractQueries";

export default class LexemeFormQueries extends AbstractQueries<TuLexemeFormDAO> {
  protected static readonly TableName = TableName.LEXEME_FORM;
  protected static Instance: ILexemeFormQueries;

  public static GetInstance(db?: IDatabase<{}>): ILexemeFormQueries {
    return super.GetInstance(db, LexemeFormQueries);
  }
}