import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VocabularyDocument = HydratedDocument<Vocabulary>;

@Schema()
export class Vocabulary {
  @Prop()
  id: number;

  @Prop()
  content: string;

  @Prop()
  review_status: string;

  @Prop()
  phonetic: string;

  @Prop()
  position: string;

  @Prop()
  lesson_id: number;

  @Prop()
  course_id: number;

  @Prop()
  multi_answer: [];

  @Prop()
  trans: string;

  @Prop()
  trans_hint: string;

  @Prop()
  en_hint: string;

  @Prop()
  content_game_3: [string];

  @Prop()
  key_game_3: [string];

  @Prop()
  audio: string;

  @Prop()
  picture: string;

  @Prop()
  content_game_1: string;

  @Prop()
  answer_en_hint: string;

  @Prop()
  learn_again: number;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
