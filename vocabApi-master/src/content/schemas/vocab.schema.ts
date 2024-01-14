import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VocabDocument = HydratedDocument<Vocab>;
export class Phonetic {
  audioURL: string;
  text: string;
}
// export type PART_OF_SPEED = "verb" | "interjection" | "noun";
export enum PART_OF_SPEED {
  verb = 'verb',
  adjective = 'adjective',
  noun = 'noun',
  adverb = 'adverb',
  preposition = 'preposition',
  conjunction = 'conjunction',
  pronoun = 'pronoun',
  interjection = 'interjection',
}
export class Definition {
  definition: string;
  example: string;
  meaningOfExample: string;
}
export class Meaning {
  partOfSpeech: PART_OF_SPEED;
  definitions: Definition[];
}
@Schema()
export class Vocab {
  @Prop()
  id: number;

  @Prop()
  word: string;

  @Prop()
  phonetic: Phonetic;

  @Prop()
  meanings: Meaning[];
}

export const VocabSchema = SchemaFactory.createForClass(Vocab);
