import { Vocabulary } from 'src/content/schemas/vocabulary.schema';

export class LearningProgressDTO {
  level: number;
  lastModifiedTime: number;
  vocabId: number;
}
export class LearningProgressDTOParam {
  level: number;
  vocabId: number;
}
export class LearningProgressResponse {
  learningProgressDTO: LearningProgressDTO;
  vocabulary: Vocabulary;
}
