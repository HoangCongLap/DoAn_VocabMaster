import { extname } from 'path';

export const constconverAudioLink = (vocabId: string) => {
  return {
    audio: 'https://pi.nhalq.dev/kimochi/audio/' + vocabId + '.mp3',
    picture: 'https://pi.nhalq.dev/kimochi/image/' + vocabId + '.png',
  };
};
export const JSON_IGNORE_FIELD = {
  _id: 0,
  __v: 0,
  url: 0,
  // key_game_3: 0,
  // content_game_1: 0,
  // review_status: 0,
  // multi_answer: 0,
  // content_game_3: 0,
  // learn_again: 0,
  // answer_en_hint: 0,
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }

  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
