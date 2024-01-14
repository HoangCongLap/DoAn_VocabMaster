// bắt đầu vào học từ vựng
import React, { useEffect, useState } from "react";
import FlipItemShadow from "../component/FlipItem/FlipItemShadow";
import { CloseButton, Container, Flex, HStack, VStack } from "@chakra-ui/react";
import UseSound from "../component/Sound/UseSound";
import { Vocabulary, VocabularyReponse } from "../data/Vocabulary";
import { toast } from "react-toastify";
import Slow from "../component/Sound/Slow";
import ProgressBar from "../component/Progress/ProgressBar";
import Writewords from "../component/FormLabelWritewords/Writewords";
import axios from "axios";
import { getAuthV2 } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router";
import { LevelVocab } from "../data/LevelVocab";
import { LearningProgess } from "../data/LearningProgress";
import { IsFinishLesson } from "../data/IsFinishLesson";
import StyledButton from "../component/StyledButton";
// const vocabularies: Vocabulary[] = [
//   {
//     id: 344,
//     content: "student",
//     phonetic: "/ˈstuːdnt/",
//     position: "n",
//     lesson_id: 1,
//     course_id: 1,
//     trans: "Học sinh, sinh viên",
//     trans_hint: "Em gái của anh ấy là một sinh viên ở trường đại học đó.",
//     en_hint: "His younger sister is a student at that university.",
//     audio: "http://daviser.ml/audio/344.mp3",
//     picture:
//       "https://wpvip.edutopia.org/wp-content/uploads/2022/10/shutterstock_1958383675-crop.jpg?w=200&quality=85",
//   },
//   {
//     id: 348,
//     content: "hai",
//     phonetic: "/ɪɡˌzæmɪˈneɪʃn/",
//     position: "n",
//     lesson_id: 2,
//     course_id: 1,
//     trans: "Kiểm tra, kỳ thi",
//     trans_hint: "Anh ấy chuẩn bị tham gia một kỳ thi đầu vào.",
//     en_hint: "He is going to take an entrance examination.",
//     audio: "https://pi.nhalq.dev/kimochi/audio/348.mp3",
//     picture: "https://pi.nhalq.dev/kimochi/image/348.png",
//   },
//   {
//     id: 349,
//     content: "ba",
//     phonetic: "/ɪɡˌæmɪˈneɪʃn/",
//     position: "n",
//     lesson_id: 3,
//     course_id: 1,
//     trans: "Kiểm t thi",
//     trans_hint: "tham gia một kỳ thi đầu vào.",
//     en_hint: "He is goinan entrance examination.",
//     audio: "https://pi.nhalq.dev/kimochi/audio/348.mp3",
//     picture: "https://pi.nhalq.dev/kimochi/image/348.png",
//   },
//   {
//     id: 3497,
//     content: "bon",
//     phonetic: "/ɪɡˌæmɪˈneɪʃn/",
//     position: "n",
//     lesson_id: 3,
//     course_id: 1,
//     trans: "Kiểm t thi",
//     trans_hint: "tham gia một kỳ thi đầu vào.",
//     en_hint: "He is goinan entrance examination.",
//     audio: "https://pi.nhalq.dev/kimochi/audio/348.mp3",
//     picture: "https://pi.nhalq.dev/kimochi/image/348.png",
//   },
// ];

const Learning: React.FC = () => {
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = React.useState<Vocabulary[]>([]);

  const [levelVocab, setLevelVocab] = React.useState<
    Record<number, LevelVocab>
  >([]);
  // levelVocab[]={
  //   id:vocabulary.id,
  //   level:2
  // }
  // setLevelVocab({...levelVocab})

  // const updateLevelVocab = (vocabulary: Vocabulary) => {
  //   setLevelVocab((prevLevelVocab) => ({
  //     ...prevLevelVocab,
  //     [vocabulary.id]: {
  //       id: vocabulary.id,
  //       level: 2,
  //     },
  //   }));
  // };
  // React.useEffect(() => {
  //   console.log("le", levelVocab);
  //   vocabularies.forEach((vocabulary) => {
  //     updateLevelVocab(vocabulary);
  //   });
  // }, [vocabularies]);

  // ========================================
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const auth = getAuthV2();
  const { courseId, lessionId } = useParams();
  const getDataVocabularies = async () => {
    const token = await auth?.currentUser?.getIdToken();
    axios
      .get<VocabularyReponse>(
        `https://pi.nhalq.dev/kimochiapi/api/lesson/${courseId}/${lessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("responseVocabularies.data", response.data);
        setVocabularies(response.data.vocabularies);
      });
  };
  React.useEffect(() => {
    if (auth?.currentUser) {
      getDataVocabularies();
    }
  }, [auth?.currentUser]);
  //push isFinish
  const UpdateLevelVocab = async () => {
    // const date = new Date();
    const token = await auth?.currentUser?.getIdToken();
    const list: LearningProgess[] = [];
    for (const [key, value] of Object.entries(levelVocab)) {
      list.push({
        level: value.level,
        vocabId: value.id,
      });
    }
    axios
      .put<LearningProgess[]>(
        "https://pi.nhalq.dev/kimochiapi/api/learningprogress",
        list,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("levelVocabResponse.data", response.data);
      });
  };

  // update Level chưa làm được

  const UpdateIsFinishLession = async () => {
    const token = await auth?.currentUser?.getIdToken();
    axios
      .post<IsFinishLesson[]>(
        `https://pi.nhalq.dev/kimochiapi/api/lesson/${courseId}/${lessionId}/finish`,
        { courseId: { courseId }, lessonId: { lessionId } },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("IsFinishResponse.data", response.data);
      });
  };

  const getTotalStep = () => {
    return vocabularies.length * 2;
  };
  const handleFlip = () => {
    setIsFlipped(true);
  };
  // set Level của từ vựng
  const setLevel = (level: LevelVocab) => {
    levelVocab[level.id] = { ...level };
    setLevelVocab({ ...levelVocab });
    console.log("da nho", levelVocab);
  };
  // xử lí tiếp tục khi hình đã lật
  const handleOnClick = (vocablary: Vocabulary) => {
    setLevel({
      id: vocablary.id,
      level: 3,
    });
    console.log("tt", levelVocab);
    if (isFlipped) {
      nextVocab(vocabularies[getVocabIndex()]);
    }
  };
  const learnFinish = () => {
    UpdateLevelVocab();
    UpdateIsFinishLession();
    toast("Wow. Finish!");
  };

  const nextVocab = (vocablary: Vocabulary) => {
    setLevel({
      id: vocablary.id,
      level: 1,
    });
    console.log("kiemer tra", levelVocab);

    setProgressValue(progressValue + 100 / getTotalStep());
    if (index == getTotalStep() - 1) {
      learnFinish();
      navigate("/endoflesson");

      return;
    }
    setIndex(index + 1);
  };
  //==================================================================================
  const handleOnClickCloseLearning = () => {
    navigate("/review");
  };
  const handleRemembered = (vocablary: Vocabulary) => {
    setLevel({
      id: vocablary.id,
      level: 3,
    });

    setProgressValue(progressValue + (2 * 100) / getTotalStep());
    if (index == getTotalStep() - 2) {
      learnFinish();
      navigate("/endoflesson");
      return;
    }
    setIndex(index + 2);

    // ============================
    // setLevelVocab((prevLevelVocab) => [
    //   ...prevLevelVocab,
    //   { id: vocabularies[].id, level: 3 },
    // ]);
    // console.log("leve", vocabularies[]);
  };
  useEffect(() => {
    setIsFlipped(false);
  }, [index]);
  const getVocabIndex = () => {
    if (index % 2 == 0) {
      return index / 2;
    }
    return (index - 1) / 2;
  };
  const renderContent = () => {
    // console.log({ vocabularies });
    const vocabIndex = getVocabIndex();

    if (index % 2 == 0) {
      if (!vocabularies[vocabIndex]) {
        return <></>;
      }
      return (
        <>
          <FlipItemShadow
            key={index}
            vocabulary={vocabularies[vocabIndex]}
            onFlip={handleFlip}
          />

          <StyledButton
            disable={!isFlipped}
            onClick={() => handleOnClick(vocabularies[getVocabIndex()])}
          >
            Tiếp Tục
          </StyledButton>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              cursor: "pointer",
              textDecoration: "underline",
              margin: "10px 0px",
            }}
            onClick={() => handleRemembered(vocabularies[getVocabIndex()])}
          >
            Mình đã thuộc từ này
          </p>
        </>
      );
    } else {
      const vocab = vocabularies[vocabIndex];

      return (
        <Writewords
          key={index}
          vocabulary={vocab}
          onSucces={() => nextVocab(vocabularies[getVocabIndex()])}
        />
      );
    }
    // } else {
    //   console.log("vocabulariesxxx", vocabularies);
    //   const vocab = vocabularies[(index - 1) / 2];
    //   return <Writewords word={vocab.content} onSucces={nextVocab} />;
    // }
  };
  if (!vocabularies || vocabularies.length === 0) {
    return <></>;
  }
  return (
    <Container
      minW="400px"
      maxW="50%"
      maxH="100%"
      bg="gray.100"
      height="calc(100vh)"
      color="white"
    >
      <Flex flexDirection="row" alignItems="center">
        <CloseButton
          size="lg"
          fontSize={20}
          onClick={handleOnClickCloseLearning}
        />
        <ProgressBar value={progressValue} />
      </Flex>
      <VStack>
        <VStack width="50%">
          <HStack marginTop={"10px"}>
            key={index}
            <UseSound vocabulary={vocabularies[getVocabIndex()]} />
            <Slow vocabulary={vocabularies[getVocabIndex()]} />
          </HStack>
          {renderContent()}

          {/* đọc từ vựng */}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Learning;
