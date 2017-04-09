export interface ILabel {
  LEMMA: 'Lemma';
  LANGUAGE: 'Language';
  DEFINITION: 'Definition';
  SENSE: 'Sense';
  SYNSET: 'Synset';
  EXAMPLE: 'Example';
}

export class Label {
  public static readonly LEMMA: string = 'Lemma';
  public static readonly LANGUAGE: string = 'Language';
  public static readonly DEFINITION: string = 'Definition';
  public static readonly SENSE: string = 'Sense';
  public static readonly SYNSET: string = 'Synset';
  public static readonly EXAMPLE: string = 'Example';

  private constructor() {}
}

export class Relation {
  public static readonly SENSE: string = Label.SENSE;
  public static readonly SYNSET: string = Label.SYNSET;
  public static readonly LANGUAGE: string = Label.LANGUAGE;
  public static readonly DEFINITION: string = Label.DEFINITION;
  public static readonly EXAMPLE: string = Label.EXAMPLE;

  private constructor() {}
}