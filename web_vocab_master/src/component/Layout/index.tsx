"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  VStack,
  Text,

  // background,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router";
import Logo from "../Logo";
import { pageLinks } from "../../data/PageLinks";
// import DrawerCourse from "../../pages/CourseVocab";
import React from "react";
// import { useAuth } from "../../firebaseConfig";
import axios from "axios";
import { OverViewVocab } from "../../data/OverViewVocab";
import "./index.css";
import { getAuthV2, useAuth } from "../../firebaseConfig";
interface Props {
  children: React.ReactNode;
}

// const Links = ["Ôn tập", "Học từ mới ", "Sổ tay", "Khóa học"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={3}
      py={3}
      rounded={"md"}
      fontWeight={900}
      fontSize={23}
      color={"gray.200"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("green.200", "green.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};
import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import AccountSettings from "../AlertDialog/AccountSettings";

interface Props {
  children: React.ReactNode;
}
export default function Layout(props: Props) {
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAccountSettings, setShowAccountSettings] = React.useState(false);
  const navigate = useNavigate();
  let username = null;
  const auth = useAuth();
  const authv2 = getAuthV2();
  const [overViewvocabularies, SetoverViewvocabularies] =
    React.useState<OverViewVocab>({
      overviewVocabs: [],
      practiceVocabCount: 0,
    });
  // lấy số tự vựng cần ôn tập
  const getDataOverView = async () => {
    const token = await authv2?.currentUser?.getIdToken();
    axios
      .get<OverViewVocab>(
        "https://pi.nhalq.dev/kimochiapi/api/overviewvocabandprogress",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("chuong.data", response.data);
        SetoverViewvocabularies(response.data);
      });
  };
  React.useEffect(() => {
    console.log("dsafd");
    if (auth?.currentUser) {
      getDataOverView();
    }
  }, [auth?.currentUser]);

  // const courseDisclouse = useDisclosure();
  // const btnRef = React.useRef(null);
  const handleOnclickLogin = () => {
    navigate("/login");
  };
  const handleOnclickRestpass = () => {
    // navigate("/ResetPassword");
    setShowAccountSettings(true);
    // <Profile />;
  };
  const handleOnclickLogo = () => {
    navigate("/");
  };
  const handleOnclickReview = () => {
    navigate("/review");
  };
  if (
    auth?.currentUser?.email &&
    typeof auth?.currentUser?.email === "string"
  ) {
    username = auth?.currentUser?.email.split("@")[0];
    if (username.length > 7) {
      username = username.substring(0, 7);
    }
  }

  return (
    <>
      <HStack>
        <Modal
          isOpen={showAccountSettings}
          onClose={() => setShowAccountSettings(false)}
        >
          <ModalContent
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "780px",
              marginBottom: "0",
              marginTop: "0",
              margin: "20px auto",
            }}
          >
            <ModalCloseButton />
            <ModalBody>
              <div
              // style={{
              //   width: "100%",
              //   height: "100%",
              //   maxWidth: "500px",
              //   maxHeight: "300px",
              // }}
              >
                <AccountSettings />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>

      <Box
        bg={useColorModeValue("green.400", "gray.400")}
        px={4}
        position="sticky"
        top="0"
        zIndex="100"
        boxShadow="0 2px 0 0 #B5B5B5"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box onClick={handleOnclickLogo} marginRight={"2%"}>
            <Logo />
          </Box>
          <div>
            <HStack
              id="2222"
              as={"nav"}
              display={{ base: "none", md: "flex" }}
              justifyContent="center"
              gap={10}
              style={{
                listStyle: "none",
                color: "white",
                fontSize: "23px",
                fontFamily: "cursive",
                fontWeight: "bold",
              }}
            >
              {pageLinks.map((link) => {
                const { id, href, text, Image } = link;

                return (
                  <li key={id}>
                    <Box
                      as="a"
                      px={3}
                      py={3}
                      href={href}
                      textDecoration="none"
                      color="white"
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          marginRight: "30px",
                          marginTop: "5px",
                          transition: "background 0.3s, color 0.3s",
                        }}
                        _hover={{
                          bg: "green.300",
                          color: "white",
                        }}
                      >
                        <img
                          src={Image}
                          alt={text}
                          width="30px"
                          height="20px"
                        />
                        <p> {text} </p>
                      </Box>
                    </Box>
                  </li>
                );
              })}
            </HStack>
          </div>
          <Flex alignItems={"center"} width={220}>
            <div style={{ width: "150px" }}>
              <button className="inbox-btn" onClick={handleOnclickReview}>
                <svg viewBox="0 0 448 512" className="bell">
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
                <span className="msg-count">
                  {overViewvocabularies.practiceVocabCount}
                </span>
              </button>
            </div>

            <div style={{ width: "330px" }}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      style={{ width: "35px", height: "35px" }}
                      src={
                        "https://imgt.taimienphi.vn/cf/Images/np/2023/1/5/avatar-tet-2023-30-anh-dai-dien-tet-quy-mao-dep-de-thuong-10.jpg"
                      }
                    />
                    <VStack
                      // bg={"red"}
                      // width={"205px"}
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                      marginRight={"20px"}
                    >
                      {/* <Text fontSize="sm">Justin Clark</Text> */}
                      <Text fontSize="18px">{username}...</Text>
                      {/* <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text> */}
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  <MenuItem onClick={handleOnclickRestpass}>Settings</MenuItem>
                  {/* <MenuItem>Billing</MenuItem> */}
                  <MenuDivider />
                  <MenuItem onClick={handleOnclickLogin}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {pageLinks.map((link) => (
                <NavLink key={link.id}>{link.text}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {/* {showAccountSettings && <AccountSettings />} */}
      {/* <DrawerCourse {...courseDisclouse} btnRef={btnRef} /> */}
      <Box>{children}</Box>
    </>
  );
}
