export interface ILabel {
  LEMMA: 'Lemma';
  LEXEME_FORM: 'LexemeForm';
  LANGUAGE: 'Language';
  DEFINITION: 'Definition';
  SENSE: 'Sense';
  SYNSET: 'Synset';
  EXAMPLE: 'Example';
}

export class Label {
  public static readonly LEMMA: ILabel['LEMMA'] = 'Lemma';
  public static readonly LEXEME_FORM: ILabel['LEXEME_FORM'] = 'LexemeForm';
  public static readonly LANGUAGE: ILabel['LANGUAGE'] = 'Language';
  public static readonly DEFINITION: ILabel['DEFINITION'] = 'Definition';
  public static readonly SENSE: ILabel['SENSE'] = 'Sense';
  public static readonly SYNSET: ILabel['SYNSET'] = 'Synset';
  public static readonly EXAMPLE: ILabel['EXAMPLE'] = 'Example';

  private constructor() {}
}