import { Container, Image, VStack } from "@chakra-ui/react";

import Book from "../../img/book.png";
import { useNavigate } from "react-router";
import StyledButton from "../StyledButton";

const EndOfLesson = () => {
  const navigate = useNavigate();
  const handleOnclickCompletesLearning = () => {
    navigate("/lessonvocab/1");
  };
  return (
    <Container
      minW="400px"
      maxW="50%"
      maxH="100%"
      bg="gray.100"
      height="calc(100vh)"
      color="white"
    >
      <VStack>
        <p
          style={{
            color: "#FFCB08",
            fontSize: "24px",
            fontWeight: "Bold",
            marginTop: "80px",
          }}
        >
          Bạn đã học 10 từ
        </p>
        <Image
          marginTop="40px"
          borderRadius="20px"
          boxSize="300px"
          src={Book}
          alt="Dan Abramov"
        />

        <StyledButton onClick={handleOnclickCompletesLearning}>
          Tiếp Tục
        </StyledButton>
      </VStack>
    </Container>
  );
};

export default EndOfLesson;
