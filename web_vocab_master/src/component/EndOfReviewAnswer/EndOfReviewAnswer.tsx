import {
  CircularProgress,
  CircularProgressLabel,
  CloseButton,
  Container,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router";
import StyledButton from "../StyledButton";

const EndOfReviewAnswer = () => {
  const { length, value } = useParams();
  const navigate = useNavigate();
  const handleOnclickCompletesLearning = () => {
    navigate("/lessonvocab/1");
  };
  const handleOnClickCloseReviewAnswer = () => {
    navigate("/review");
  };
  console.log("value", length, value);

  return (
    <Container
      minW="400px"
      maxW="50%"
      maxH="100%"
      bg="gray.100"
      height="calc(100vh)"
      color="white"
    >
      <Stack>
        <CloseButton
          size="lg"
          fontSize={20}
          marginTop={2}
          color="gray"
          background={"white"}
          borderRadius={30}
          onClick={handleOnClickCloseReviewAnswer}
        />
      </Stack>
      <VStack>
        <p
          style={{
            color: "#66BB6A",
            fontSize: "30px",
            fontWeight: "Bold",
            marginTop: "30px",
          }}
        >
          Cố lên, bạn có thể làm được mà
        </p>
        <Stack marginTop={10}>
          <CircularProgress
            max={100}
            size={200}
            value={(100 / length) * value}
            color="green.400"
          >
            <CircularProgressLabel color={"green.400"}>
              {Math.round((100 / length) * value)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Stack>
        <p
          style={{
            color: "#66BB6A",
            fontSize: "24px",
            marginTop: "30px",
          }}
        >
          Bạn đã trả lời đúng {value}/{length} câu
        </p>

        <StyledButton onClick={handleOnclickCompletesLearning}>
          Tiếp Tục
        </StyledButton>
      </VStack>
    </Container>
  );
};

export default EndOfReviewAnswer;
