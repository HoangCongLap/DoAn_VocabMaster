"use client";
import { Box, Flex, Button, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "./Logo";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        sx={{ backgroundColor: "green.400" }}
        px={4}
        minWidth="100%"
        position="sticky"
        top="0"
        zIndex="100"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Logo />
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
