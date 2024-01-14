import { Flex, useDisclosure } from "@chakra-ui/react";
import "./index.css";
import React from "react";
import DrawerCourse from "../../pages/CourseVocab";

const LabCourse = () => {
  const courseDisclouse = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      <Flex flexDirection="row" position="sticky" top="64px">
        <button className="btn-5" ref={btnRef} onClick={courseDisclouse.onOpen}>
          <span>Khóa học</span>
        </button>
      </Flex>
      <DrawerCourse {...courseDisclouse} btnRef={btnRef} />
    </>
  );
};

export default LabCourse;
