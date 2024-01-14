import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const CourseMenu = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            style={{
              marginBottom: "100x",
            }}
          >
            {isOpen ? "Close" : "Open"}
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => alert("Kagebunshin")}>
              Create a Copy
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default CourseMenu;
