export const SCHEMA_NAME: 'public' = 'public';

export class TableName {
  public static readonly MIGRATIONS: string = '__Migrations';
  public static readonly LEMMA: string = 'Lemma';
  public static readonly LEXEME_FORM: string = 'LexemeForm';
  public static readonly LANGUAGE: string = 'Language';
  public static readonly SENSE: string = 'Sense';
  public static readonly SYNSET: string = 'Synset';
  public static readonly DEFINITION: string = 'Definition';
  public static readonly COURSE: string = 'Course';
  public static readonly LESSON: string = 'Lesson';
  public static readonly KNOWLEDGE_UNIT: string = 'KnowledgeUnit';
  public static readonly CHALLENGE: string = 'Challenge';
  public static readonly CUSTOM_PROPERTY: string = 'CustomProperty';
  public static readonly SENSE_PROPERTY: string = 'SenseProperty';
  public static readonly PROPERTY_RELATION: string = 'PropertyRelation';

  public static ToArray(): string[] {
    return [
      TableName.MIGRATIONS,
      TableName.LEMMA,
      TableName.LEXEME_FORM,
      TableName.LANGUAGE,
      TableName.SENSE,
      TableName.SYNSET,
      TableName.DEFINITION,
      TableName.COURSE,
      TableName.LESSON,
      TableName.KNOWLEDGE_UNIT,
      TableName.CHALLENGE,
      TableName.CUSTOM_PROPERTY,
      TableName.SENSE_PROPERTY,
      TableName.PROPERTY_RELATION
    ]
  }

  private constructor() {}
}