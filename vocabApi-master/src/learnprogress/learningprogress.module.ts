import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { LearningProgressController } from './learningprogress.controller';
import { LearningProgressService } from './learningprogress.service';
import {
  LearningProgress,
  LearningProgressSchema,
} from './schemas/learningprogress.schema';
import { ContentService } from 'src/content/content.service';
import { Course, CourseSchema } from 'src/content/schemas/course.schema';
import {
  Vocabulary,
  VocabularySchema,
} from 'src/content/schemas/vocabulary.schema';
import { Vocab, VocabSchema } from 'src/content/schemas/vocab.schema';
import { Lesson, LessonSchema } from 'src/content/schemas/lesson.schema';
import {
  LessonStatus,
  LessonStatusSchema,
} from 'src/content/schemas/lessonstatus.schema ';

@Module({
  controllers: [LearningProgressController],
  providers: [LearningProgressService, ContentService],
  imports: [
    DatabaseModule.forRoot(),
    MongooseModule.forFeature([
      { name: LearningProgress.name, schema: LearningProgressSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Vocabulary.name, schema: VocabularySchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Vocab.name, schema: VocabSchema },
      { name: LessonStatus.name, schema: LessonStatusSchema },
    ]),
  ],
})
export class LearningProgressModule {}
