import {
  Drawer,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Heading,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Course } from "../data/Course";
import { getAuthV2 } from "../firebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

// const options = [
//   {
//     courseId: 1,
//     desc: "Củng cố nền tảng tiếng Anh",
//     title: "1000 TỪ CƠ BẢN",
//   },
//   {
//     courseId: 6,
//     desc: "Ôn IELTS 6.5 Reading &amp; Listening",
//     title: "IELTS CƠ BẢN",
//   },
//   {
//     courseId: 7,
//     desc: "Ôn IELTS 6.5 Reading &amp; Listening fkdsnflsdfn,.fnflkdsnfklkfsdnflkjslkfjskaf",
//     title: "Ifdsaf",
//   },
//   {
//     courseId: 7,
//     desc: "Ôn IELTS 6.5 Reading &amp; Listening fkdsnflsdfn,.fnflkdsnfklkfsdnflkjslkfjskaf",
//     title: "Ifdsaf",
//   },
//   {
//     courseId: 10,
//     desc: "Ôn IELTS 6.5 Reading &amp; Listening fkdsnflsdfn,",
//     title: "Ifdsaf",
//   },
// ];

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
}
function CourseVocab({ isOpen, onClose, btnRef }: DrawerProps) {
  const navigate = useNavigate();
  const handleOnclickGetStartLessonVocab = (courseId: number) => {
    console.log("vao  ", courseId);
    navigate(`/lessonvocab/${courseId}`);
  };
  const [course, setCourse] = React.useState<Course[]>([]);
  const auth = getAuthV2();
  const getDataCourse = async () => {
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
        setCourse(response.data);
      });
  };
  React.useEffect(() => {
    console.log("auth", auth?.currentUser);
    if (auth?.currentUser) {
      getDataCourse();
    }
  }, [auth?.currentUser]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          overflowY="auto"
          maxH="100vh"
          maxW="30%"
          minWidth="min-content"
        >
          <DrawerCloseButton />
          <Box
            style={{
              minWidth: "380px",
              background:
                "  linear-gradient(0deg , #387ed9 65.50%, #0023ac 100.81%)",
              height: "100px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: "0px",
              zIndex: "101",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "30px auto",
                color: "white",
                height: "100px",
              }}
            >
              CÁC KHÓA HỌC
            </p>
          </Box>
          <Stack width={"100%"} borderRadius={20} marginTop={5}>
            {course.map((courses) => (
              <Stack
                key={courses.courseId}
                p={3}
                boxShadow="5px 10px 5px rgba(189, 189, 189, 0.9);"
                backgroundColor={"#F8F8F8"}
                alignItems="center"
                borderRadius={20}
                marginTop={5}
              >
                <Heading fontSize={25} fontWeight={"Bold"}>
                  {courses.title}
                </Heading>
                <p style={{ fontSize: "20px" }}>{courses.desc}</p>
                <Stack>
                  <Button
                    size="md"
                    bgColor={"#a9d4f5"}
                    onClick={() =>
                      handleOnclickGetStartLessonVocab(courses.courseId)
                    }
                  >
                    Bắt Đầu
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
          {/* </div> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default CourseVocab;
