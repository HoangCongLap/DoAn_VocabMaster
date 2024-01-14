"use client";

import {
  // Avatar,
  Box,
  Button,
  Divider,
  Heading,
  //   List,
  //   ListIcon,
  //   ListItem,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

// import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { getAuthV2 } from "../../firebaseConfig";
import { LessonResponse } from "../../data/Lesson";
import React from "react";

// const options = [
//   {
//     courseId: 1,
//     lessonId: 1,
//     titleVN: "1.Trường học",
//     titleEN: "Schools",
//   },
//   {
//     courseId: 1,
//     lessonId: 2,
//     titleVN: "2.Kì thi",
//     titleEN: "Examination",
//   },
//   {
//     courseId: 1,
//     lessonId: 3,
//     titleEN: "Extracurricular Activities",
//     titleVN: "3.Hoạt động ngoại khóa",
//   },
//   {
//     lessonId: 4,
//     titleEN: "School Stationery",
//     titleVN: "4.Dụng cụ học tập",
//     courseId: 1,
//   },
//   {
//     lessonId: 5,
//     titleEN: "School Subjects",
//     titleVN: "5.Các môn học",
//     courseId: 1,
//   },
//   {
//     lessonId: 6,
//     titleEN: "Classroom",
//     titleVN: "6.Lớp học",
//     courseId: 1,
//   },
//   {
//     lessonId: 7,
//     titleEN: "Universities",
//     titleVN: "7.Trường đại học",
//     courseId: 1,
//   },
//   {
//     lessonId: 8,
//     titleEN: "Body",
//     titleVN: "8.Bộ phận cơ thể",
//     courseId: 1,
//   },
//   {
//     lessonId: 9,
//     titleEN: "Appearance",
//     titleVN: "9.Ngoại hình",
//     courseId: 1,
//   },
//   {
//     lessonId: 10,
//     titleEN: "Characteristics",
//     titleVN: "10.Tính cách",
//     courseId: 1,
//   },
//   {
//     lessonId: 11,
//     titleEN: "Age",
//     titleVN: "11.Tuổi tác",
//     courseId: 1,
//   },
//   {
//     lessonId: 12,
//     titleEN: "Feelings",
//     titleVN: "12.Cảm xúc",
//     courseId: 1,
//   },
//   {
//     lessonId: 13,
//     titleEN: "Family",
//     titleVN: "13.Gia đình",
//     courseId: 1,
//   },
//   {
//     lessonId: 14,
//     titleEN: "Relationships",
//     titleVN: "14.Các mối quan hệ",
//     courseId: 1,
//   },
//   {
//     lessonId: 15,
//     titleEN: "Colours",
//     titleVN: "15.Màu sắc",
//     courseId: 1,
//   },
//   {
//     lessonId: 16,
//     titleEN: "Shapes",
//     titleVN: "16.Hình dạng",
//     courseId: 1,
//   },
//   {
//     lessonId: 17,
//     titleEN: "Numbers",
//     titleVN: "17.Số đếm",
//     courseId: 1,
//   },
//   {
//     lessonId: 18,
//     titleEN: "Ordinal Numbers",
//     titleVN: "18.Số thứ tự",
//     courseId: 1,
//   },
//   {
//     lessonId: 19,
//     titleEN: "Days In A Week",
//     titleVN: "19.Ngày trong tuần",
//     courseId: 1,
//   },
//   {
//     lessonId: 20,
//     titleEN: "Talking About Time",
//     titleVN: "20.Nói về thời gian",
//     courseId: 1,
//   },
// ];

const LearnNewWords = ({ courseId }: LearnNewWordsProps) => {
  const [lesson, setLesson] = React.useState<LessonResponse[]>([]);
  const auth = getAuthV2();

  const getDataLesson = async () => {
    console.log("cou", courseId);
    const token = await auth?.currentUser?.getIdToken();
    axios
      .get<LessonResponse[]>(
        `https://pi.nhalq.dev/kimochiapi/api/lessons/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            fromId: 0,
            limit: 10,
          },
        }
      )
      .then((response) => {
        console.log("LearnVocabResponse.data", response.data);
        setLesson(response.data);
      });
  };
  React.useEffect(() => {
    console.log("auth", auth?.currentUser);
    if (auth?.currentUser) {
      getDataLesson();
    }
  }, [auth?.currentUser, courseId]);

  return (
    <Box width={"60%"} id="dd">
      <Stack spacing={4} direction={"column"}>
        <Stack gap={8}>
          <Divider />
          {lesson.map((individualLesson, index) => {
            // console.log("tu", individualLesson);
            return (
              <PackageTier
                key={individualLesson.lesson.lessonId}
                titleVN={index + 1 + "." + individualLesson.lesson.titleVN}
                titleEN={individualLesson.lesson.titleEN}
                courseId={courseId}
                lessonId={individualLesson.lesson.lessonId}
                isFinish={individualLesson.isFinish}
              />
            );
          })}
          <Divider />
        </Stack>
      </Stack>
    </Box>
  );
};

interface LearnNewWordsProps {
  courseId: number;
}

interface PackageTierProps {
  titleEN?: string;
  titleVN?: string;
  checked?: boolean;
  courseId: number;
  lessonId: number;
  isFinish: boolean;
}
const PackageTier = ({
  titleVN,
  titleEN,
  courseId,
  lessonId,
  checked = false,
  isFinish,
}: PackageTierProps) => {
  const navigate = useNavigate();
  const handleOnclickGetStartLearn = () => {
    if (isFinish) {
      return;
    } else {
      navigate(`/learning/${courseId}/${lessonId}`);
    }
  };
  const colorTextLight = checked ? "white" : "purple.600";
  const bgColorLight = checked ? "purple.400" : "gray.300";

  const colorTextDark = checked ? "white" : "purple.500";
  const bgColorDark = checked ? "purple.400" : "gray.300";
  return (
    <>
      <Stack
        width={"100%"}
        background={isFinish ? "#4da936" : "#e0e0e0"}
        boxShadow="rgba(189, 189, 189, 0.25) 5px 5px 5px 0px"
        borderRadius={"20px"}
      >
        <Stack
          p={3}
          // background={isFinish ? "#47c958" : "#F8F8F8"}
          background={
            isFinish
              ? "linear-gradient(269.83deg, #26AE38 0.14%, #59CD05 99.86%)"
              : "#F8F8F8"
          }
          boxShadow={isFinish ? "0 6px 0 0 #209b32" : "0 6px 0 0 #f2f2f2"}
          alignItems="center"
          borderRadius={20}
          //  background: linear-gradient(269.83deg, #26AE38 0.14%, #59CD05 99.86%);
        >
          <Heading size={"md"}>{titleEN}</Heading>
          <p>{titleVN}</p>

          <Stack>
            <Button
              size="md"
              color={useColorModeValue(colorTextLight, colorTextDark)}
              bgColor={useColorModeValue(bgColorLight, bgColorDark)}
              onClick={handleOnclickGetStartLearn}
            >
              Bắt Đầu
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default LearnNewWords;
