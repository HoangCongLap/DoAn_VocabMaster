import { Vocabulary } from '../schemas/vocabulary.schema';

export interface LearnedVocabularyDTO {
  vocabularies: Vocabulary[];
  total: number;
  learnedVocabCount: number;
}
export interface VocaGetterParam {
  fromId: number;
  limit: number;
}
