"use client";

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../firebaseConfig";
import { useRef, useState } from "react";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let username = null;
  const auth = useAuth();
  if (
    auth?.currentUser?.email &&
    typeof auth?.currentUser?.email === "string"
  ) {
    username = auth?.currentUser?.email.split("@")[0];
    if (username.length > 20) {
      username = username.substring(0, 14);
    }
  }

  const [profileImage, setProfileImage] = useState(
    "https://imgt.taimienphi.vn/cf/Images/np/2023/1/5/avatar-tet-2023-30-anh-dai-dien-tet-quy-mao-dep-de-thuong-10.jpg"
  );
  const [newImage, setNewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setNewImage(result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    if (newImage) {
      setProfileImage(newImage);
      setNewImage(null);
    }
  };

  // Sử lí việc đổi lại mật khẩu
  const handleUpdatePassword = async () => {
    try {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      console.log("auth?.currentUser", auth?.currentUser);
      if (!newPassword || !confirmPassword) {
        toast.error("Vui lòng nhập New Password và Confirm Password.");
        return;
      } else {
        if (newPassword == confirmPassword) {
          if (auth?.currentUser) {
            // Sử dụng hàm updatePassword để cập nhật mật khẩu mới
            await updatePassword(auth?.currentUser, newPassword);
            toast.success("Mật khẩu đã được cập nhật thành công.");
            setShowPasswordForm(false);
          } else {
            toast.error("Không có người dùng hiện tại. Hãy đăng nhập lại.");
          }
        } else {
          toast.error("Xác nhận mật khẩu không khớp.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error.message);
      toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại sau.");
    }
  };
  // Click vào nút "đổi mật khẩu" bắt đầu show lên
  const handleShowPasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };
  return (
    <Center py={2}>
      <Stack direction="column">
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"column"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {/* ảnh vào */}
            <Stack bg="blue.200">
              <Image
                bg={"red"}
                objectFit="cover"
                src={newImage || profileImage}
                alt="#"
              />
            </Stack>
            <Stack direction="row">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                  onClick={handleImageChange}
                >
                  Change Image
                </Button>
              </label>
              <label>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  onClick={handleImageSave}
                >
                  Save Image
                </Button>
              </label>
            </Stack>
          </Stack>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {username}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {/* Ngày kích hoạt: {formattedDate} */}
            </Text>
            {/* <Text
            textAlign={"center"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Actress, musician, songwriter and artist. PM for work inquires or
            <Text color={"blue.400"}>#tag</Text>
            me in your posts
          </Text> */}
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #music
              </Badge>
            </Stack>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={handleShowPasswordForm}
              >
                Đổi mật khẩu
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Follow
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {/* ĐỔI MẬT KHẨU */}
        <Stack
          marginTop={"30px"}
          width={"100%"}
          align="center"
          borderRadius={20}
        >
          {showPasswordForm && (
            <Flex
              direction="column"
              align="center"
              justify="flex-start"
              bg={useColorModeValue("white", "gray.700")}
              minH="100%"
              gap={10}
              boxShadow={"2xl"}
              borderEndRadius={20}
            >
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
                width={400}
              >
                <Heading fontSize={"4xl"}> Change Password</Heading>
                <Stack spacing={4}>
                  <FormControl id="newPassword">
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleUpdatePassword}
                    >
                      Reset Password
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Flex>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
