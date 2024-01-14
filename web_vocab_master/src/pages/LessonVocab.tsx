import React from "react";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import LearnNewWords from "../component/LearnVocab/LearnVocab";
import { useParams } from "react-router";
import { getAuthV2 } from "../firebaseConfig";
// import { Lesson } from "../data/Lesson";
import axios from "axios";
import { Course } from "../data/Course";

const VocabLesson: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState<Course | null>(null);
  const auth = getAuthV2();
  const getDataCourse = async () => {
    if (!courseId) {
      return;
    }
    const courseIdInt = parseInt(courseId);
    const token = await auth?.currentUser?.getIdToken();
    axios
      .get<Course[]>("https://pi.nhalq.dev/kimochiapi/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          fromId: 0,
          limit: 10,
        },
      })
      .then((response) => {
        console.log("response.data", response.data);
        const courses: Course[] = response.data;
        for (const courseIndex of courses) {
          if (courseIndex.courseId === courseIdInt) {
            setCourse(courseIndex);
            break;
          }
        }
      });
  };
  React.useEffect(() => {
    console.log("auth", auth?.currentUser);
    if (auth?.currentUser) {
      getDataCourse();
    }
  }, [auth?.currentUser, course]);

  console.log("courseidLesson", courseId);
  // const navigate = useNavigate();
  if (courseId == undefined) {
    // return navigate("/lessonvocab");
  }
  return (
    <>
      <Stack
        width={"85%"}
        background={"linear-gradient(50deg , #d7d938 5.50%, #e3ea99 100%)"}
        boxShadow={"0 6px 0 0 #a4a120"}
        p={5}
        alignItems={"center"}
        justifyContent="center"
        direction={{
          base: "column",
          md: "row",
        }}
        borderRadius={20}
        style={{
          margin: "0 auto",
          marginTop: "20px",
        }}
        position="sticky"
        top="64px"
        zIndex="101"
      >
        <Heading fontSize={30}> {course?.title}</Heading>
      </Stack>
      <VStack>
        <LearnNewWords courseId={parseInt(courseId as string)} />
      </VStack>
      <Stack marginRight={0} bg={"Red"}></Stack>
    </>
  );
};

export default VocabLesson;
