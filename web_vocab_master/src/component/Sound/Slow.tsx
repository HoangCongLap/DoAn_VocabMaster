import React from "react";
import useSound from "use-sound";
import { Button, Icon } from "@chakra-ui/react";
import { MdSlowMotionVideo } from "react-icons/md";
import { Vocabulary } from "../../data/Vocabulary";
interface Props {
  vocabulary: Vocabulary;
}
const Slow = ({ vocabulary }: Props) => {
  const [playbackRate, setPlaybackRate] = React.useState(0.5);
  const [play] = useSound(vocabulary.audio, {
    playbackRate,
    interrupt: true,
  });

  const handleClick = () => {
    setPlaybackRate(playbackRate);
    play();
  };

  return (
    <Button onClick={handleClick} borderRadius={"50px"} bg={"white"}>
      <Icon color={"Gold"} fontSize={25} as={MdSlowMotionVideo} />
    </Button>
  );
};
export default Slow;
