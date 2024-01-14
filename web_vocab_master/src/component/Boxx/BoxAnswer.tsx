import { Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReviewVocab } from "../../data/ReviewVocab";

const vocabularies: ReviewVocab[] = [
  {
    learningProgressDTO: {
      level: 2,
      lastModifiedTime: 1693741992,
      vocabId: 349,
    },
    vocabulary: {
      id: 349,
      content: "learn",
      phonetic: "/lɜːrn/",
      position: "v",
      lesson_id: 35,
      course_id: 1,
      trans: "Học hỏi, biết được, tìm hiểu",
      trans_hint: "Anh ấy nên học hỏi (và thay đổi) từ sai lầm lớn đó.",
      en_hint: "He should learn from his big mistake.",
      audio: "https://pi.nhalq.dev/kimochi/audio/349.mp3",
      picture: "https://pi.nhalq.dev/kimochi/image/349.png",
    },
  },
  {
    learningProgressDTO: {
      level: 1,
      lastModifiedTime: 1693842,
      vocabId: 324,
    },
    vocabulary: {
      id: 324,
      content: "board",
      phonetic: "/bɔːrd/",
      position: "n",
      lesson_id: 33,
      course_id: 1,
      trans: "Bảng, ván",
      trans_hint: "Giáo viên đang viết trên bảng.",
      en_hint: "The teacher is writing on the board.",
      audio: "https://pi.nhalq.dev/kimochi/audio/324.mp3",
      picture: "https://pi.nhalq.dev/kimochi/image/324.png",
    },
  },
];

const BoxAnswer = () => {
  return (
    <Wrap>
      <WrapItem>
        <Stack
          w="400px"
          h="300px"
          bg="#23AC38"
          borderRadius={20}
          marginLeft={0}
          marginRight={0}
        >
          {vocabularies.map((vocabularies) => (
            <Text key={vocabularies.learningProgressDTO.vocabId}>
              {vocabularies.learningProgressDTO.level}
            </Text>
          ))}
        </Stack>
      </WrapItem>
    </Wrap>
  );
};

export default BoxAnswer;
