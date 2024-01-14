import { useState, useEffect } from "react";
import { Box, Image, Progress, Stack } from "@chakra-ui/react";

const LoaderByTimlmit = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;
        return newPercentage <= 100 ? newPercentage : 100;
      });
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (percentage === 100) {
      window.location.href = "/reviewAnswer";
    }
  }, [percentage]);

  return (
    <Stack
      style={{
        marginTop: "400px",
        height: "350px",
        flex: "colum",
      }}
    >
      <Stack width="80%" margin="0px auto">
        <Box>
          <Image
            marginLeft={`${percentage - 10}%`}
            src="https://learn.mochidemy.com/image/mochi_tet-02.png"
            alt="Running Cat"
            boxSize="80px"
          />
        </Box>
        <Box>
          <Progress
            sx={{ borderRadius: "20px" }}
            size="sm"
            value={percentage}
            colorScheme="red"
          />
        </Box>
      </Stack>
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Ôn tập vào Thời điểm vàng giúp bạn tăng 10 lần khả năng ghi nhớ.
      </p>
    </Stack>
  );
};

export default LoaderByTimlmit;
