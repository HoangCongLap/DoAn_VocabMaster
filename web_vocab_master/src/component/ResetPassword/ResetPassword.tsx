// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import Nav from "../Nav";
// import { useAuth } from "../../firebaseConfig";
// import { updatePassword } from "firebase/auth";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const auth = useAuth();

//   const handleUpdatePassword = async () => {
//     try {
//       // Kiểm tra xem người dùng đã đăng nhập hay chưa
//       console.log("auth?.currentUser", auth?.currentUser);
//       if (auth?.currentUser) {
//         // Sử dụng hàm updatePassword để cập nhật mật khẩu mới
//         await updatePassword(auth?.currentUser, newPassword);
//         toast.success("Mật khẩu đã được cập nhật thành công.");
//       } else {
//         toast.error("Không có người dùng hiện tại. Hãy đăng nhập lại.");
//       }
//     } catch (error) {
//       // console.error("Lỗi khi cập nhật mật khẩu:", error.message);
//       toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại sau.");
//     }
//   };
//   console.log("object", newPassword);
//   return (
//     <Flex
//       direction="column"
//       align="center"
//       justify="flex-start"
//       bg={useColorModeValue("white", "gray.700")}
//       minH="100vh"
//       gap={10}
//     >
//       <Nav />
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
//         <Stack align={"center"}>
//           <Heading fontSize={"4xl"}> Forgot Password</Heading>
//         </Stack>
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("white", "gray.700")}
//           boxShadow={"lg"}
//           p={8}
//         >
//           <Stack spacing={4}>
//             <FormControl id="newPassword">
//               <FormLabel>New Password</FormLabel>
//               <Input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </FormControl>
//             <Stack spacing={10}>
//               <Button
//                 bg={"blue.400"}
//                 color={"white"}
//                 _hover={{
//                   bg: "blue.500",
//                 }}
//                 onClick={handleUpdatePassword}
//               >
//                 Reset Password
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// };

// export default ResetPassword;
