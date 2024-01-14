import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Course, CourseSchema } from './schemas/course.schema';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { Vocabulary, VocabularySchema } from './schemas/vocabulary.schema';
import { DatabaseModule } from 'src/database/database.module';
import { Vocab, VocabSchema } from './schemas/vocab.schema';
import { LearningProgressService } from 'src/learnprogress/learningprogress.service';
import {
  LearningProgress,
  LearningProgressSchema,
} from 'src/learnprogress/schemas/learningprogress.schema';
import {
  LessonStatus,
  LessonStatusSchema,
} from './schemas/lessonstatus.schema ';
import { ConfigModule } from 'src/config/config.module';
@Module({
  controllers: [ContentController],
  providers: [LearningProgressService, ContentService],
  imports: [
    DatabaseModule.forRoot(),
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Vocabulary.name, schema: VocabularySchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Vocab.name, schema: VocabSchema },
      { name: LearningProgress.name, schema: LearningProgressSchema },
      { name: LessonStatus.name, schema: LessonStatusSchema },
    ]),
    ConfigModule,
  ],
})
export class ContentModule {}
