export const SCHEMA_NAME: 'public' = 'public';

export class TableName {
  public static readonly MIGRATIONS: string = '__Migrations';
  public static readonly LEMMA: string = 'Lemma';
  public static readonly LANGUAGE: string = 'Language';
  public static readonly SENSE: string = 'Sense';
  public static readonly SYNSET: string = 'Synset';
  public static readonly DEFINITION: string = 'Definition';

  public static ToArray(): string[] {
    return [
      TableName.MIGRATIONS,
      TableName.LEMMA,
      TableName.LANGUAGE,
      TableName.SENSE,
      TableName.DEFINITION
    ]
  }

  private constructor() {}
}