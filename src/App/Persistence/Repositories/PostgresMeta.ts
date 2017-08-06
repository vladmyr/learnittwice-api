export const SCHEMA_NAME: 'public' = 'public';

export class TableName {
  public static readonly MIGRATIONS: string = '__Migrations';
  public static readonly LEMMA: string = 'Lemma';
  public static readonly LEXEME_FORM: string = 'LexemeForm';
  public static readonly LANGUAGE: string = 'Language';
  public static readonly SENSE: string = 'Sense';
  public static readonly SYNSET: string = 'Synset';
  public static readonly DEFINITION: string = 'Definition';

  public static ToArray(): string[] {
    return [
      TableName.MIGRATIONS,
      TableName.LEMMA,
      TableName.LEXEME_FORM,
      TableName.LANGUAGE,
      TableName.SENSE,
      TableName.SYNSET,
      TableName.DEFINITION
    ]
  }

  private constructor() {}
}