import {
  Box,
  Container,
  Divider,
  Flex,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { getAuthV2 } from "../firebaseConfig";
import axios from "axios";
import { Vocabulary } from "../data/Vocabulary";
import React from "react";
interface LevelVocablaryProps {
  level: number;
}
const NoteBook = () => {
  const [vocabularies, setVocabularies] = React.useState<Vocabulary[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const auth = getAuthV2();

  const getDataVocabByLevel = async ({ level }: LevelVocablaryProps) => {
    const token = await auth?.currentUser?.getIdToken();
    axios
      .get<Vocabulary[]>(
        `https://pi.nhalq.dev/kimochiapi/api/listreviewvocablevel/${level}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("getDataVocabByLevel.data", response.data);
        setVocabularies(response.data);
      });
  };
  // thanh tìm kiếm từ vựng
  const filteredVocabularies = vocabularies.filter((vocabulary) =>
    vocabulary.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("zzz", vocabularies);

  // if (vocabularies.length > 0) {
  //   console.log("xxx", vocabularies[0].content);
  // }

  const handleOnclickVocabByLevel = (level: LevelVocablaryProps) => {
    getDataVocabByLevel(level);
  };
  return (
    <Stack h="92vh">
      <>
        <style>
          {`
            .scaleOnHover {
              transform: scale(1);
              transition: transform 0.3s ease-in-out;
            }

            .scaleOnHover:hover {
              transform: scale(1.2);
            }
            .selectedLevel {
              background-color: #3182ce;
            }
          `}
        </style>
        <Stack>
          <Stack
            direction={["column", "row"]}
            marginTop={"20px"}
            spacing="0px"
            color={"black"}
            textAlign="center"
          >
            <Box
              margin={" 0 0"}
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 1 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 1
              <Divider bgColor={"red"} height={1} marginTop={"3px"} />
            </Box>

            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 2 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 2
              <Divider bgColor={"#ffcb08"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 3 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 3
              <Divider bgColor={"#56ccf2"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 4 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 4
              <Divider bgColor={"#2f80ed"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 5 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 5
              <Divider bgColor={"#213782"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 6 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 6
              <Divider bgColor={"#FF00FF"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 7 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 7
              <Divider bgColor={"#CCFF00"} height={1} marginTop={"3px"} />
            </Box>
            <Box
              w="12.5%"
              h="40px"
              className="scaleOnHover"
              onClick={() => handleOnclickVocabByLevel({ level: 8 })}
              _hover={{
                fontWeight: "bold",
              }}
            >
              Cấp độ 8
              <Divider bgColor={"#FFCC00"} height={1} marginTop={"3px"} />
            </Box>
          </Stack>
        </Stack>
      </>

      <VStack>
        <p
          style={{
            color: "#66BB6A",
            fontSize: "24px",
            fontWeight: "Bold",
            marginTop: "5px",
          }}
        ></p>

        <Flex alignItems="center" position="relative">
          <Input
            isInvalid
            errorBorderColor="red.300"
            placeholder="Gõ vào đây từ bạn muốn tìm"
            color={"black"}
            width={300}
            height={"30px"}
            zIndex={1}
            borderRadius={20}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="https://learn.mochidemy.com/svg/search.svg"
            style={{
              position: "absolute",
              left: 265,
              top: 0,
              zIndex: 0,
              width: "20px",
              height: "30px",
            }}
          />
        </Flex>

        <Stack
          marginTop={10}
          width={"100%"}
          color={"black"}
          height={"400px"}
          overflowX="auto"
        >
          <Container>
            <Table fontSize={"80%"}>
              {filteredVocabularies.map((vocabulary) => (
                <Tbody key={vocabulary.id}>
                  <Tr>
                    <Td>
                      <Box style={{ fontWeight: "bold" }}>
                        {vocabulary.content}
                      </Box>
                      {vocabulary.phonetic}
                    </Td>
                    <Td> ({vocabulary.position})</Td>
                    <Td> {vocabulary.trans}</Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </Container>
        </Stack>
      </VStack>
      {/* </Container> */}
    </Stack>
  );
};

export default NoteBook;
{
  /* <p>{vocabularies[1].content}</p> */
}
