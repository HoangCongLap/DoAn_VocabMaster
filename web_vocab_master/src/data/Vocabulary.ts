export interface Vocabulary {
  id: number;
  content: string;
  phonetic: string;
  position: string;
  lesson_id: number;
  course_id: number;
  trans: string;
  trans_hint: string;
  en_hint: string;
  audio: string;
  picture: string;
}
export interface VocabularyReponse {
  learnedVocabCount: number;
  total: number;
  vocabularies: Vocabulary[];
}
