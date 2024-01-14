"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useNavigate } from "react-router";
import Nav from "../component/Nav";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useAuth();
  const handleOnclickSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập email, Password và Confirm password.");
      return;
    } else {
      if (password == confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("Đăng Ký thành công.");
            navigate("/lessonvocab/1");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === "auth/email-already-in-use") {
              toast.error("Email đã được sử dụng.");
            } else if (errorCode === "auth/weak-password") {
              toast.error("passwork phải có ít nhất 6 ký tự.");
            } else {
              toast(errorCode);
            }
          });
      } else {
        toast.error("Xác nhận mật khẩu không khớp.");
      }
    }
  };
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      gap={10}
      width={"100%"}
    >
      <Nav />
      <Stack
        width={"40%"}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        px={6}
        minW={400}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up</Heading>
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
            <FormControl id="confirmPassword">
              <FormLabel>Confirm password</FormLabel>
              <Input
                type="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} marginTop={50}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleOnclickSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack
              direction="row"
              spacing={4}
              display={"Flex"}
              flexDirection={"row"}
              margin={"20px auto 0"}
            >
              <div>Đã có tài khoản? </div>
              <div>
                <Text
                  as="a"
                  color={"blue.400"}
                  textDecor="underline"
                  fontWeight="bold"
                  href="/login"
                >
                  Login
                </Text>
              </div>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
