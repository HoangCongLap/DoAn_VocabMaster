import useSound from "use-sound";
import { Button, Icon } from "@chakra-ui/react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { Vocabulary } from "../../data/Vocabulary";
interface Props {
  vocabulary: Vocabulary;
}
const UseSound = ({ vocabulary }: Props) => {
  const [play] = useSound(vocabulary.audio, {
    interrupt: true,
  });
  const handleClick = () => {
    play();
  };

  return (
    <Button onClick={handleClick} borderRadius={"50px"} bg={"white"}>
      <Icon color={"Gold"} fontSize={25} as={IoVolumeHighSharp} />
    </Button>
  );
};
export default UseSound;
