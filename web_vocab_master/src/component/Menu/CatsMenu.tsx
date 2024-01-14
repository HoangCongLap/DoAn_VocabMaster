import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const CatsMenu = () => {
  return (
    // <Menu style={{ marginTop: "50%" }}>
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        style={{
          alignItems: "center",
          background: "red",
          borderRadius: "16px",
          cursor: "pointer",
          display: "flex",
          // padding: "30px",
        }}
      >
        Your Cats
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/100/100"
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <span>Fluffybuns the Destroyer</span>
        </MenuItem>
        <MenuItem minH="40px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/120/120"
            alt="Simon the pensive"
            mr="12px"
          />
          <span>Simon the pensive</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CatsMenu;
