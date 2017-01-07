export const SCHEMA_NAME: 'public' = 'public';

export class TableName {
  public static MIGRATIONS:string = '__Migrations';
  public static LEMMA:string = 'Lemma';

  public static ToArray():string[] {
    return [
      TableName.MIGRATIONS,
      TableName.LEMMA
    ]
  }

  private constructor() {}
}