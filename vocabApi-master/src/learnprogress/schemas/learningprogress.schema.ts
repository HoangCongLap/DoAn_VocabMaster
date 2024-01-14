import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LearningProgressDocument = HydratedDocument<LearningProgress>;

@Schema()
export class LearningProgress {
  @Prop()
  uid: string;

  @Prop()
  level: number;

  @Prop()
  lastModifiedTime: number;

  @Prop()
  vocabId: number;
}

export const LearningProgressSchema =
  SchemaFactory.createForClass(LearningProgress);
