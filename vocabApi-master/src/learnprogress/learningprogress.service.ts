import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearningProgressDTO } from './entites/LearnProcessParam';
import {
  LearningProgress,
  LearningProgressDocument,
} from './schemas/learningprogress.schema';
import {
  OverviewVocab,
  VOCAB_REMEMBER_LEVELS,
  VOCAB_REMEMBER_LEVELS_TIME_RELEARN_HOURS,
} from './entites/OverviewVocab';

@Injectable()
export class LearningProgressService {
  constructor(
    @InjectModel(LearningProgress.name)
    private readonly learningProgressModel: Model<LearningProgressDocument>,
  ) {}

  async findLearningProgressesWithLevel(
    uid: string,
    level: number,
  ): Promise<LearningProgress[]> {
    return this.learningProgressModel
      .find({ uid, level })
      .select({ _id: 0, __v: 0, uid: 0 })
      .exec();
  }
  async findLearningProgresses(
    uid: string,
    filteredlastModifiedTime: number,
  ): Promise<LearningProgress[]> {
    return new Promise<LearningProgress[]>((resolve) => {
      this.learningProgressModel
        .find({ uid })
        .select({ _id: 0, __v: 0, uid: 0 })
        .exec()
        .then((learningProgress: LearningProgress[]) => {
          const results: LearningProgress[] = [];
          for (const learningProgres of learningProgress) {
            const relearnTimeHours =
              VOCAB_REMEMBER_LEVELS_TIME_RELEARN_HOURS[
                learningProgres.level - 1
              ];
            if (
              learningProgres.lastModifiedTime + relearnTimeHours * 60 * 60 <=
              filteredlastModifiedTime
            ) {
              results.push(learningProgres);
            }
          }
          resolve(results);
        })
        .catch((e) => console.log(e));
    });
  }
  // * 60 * 60
  async findLearningProgress(
    uid: string,
    vocabId: number,
  ): Promise<LearningProgress> {
    return (
      this.learningProgressModel
        .findOne({ uid, vocabId })
        // .select({ _id: 0, __v: 0, url: 0 })
        .exec()
    );
  }

  async saveLearningProgress(
    learningprogresses: LearningProgress[],
  ): Promise<LearningProgress[]> {
    return this.learningProgressModel.insertMany(learningprogresses);
  }
  async updateLearningProgress(
    learningprogress: LearningProgress,
  ): Promise<LearningProgress> {
    const learning = await this.learningProgressModel.findOne({
      uid: learningprogress.uid,
      vocabId: learningprogress.vocabId,
    });
    if (learning) {
      learning.level = learningprogress.level;
      learning.lastModifiedTime = learningprogress.lastModifiedTime;
      await this.learningProgressModel.updateOne(
        { _id: learning.id },
        learningprogress,
      );
    } else {
      await this.createLearningProgress(learningprogress.uid, learningprogress);
    }
    return learningprogress;
  }
  async createLearningProgress(
    uid: string,
    learningprogressDTO: LearningProgressDTO,
  ): Promise<LearningProgress> {
    return new this.learningProgressModel({
      ...learningprogressDTO,
      uid,
    }).save();
  }
  async findOverviewVocab(uid: string): Promise<OverviewVocab[]> {
    const listPromise = [];
    for (const level of VOCAB_REMEMBER_LEVELS) {
      listPromise.push(
        this.learningProgressModel
          .find({ uid, level })
          .count()
          .exec()
          .then((count) => {
            console.log('findOverviewVocab', level, count);
            return { level, count };
          })
          .catch((e) => console.log(e)),
      );
    }
    return Promise.all(listPromise);
  }
}
