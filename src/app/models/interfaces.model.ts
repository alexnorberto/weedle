export interface Pokemon {
  id: number;
  gen: number;
  name: any;
  type1: string;
  type2: string;
  stage: number;
  evolvesBy: any;
}

export interface Guess {
  idRelativeToAnswer: '<' | '=' | '>';
  genRelativeToAnswer: '<' | '=' | '>';
  stageIsEqual: boolean;
  type1IsEqual: 'true' | 'changed' | 'false';
  type2IsEqual: 'true' | 'changed' | 'false';
  pokemon: Pokemon;
}
