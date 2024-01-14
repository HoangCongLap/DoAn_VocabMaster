"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Container,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";

export default function FrequentlyAskedQuestions() {
  return (
    <Flex
      // minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container width={5000}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={"19px"}>
                  Lộ trình học là như thế nào?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Học từ vựng: Bạn có thể học từ vựng theo từng chủ đề, từ những chủ
              đề quen thuộc như: Family, School, Sport, Masterchef, Games,
              Hobbies, Work, Emotion,…
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={"19px"}>
                  Làm thế nào để học hiệu quả nhất?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Giữ thói quen học đều đặn. Việc dành 15 phút học mỗi ngày sẽ hiệu
              quả hơn là bạn học dồn vào 1-2 ngày rồi bỏ bẵng.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={"19px"}>
                  Giúp bạn ghi nhớ từ vựng tiếng Anh như thế nào?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Phương pháp tạo ra các khoảng ngắt quãng trong quá trình học, và
              là kỹ thuật mạnh mẽ nhất trong các cách để cải thiện khả năng ghi
              nhớ của người học. Phương pháp này trái ngược với cách học “nhồi”
              truyền thống mà mọi người thường sử dụng mỗi lần ôn thi.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize={"19px"}>
                  App bị lỗi kết nối mạng trong khi các ứng dụng khác dùng bình
                  thường thì phải làm sao?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Bạn hãy thoát ra. Sau khi đăng nhập lại, bạn tải lại dữ liệu học,
              sau đó học và ôn tập bình thường.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Flex>
  );
}
