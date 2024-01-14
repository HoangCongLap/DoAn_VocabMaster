import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { Vocabulary, VocabularyDocument } from './schemas/vocabulary.schema';
import { Vocab, VocabDocument } from './schemas/vocab.schema';
import { MAP_DATA, fill } from 'src/parseData';
import {
  LessonStatus,
  LessonStatusDocument,
} from './schemas/lessonstatus.schema ';
import { JSON_IGNORE_FIELD, constconverAudioLink } from 'src/app/utils/utils';
import { VocaGetterParam } from './entites/VocabularyDTO';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Vocabulary.name)
    private readonly vocabularyModel: Model<VocabularyDocument>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
    @InjectModel(Vocab.name)
    private readonly vocabModel: Model<VocabDocument>,
    @InjectModel(LessonStatus.name)
    private readonly lessonStatusModel: Model<LessonStatusDocument>,
  ) {}

  async findAllCourses(): Promise<Course[]> {
    return this.courseModel.find().select({ _id: 0, __v: 0, url: 0 }).exec();
  }
  async findAllVocabularies(
    courseId: number,
    lessonId: number,
  ): Promise<Vocabulary[]> {
    return new Promise<Vocabulary[]>((resolve, reject) => {
      this.vocabularyModel
        .find({ course_id: courseId, lesson_id: lessonId })
        .select(JSON_IGNORE_FIELD)
        .exec()
        .then((resp) => {
          const vocabs = resp.map((json) => {
            const { audio, picture } = constconverAudioLink(json.id);
            json.audio = audio;
            json.picture = picture;
            return json;
          });
          resolve(vocabs);
        })
        .catch((e) => reject(e));
    });
  }

  async findVocabularies(vocabIds: number[]): Promise<Vocabulary[]> {
    return new Promise<Vocabulary[]>((resolve, reject) => {
      this.vocabularyModel
        .find({ id: { $in: vocabIds } })
        .select(JSON_IGNORE_FIELD)
        .exec()
        .then((resp) => {
          const vocabs = resp.map((json) => {
            const { audio, picture } = constconverAudioLink(json.id);
            json.audio = audio;
            json.picture = picture;
            return json;
          });
          resolve(vocabs);
        })
        .catch((e) => reject(e));
    });
  }
  async findVocabulariesV2({
    fromId,
    limit,
  }: VocaGetterParam): Promise<Vocabulary[]> {
    const vocabs = [];
    for (let i = fromId; vocabs.length < limit; i = i + limit) {
      console.log(i + limit);
      const vocabsGet = await this.get(i, i + limit);
      vocabs.push(...vocabsGet);
    }
    return vocabs.slice(0, limit).sort((a, b) => a.id - b.id);
  }
  async get(fromId: number, toId: number) {
    return new Promise<Vocabulary[]>((resolve, reject) => {
      this.vocabularyModel
        .find({ id: { $gte: fromId, $lte: toId } })
        .select(JSON_IGNORE_FIELD)
        .exec()
        .then((resp) => {
          const vocabs = resp.map((json) => {
            const { audio, picture } = constconverAudioLink(json.id);
            json.audio = audio;
            json.picture = picture;
            return json;
          });
          resolve(vocabs);
        })
        .catch((e) => reject(e));
    });
  }
  async searchVocabularies(
    searchString: string,
    limit: number,
  ): Promise<Vocabulary[]> {
    const regex = new RegExp(searchString, 'i');
    return new Promise<Vocabulary[]>((resolve, reject) => {
      this.vocabularyModel
        .find({ content: { $regex: regex } })
        .limit(limit)
        .select(JSON_IGNORE_FIELD)
        .exec()
        .then((resp) => {
          const vocabs = resp.map((json) => {
            const { audio, picture } = constconverAudioLink(json.id);
            json.audio = audio;
            json.picture = picture;
            return json;
          });
          resolve(vocabs);
        })
        .catch((e) => reject(e));
    });
  }
  async findAllLessons(courseId: number): Promise<Lesson[]> {
    return this.lessonModel
      .find({ courseId: courseId })
      .select({
        _id: 0,
        __v: 0,
        url: 0,
        key_game_3: 0,
        content_game_1: 0,
        review_status: 0,
        multi_answer: 0,
        content_game_3: 0,
        learn_again: 0,
        answer_en_hint: 0,
      })
      .exec();
  }

  async indexVocab(vocabsax: string): Promise<Vocab> {
    Object.values(MAP_DATA).map(async (vocab) => {
      try {
        const vocabDB = await this.vocabModel.findOne({ word: vocab.word });
        if (vocabDB.id % 100 == 0) {
          console.log(vocabDB.id);
        }
        if (
          (vocabDB?.phonetic?.text && vocabDB.phonetic.text != '') ||
          (vocabDB?.phonetic?.audioURL && vocabDB.phonetic.audioURL != '') ||
          vocabDB.phonetic.audioURL === null
        ) {
          return;
        }
        const vocabRF: Vocab = await fill(vocab);
        if (
          vocabRF &&
          !vocabDB.phonetic?.audioURL &&
          vocabRF.phonetic?.audioURL
        ) {
          vocab.phonetic.audioURL = vocabRF.phonetic?.audioURL;
        }
        if (vocabRF && !vocabDB.phonetic?.text && vocabRF.phonetic?.text) {
          vocab.phonetic.text = vocabRF.phonetic?.text;
        }
        if (vocab.phonetic.text === '' && vocab.phonetic.text === '') {
          vocab.phonetic.audioURL = null;
        }
        this.vocabModel.findOneAndReplace({ word: vocab.word }, vocab);
      } catch (error) {
        if (error == 404) {
          vocab.phonetic.audioURL = null;
          this.vocabModel.findOneAndReplace({ word: vocab.word }, vocab);
        }

        console.log('ex:' + error);
      }
      console.log('=============> Progress :' + vocab.id);
    });
    return null;
  }
  async markLearnFinishLesson(
    uid: string,
    courseId: number,
    lessonId: number,
  ): Promise<LessonStatus> {
    return new this.lessonStatusModel({
      lessonId,
      courseId,
      uid,
      status: 'DONE',
    }).save();
  }
  async getMarkLearnFinishLesson(
    uid: string,
    lessonId: number,
    courseId: number,
  ): Promise<LessonStatus> {
    return await this.lessonStatusModel
      .findOne({
        uid,
        lessonId,
        courseId,
      })
      .select({ _id: 0, __v: 0, uid: 0 });
  }
}
