import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop()
  url: string;

  @Prop()
  courseId: number;

  @Prop()
  desc: string;

  @Prop()
  title: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
