import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { RequestModel } from 'src/app/middleware/auth.middleware';
import {
  LearningProgressDTO,
  LearningProgressDTOParam,
  LearningProgressResponse,
} from './entites/LearnProcessParam';
import { LearningProgressService } from './learningprogress.service';
import { LearningProgress } from './schemas/learningprogress.schema';
import {
  OverviewVocab,
  OverviewVocabsAndLeanringProcess,
} from './entites/OverviewVocab';
import { ContentService } from 'src/content/content.service';
import { Vocabulary } from 'src/content/schemas/vocabulary.schema';

@Controller()
export class LearningProgressController {
  constructor(
    private readonly learningprogressService: LearningProgressService,
    private readonly contentService: ContentService,
  ) {}

  @Post('/test')
  async getHello(): Promise<string> {
    return 'ok';
  }
  @Put('/learningprogress')
  async updateLearProgress(
    @Req() { user }: RequestModel,
    @Body() learningProgresses: LearningProgressDTO[],
  ): Promise<LearningProgressDTO[]> {
    return new Promise<LearningProgressDTO[]>((resolve) => {
      resolve(
        Promise.all(
          learningProgresses.map(async (learProgress) => {
            const reformatFiterTime = Math.round(
              learProgress.lastModifiedTime
                ? learProgress.lastModifiedTime / 1000
                : new Date().getTime() / 1000,
            );
            const learningprogress: LearningProgress = {
              ...learProgress,
              lastModifiedTime: reformatFiterTime,
              uid: user.uid,
            };
            console.log('update:', learningprogress);
            const result =
              await this.learningprogressService.updateLearningProgress(
                learningprogress,
              );
            return result;
          }),
        ),
      );
    });
  }

  // @Post('/learningprogress')
  // async createLearProgress(
  //   @Req() { user }: RequestModel,
  //   @Body() learningProgresses: LearningProgressDTOParam[],
  // ): Promise<LearningProgressDTOParam[]> {
  //   return new Promise<LearningProgressDTOParam[]>((resolve) => {
  //     resolve(
  //       Promise.all(
  //         learningProgresses.map(async (learnProcess) => {
  //           const checkExist =
  //             await this.learningprogressService.findLearningProgress(
  //               user.uid,
  //               learnProcess.vocabId,
  //             );
  //           if (checkExist) {
  //             return {
  //               level: checkExist.level,
  //               vocabId: checkExist.vocabId,
  //               lastModifiedTime: checkExist.lastModifiedTime,
  //               exist: true,
  //             };
  //           }
  //           const result =
  //             await this.learningprogressService.createLearningProgress(
  //               user.uid,
  //               {
  //                 ...learnProcess,
  //                 lastModifiedTime: new Date().getTime() / 1000,
  //               },
  //             );

  //           return {
  //             level: result.level,
  //             vocabId: result.vocabId,
  //             lastModifiedTime: result.lastModifiedTime,
  //           };
  //         }),
  //       ),
  //     );
  //   });
  // }
  @Get('/listreviewvocab')
  async getListReviewVocab(
    @Req() { user }: RequestModel,
    @Query('filterTime') filterTime: number,
  ): Promise<LearningProgressResponse[]> {
    const reformatFiterTime = filterTime
      ? filterTime
      : new Date().getTime() / 1000;

    const learningProgresses: LearningProgress[] =
      await this.learningprogressService.findLearningProgresses(
        user.uid,
        reformatFiterTime,
      );
    const vocabs = await this.contentService.findVocabularies(
      learningProgresses.map((t) => t.vocabId),
    );
    const learningProgressResponses: LearningProgressResponse[] = [];
    for (const learningProgress of learningProgresses) {
      learningProgressResponses.push({
        learningProgressDTO: learningProgress,
        vocabulary: vocabs.find((t) => t.id === learningProgress.vocabId),
      });
    }
    return learningProgressResponses;
  }

  @Get('/overviewvocab')
  async getOverViewVocab(
    @Req() { user }: RequestModel,
  ): Promise<OverviewVocab[]> {
    return this.learningprogressService.findOverviewVocab(user.uid);
  }

  @Get('/listreviewvocablevel/:level')
  async getListReviewVocabWithLevel(
    @Req() { user }: RequestModel,
    @Param('level') level: number,
  ): Promise<Vocabulary[]> {
    const learProgress =
      await this.learningprogressService.findLearningProgressesWithLevel(
        user.uid,
        level,
      );
    return this.contentService.findVocabularies(
      learProgress.map((t) => t.vocabId),
    );
  }
  @Get('/overviewvocabandprogress')
  async getOverViewVocabAndProgress(
    @Req() { user }: RequestModel,
    @Query('filterTime') filterTime: number,
  ): Promise<OverviewVocabsAndLeanringProcess> {
    try {
      const reformatFiterTime = Math.round(
        filterTime ? filterTime : new Date().getTime() / 1000,
      );

      const [learningProgresses, overviewVocabs] = await Promise.all([
        this.learningprogressService.findLearningProgresses(
          user.uid,
          reformatFiterTime,
        ),
        this.learningprogressService.findOverviewVocab(user.uid),
      ]);
      return Promise.resolve({
        overviewVocabs,
        practiceVocabCount: learningProgresses.length,
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
