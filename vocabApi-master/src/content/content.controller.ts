import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { Course } from './schemas/course.schema';
import { Vocabulary } from './schemas/vocabulary.schema';
import { Vocab } from './schemas/vocab.schema';
import { LearningProgressService } from 'src/learnprogress/learningprogress.service';
import { RequestModel } from 'src/app/middleware/auth.middleware';
import { LessonStatus } from './schemas/lessonstatus.schema ';
import { LessonDTO } from './entites/LessonDTO';
import { LearnedVocabularyDTO, VocaGetterParam } from './entites/VocabularyDTO';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { ConfigService } from 'src/config/config.service';

@Controller()
export class ContentController {
  private fallbackResourceFolder: string | undefined;

  constructor(
    private readonly learningprogressService: LearningProgressService,
    private readonly contentService: ContentService,
    private readonly configService: ConfigService,
  ) {
    this.fallbackResourceFolder =
      this.configService.get().fallbackResourceFolder;
  }
  @Get('/hello')
  async getHello(): Promise<Course[]> {
    return this.contentService.findAllCourses();
  }
  @Get('/courses')
  async getCourses(): Promise<Course[]> {
    console.log('test');
    return this.contentService.findAllCourses();
  }
  @Get('/lesson/:courseId/:lessonId')
  async getVocabularies(
    @Req() { user }: RequestModel,
    @Param('courseId') courseId: number,
    @Param('lessonId') lessonId: number,
  ): Promise<LearnedVocabularyDTO> {
    const allVocabsOfLesson = await this.contentService.findAllVocabularies(
      courseId,
      lessonId,
    );
    const learningProgressesAll = await Promise.all(
      allVocabsOfLesson.map((vocab) =>
        this.learningprogressService.findLearningProgress(user.uid, vocab.id),
      ),
    );
    const learningProgresses = learningProgressesAll.filter((t) => t != null);
    const vocabularies = allVocabsOfLesson.filter(
      (vocab) =>
        learningProgresses.find((t) => t.vocabId == vocab.id) == undefined,
    );
    return {
      vocabularies,
      total: allVocabsOfLesson.length,
      learnedVocabCount: learningProgresses.length,
    };
  }

  @Post('/lesson/:courseId/:lessonId/finish')
  async markLearnFinishLesson(
    @Req() { user }: RequestModel,
    @Param('courseId') courseId: number,
    @Param('lessonId') lessonId: number,
  ): Promise<LessonStatus> {
    return this.contentService.markLearnFinishLesson(
      user.uid,
      courseId,
      lessonId,
    );
  }

  @Get('/lessons/:courseId')
  async getLessons(
    @Req() { user }: RequestModel,
    @Param('courseId') courseId: number,
  ): Promise<LessonDTO[]> {
    const lessones = await this.contentService.findAllLessons(courseId);
    const markLearnFinishLessonesPromises = await Promise.all(
      lessones.map((course) => {
        return this.contentService.getMarkLearnFinishLesson(
          user.uid,
          course.lessonId,
          courseId,
        );
      }),
    );
    const markLearnFinishLessones = markLearnFinishLessonesPromises.filter(
      (t) => t != null,
    );
    return lessones.map((lesson) => {
      const findedCourse = markLearnFinishLessones.find(
        (t) => t.lessonId == lesson.lessonId,
      );
      return {
        lesson,
        isFinish: findedCourse != null,
      };
    });
  }
  @Get('/vocab/save/:vocab')
  async indexVocab(@Param('vocab') vocab: string): Promise<Vocab> {
    return this.contentService.indexVocab(vocab);
  }
  @Get('/vocabs')
  async getVocabs(@Query('vocabs') vocabs: number[]): Promise<Vocabulary[]> {
    return this.contentService.findVocabularies(vocabs);
  }
  @Get('/vocabs/from')
  async getVocabsV2(
    @Query('fromId') fromId: number,
    @Query('limit') limit: number,
  ): Promise<Vocabulary[]> {
    return this.contentService.findVocabulariesV2({
      fromId,
      limit,
    });
  }
  @Get('/vocabs/search')
  async searchVocabs(
    @Query('searchstr') searchstr: string,
    @Query('limit') limit = 10,
  ): Promise<Vocabulary[]> {
    return this.contentService.searchVocabularies(searchstr, limit);
  }
  async getConfigValue() {
    // Access a property or method of configService
    const fallbackResourceFolder =
      this.configService.get().fallbackResourceFolder;

    // Use the value in your code
    console.log('Fallback Resource Folder:', fallbackResourceFolder);
  }
  // @Post('uploadvocabphoto')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: '/web-server/Kimochi/KimochiResources/resources/imageFB',
  //       filename: (req, file, callback) => {
  //         callback(null, `${req.body['vocabId']}.png`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1_000_000 }),
  //         new FileTypeValidator({
  //           fileType: '.(png|jpeg|jpg)',
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   console.log(file);
  //   return {};
  // }
}
