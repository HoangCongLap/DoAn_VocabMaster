import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  @Prop()
  url: string;

  @Prop()
  courseId: number;

  @Prop()
  lessonId: number;

  @Prop()
  titleVN: string;

  @Prop()
  titleEN: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
