export const REMEMBER_LEVEL = 8;
export const VOCAB_REMEMBER_LEVELS = [1, 2, 3, 4, 5, 6, 7, REMEMBER_LEVEL];
export const VOCAB_REMEMBER_LEVELS_TIME_RELEARN_HOURS = [
  0,
  6,
  12,
  24,
  48,
  96,
  168,
  Number.MAX_SAFE_INTEGER,
];

export class OverviewVocab {
  level: number;
  count: number;
}
export class OverviewVocabsAndLeanringProcess {
  overviewVocabs: OverviewVocab[];
  practiceVocabCount: number;
}
