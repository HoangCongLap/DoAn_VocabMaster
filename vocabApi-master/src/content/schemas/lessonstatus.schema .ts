import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonStatusDocument = HydratedDocument<LessonStatus>;

export type STATUS = 'DONE' | 'NONE';
@Schema()
export class LessonStatus {
  @Prop()
  uid: string;

  @Prop()
  status: STATUS;

  @Prop()
  courseId: number;

  @Prop()
  lessonId: number;
}

export const LessonStatusSchema = SchemaFactory.createForClass(LessonStatus);
