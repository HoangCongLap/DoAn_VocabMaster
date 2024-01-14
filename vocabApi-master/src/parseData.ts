import { readFileSync } from 'fs';
import {
  Definition,
  Meaning,
  PART_OF_SPEED,
  Vocab,
  VocabSchema,
} from './content/schemas/vocab.schema';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

// export const DATA_FILE = readFileSync('./anhvietdatasmall.txt', 'utf8');
export const DATA_FILE = readFileSync('./anhvietdata.txt', 'utf8');
export const MAP_DATA: Record<string, Vocab> = {};
export const parseData = () => {
  try {
    const processedData = DATA_FILE.split('@');
    const gft = processedData.filter((t) => t !== '');
    console.log(processedData.length, gft.length);

    gft.map((row, index) => {
      // console.log('index', index);
      try {
        const group = row.split('\n').filter((t) => t !== '');
        if (group.length == 0) {
          return;
        }
        const row1 = group[0].split(' ');
        const word = row1[0].trim();

        const meanings: Meaning[] = [];

        for (let i = 1; i < group.length; ) {
          const rowData = group[i];
          if (rowData.charAt(0) == '*') {
            const definitions: Definition[] = [];
            let partOfSpeech: PART_OF_SPEED = PART_OF_SPEED.adjective;
            if (rowData.indexOf('tính từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.adjective;
            } else if (rowData.indexOf('danh từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.noun;
            } else if (rowData.indexOf('động từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.verb;
            } else if (rowData.indexOf('phó từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.adverb;
            } else if (rowData.indexOf('giới từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.preposition;
            } else if (rowData.indexOf('liên từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.conjunction;
            } else if (rowData.indexOf('đại từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.pronoun;
            } else if (rowData.indexOf('thán từ') !== -1) {
              partOfSpeech = PART_OF_SPEED.interjection;
            } else {
              // console.log('error', word, rowData);
            }
            // i++;
            for (
              i = i + 1;
              i < group.length && group[i].charAt(0) != '*';
              i++
            ) {
              if (definitions.length > 3) {
                continue;
              }
              if (group[i].charAt(0) == '-') {
                definitions.push({
                  definition: group[i].substring(2),
                  example: '',
                  meaningOfExample: '',
                });
              } else if (group[i].charAt(0) == '=') {
                if (definitions[definitions.length - 1].example.length === 0) {
                  const exampleAndMeaningOfExample = group[i]
                    .substring(1)
                    .split('+');
                  definitions[definitions.length - 1] = {
                    ...definitions[definitions.length - 1],
                    example: exampleAndMeaningOfExample[0].trim(),
                    meaningOfExample: exampleAndMeaningOfExample[1]
                      ? exampleAndMeaningOfExample[1].trim()
                      : '',
                  };
                }
              }
            }
            meanings.push({ definitions, partOfSpeech });
          } else {
            i++;
          }
        }

        const vocab: Vocab = {
          id: index,
          meanings,
          phonetic: {
            text: '',
            audioURL: '',
          },
          word,
        };
        MAP_DATA[vocab.word] = vocab;
      } catch (e) {
        console.log(e, row);
      }
    });
    // for (const vocab of Object.values(MAP_DATA)) {
    //   fill(vocab)
    //     .then((resp) => {
    //       console.log('resp', resp);
    //     })
    //     .catch((e) => console.log('err', e));
    // }
  } catch (error) {
    console.log('err', error);
  }

  console.log('====');
};
export const fill = (vocab: Vocab) => {
  return new Promise<any>((res, rej) => {
    // Define the headers including 'X-Forwarded-For'
    const headers = {
      'X-Forwarded-For': '127.0.0.' + (Math.floor(Math.random() * 100) % 256), // Set the X-Forwarded-For header
      // Add other headers as needed
    };

    // Create an options object with method and headers
    const options = {
      method: 'GET', // HTTP request method (GET, POST, etc.)
      headers: headers,
    };
    fetch(
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + vocab.word,
      options,
    )
      .then((resp) => {
        console.log(vocab.word + '.resp', resp.status);
        if (resp.status != 200) {
          rej(resp.status);
          return;
        }
        resp
          .json()
          .then((rep) => {
            try {
              const re = rep[0];

              if (re?.phonetics) {
                console.log(vocab.word + '.re?.phonetics', re?.phonetics);

                const arr = re.phonetics;
                let text = re.phonetic;
                let audioURL = '';
                if (arr.length > 0) {
                  if (arr[0].audio !== '') {
                    text = re.phonetics[0].text;
                    audioURL = re.phonetics[0].audio;
                  } else {
                    if (arr.length > 1) {
                      text = re.phonetics[1].text;
                      audioURL = re.phonetics[1].audio;
                    }
                  }
                }
                vocab.phonetic.text = text ? text : '';
                vocab.phonetic.audioURL = audioURL;
                res(vocab);
                return;
              }
            } catch (e) {
              rej(e);
              return;
            }

            rej(null);
          })
          .catch((e) => {
            rej(e);
          });
      })
      .catch((e) => console.log(e));
  });
};
