export interface Lesson {
  courseId: number;
  lessonId: number;
  titleVN: string;
  titleEN: string;
}
export interface LessonResponse {
  isFinish: boolean;
  lesson: Lesson;
}
