import { Lesson } from '../schemas/lesson.schema';

export interface LessonDTO {
  lesson: Lesson;
  isFinish: boolean;
}
