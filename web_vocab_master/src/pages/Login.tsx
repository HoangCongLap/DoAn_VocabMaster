"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Nav from "../component/Nav";
import SocialMediaButtons from "../component/SocialMediaButtons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../firebaseConfig";
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { EmailIcon } from "@chakra-ui/icons";

// const account: Account[] = [
//   {
//     email: "lap@gmail.com",
//     password: "1212121",
//   },
//   {
//     email: "lappp@gmail.com",
//     password: "123",
//   },
// ];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const handleOnclickLearn = () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu.");
      return;
    } else {
      signInWithEmailAndPassword(auth as Auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          navigate("/review");
          console.log("user:", user);
          toast.success("Đăng nhập thành công.");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/invalid-email") {
            toast.error("Email không đúng. Vui lòng nhập lại.");
          } else if (errorCode === "auth/wrong-password") {
            toast.error("Mật khẩu không đúng. Vui lòng nhập lại.");
          } else if (errorCode === "auth/user-not-found") {
            toast.error("Tài khoản không đúng. Vui lòng nhập lại.");
          }

          console.log(errorCode, errorMessage);
        });
    }
  };

  const handleClick = () => {
    console.log("auth", auth);
    if (auth) {
      const provider = new GoogleAuthProvider();
      auth.languageCode = "en";
      signInWithRedirect(auth, provider);
      navigate("/review");
    }
  };

  // const handleOnclickLearn = () => {
  // if (!email || !password) {
  //   toast.error("Vui lòng nhập cả email và mật khẩu.");
  //   return;
  // }
  //   const user = account.find(
  //     (user) => user.email === email && user.password === password
  //   );
  //   if (user) {
  //     navigate("/learnvocab");
  //   } else {
  //     toast.error("Vui lòng kiểm trả lại cả email và mật khẩu.");
  //     return;
  //   }
  // };
  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      gap={10}
    >
      <Nav />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text
                  color={"blue.400"}
                  onClick={() => navigate("/forgot-password")}
                  _hover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleOnclickLearn}
              >
                Sign in
              </Button>
              <Stack direction="row" spacing={4}>
                <div>Chưa có tài khoản? </div>
                <div>
                  <Text
                    as="a"
                    color={"blue.400"}
                    textDecor="underline"
                    fontWeight="bold"
                    href="/signup"
                  >
                    Tạo tài khoản mới
                  </Text>
                </div>
              </Stack>
              {/* những icon email,fb,... */}
              {/* <li>
                <button onClick={handleClick}>g</button>
              </li> */}
              <SocialMediaButtons />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
