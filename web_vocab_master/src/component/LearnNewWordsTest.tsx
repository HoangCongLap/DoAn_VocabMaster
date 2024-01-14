// "use client";

// import {
//   Avatar,
//   Box,
//   Button,
//   Divider,
//   Heading,
//   //   List,
//   //   ListIcon,
//   //   ListItem,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// // import { FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from "react-router";
// const options = [
//   {
//     courseId: 1,
//     lessonId: 35,
//     titleVN: "Trường học",
//     titleEN: "Schools",
//   },
//   {
//     id: 2,
//     name: "Examination",
//     desc: "2.Kì thi",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_36.png",
//   },
//   {
//     id: 3,
//     name: "Extracurricular Activities",
//     desc: "3.Hoạt động ngoại khóa",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_2.png",
//   },
//   {
//     id: 4,
//     name: "School Stationery",
//     desc: "4.Dụng cụ học tập",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_31.png",
//   },
//   {
//     id: 5,
//     name: "School Subjects",
//     desc: "5.Các môn học",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_32.png",
//   },
//   {
//     id: 6,
//     name: "Classroom",
//     desc: "6.Lớp học",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_33.png",
//   },
//   {
//     id: 7,
//     name: "Universities",
//     desc: "7.Trường đại học",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_34.png",
//   },
//   {
//     id: 8,
//     name: "Body",
//     desc: "8.Bộ phận cơ thể",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_8.png",
//   },
//   {
//     id: 9,
//     name: "Appearance",
//     desc: "9.Ngoại hình",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_9.png",
//   },
//   {
//     id: 10,
//     name: "Characteristics",
//     desc: "10.Tính cách",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_10.png",
//   },
//   {
//     id: 11,
//     name: "Age",
//     desc: "11.Tuổi tác",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_11.png",
//   },
//   {
//     id: 12,
//     name: "Feelings",
//     desc: "12.Cảm xúc",
//     img: "https://mochien3.1-api.mochidemy.com/public/images/lesson/TACB_lesson_12.png",
//   },
//   {
//     id: 13,
//     name: "Family",
//     desc: "13.Gia đình",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 14,
//     name: "Relationships",
//     desc: "14.Các mối quan hệ",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 15,
//     name: "Colours",
//     desc: "15.Màu sắc",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 16,
//     name: "Shapes",
//     desc: "16.Hình dạng",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 17,
//     name: "Numbers",
//     desc: "17.Số đếm",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 18,
//     name: "Ordinal Numbers",
//     desc: "18.Số thứ tự",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 19,
//     name: "Days In A Week",
//     desc: "19.Ngày trong tuần",
//     img: "https://bit.ly/ryan-florence",
//   },
//   {
//     id: 20,
//     name: "Talking About Time",
//     desc: "20.Nói về thời gian",
//     img: "https://bit.ly/ryan-florence",
//   },
// ];
// interface PackageTierProps {
//   title: string;
//   options: Array<{ id: number; name?: string; url?: string }>;
//   name?: string;
//   checked?: boolean;
//   img: string;
// }
// const PackageTier = ({
//   title,
//   //   options,
//   //   typePlan,
//   name,
//   checked = false,
//   img,
// }: PackageTierProps) => {
//   const navigate = useNavigate();
//   const handleOnclickGetStartLearn = () => {
//     navigate("/start");
//   };
//   const colorTextLight = checked ? "white" : "purple.600";
//   const bgColorLight = checked ? "purple.400" : "gray.300";

//   const colorTextDark = checked ? "white" : "purple.500";
//   const bgColorDark = checked ? "purple.400" : "gray.300";

//   return (
//     <Stack
//       borderRadius={20}
//       background="gray.100"
//       p={3}
//       py={3}
//       ml={60}
//       mr={60}
//       justifyContent={{
//         base: "flex-start",
//         md: "space-around",
//       }}
//       direction={{
//         base: "column",
//         // md: "row",
//       }}
//       alignItems={{ md: "center" }}
//     >
//       <Avatar src={img} name={title} size="xl" />
//       <Heading size={"xl"}>{name}</Heading>
//       <Heading size={"2xs"}>{title}</Heading>

//       {/* <List spacing={3} textAlign="start">
//         {options.map((name) => (
//           <ListItem key={name.id}>
//             <ListIcon as={FaCheckCircle} color="green.500" />
//             {name.name}
//           </ListItem>
//         ))}
//       </List> */}

//       <Stack>
//         <Button
//           size="md"
//           color={useColorModeValue(colorTextLight, colorTextDark)}
//           bgColor={useColorModeValue(bgColorLight, bgColorDark)}
//           onClick={handleOnclickGetStartLearn}
//         >
//           Get Started
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };
// const LearnNewWords = () => {
//   return (
//     <Box py={6} px={5} width="full">
//       <Stack spacing={4} width={"100%"} direction={"column"}>
//         <Stack
//           background="yellow"
//           p={5}
//           alignItems={"center"}
//           justifyContent={{
//             base: "flex-start",
//             md: "space-around",
//           }}
//           direction={{
//             base: "column",
//             md: "row",
//           }}
//         >
//           <Stack
//             width={{
//               base: "100%",
//               md: "40%",
//             }}
//             textAlign={"center"}
//           >
//             <Heading size={"lg"}>
//               1000<Text color="purple.400">TỪ CƠ BẢN</Text>
//             </Heading>
//           </Stack>
//           <Stack
//             width={{
//               base: "100%",
//               md: "60%",
//             }}
//           >
//             <Text textAlign={"center"}>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
//               quod in iure vero. Facilis magnam, sed officiis commodi labore
//               odit.
//             </Text>
//           </Stack>
//         </Stack>
//         <>
//           <Divider />
//           {options.map((option) => (
//             <PackageTier
//               key={option.id}
//               title={option.desc}
//               name={option.name}
//               img={option.img}
//               options={options}
//             />
//           ))}
//           <Divider />
//         </>
//       </Stack>
//     </Box>
//   );
// };

// export default LearnNewWords;
