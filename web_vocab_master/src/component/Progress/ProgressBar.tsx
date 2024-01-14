import { Progress } from "@chakra-ui/react";
interface Props {
  value: number;
}
function ProgressBar({ value }: Props) {
  return (
    <Progress
      mt={50}
      width={"80%"}
      height={"20px"}
      value={value}
      borderRadius={"10px"}
      // size="xs"
      colorScheme="green"
      backgroundColor="gray.300"
    />
  );
}

export default ProgressBar;
