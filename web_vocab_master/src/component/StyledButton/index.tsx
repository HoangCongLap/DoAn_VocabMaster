import { Button } from "@chakra-ui/react";

export interface Props {
  disable?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = ({ disable = false, children, onClick }: Props) => {
  return (
    <Button
      background={
        disable
          ? "gray.200"
          : "linear-gradient(83deg, #58cc02 19.02%, #23ac38 90.81%)"
      }
      boxShadow={disable ? "gray" : "0 6px 0 0 #209b32"}
      _hover={{
        background: disable
          ? "gray.200"
          : "linear-gradient(83deg, #7bea00 9.02%, #2fbf33 90.81%)",
      }}
      fontSize={"20px"}
      height={"50px"}
      width={"250px"}
      color={"#fff"}
      borderRadius={"50px"}
      margin={"50px auto 0"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default StyledButton;
