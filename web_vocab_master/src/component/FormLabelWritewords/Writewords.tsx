import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import WrongAnswer from "../WrongAnswer/WrongAnswer";
import { Vocabulary } from "../../data/Vocabulary";

interface Props {
  vocabulary: Vocabulary;
  onSucces: () => void;
}

const Writewords = ({ vocabulary, onSucces }: Props) => {
  const [heardWords, setHeardWords] = useState("");
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);

  const handleOnClickCheckWords = () => {
    if (heardWords) {
      const isMatch = vocabulary.content === heardWords;
      if (isMatch) {
        onSucces();
      } else if (showWrongAnswer == true) {
        onSucces();
      } else {
        toast.error("Nhập từ không đúng");
        setShowWrongAnswer(true);
      }
    }
  };
  return (
    <>
      <Stack
        style={{
          width: "100%",
          marginTop: "10px",
          minWidth: "160%",
        }}
      >
        <FormControl id="heardWords">
          <p
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Nghe và viết lại
          </p>
          {/* <UseSound vocabulary={vocabulary.audio} /> */}

          <Input
            autoFocus
            style={{
              // width: "70%",
              background: "white",
              color: "black",
              marginTop: "40px",
              fontSize: "17px",
              borderRadius: "20px",
            }}
            placeholder="Gõ lại từ bạn đã nghe được"
            type="heardWords"
            value={heardWords}
            onChange={(e) => setHeardWords(e.target.value)}
          />
        </FormControl>
      </Stack>
      <div style={{ width: "200%", marginTop: "30px" }}>
        {showWrongAnswer && <WrongAnswer vocabulary={vocabulary} />}
      </div>
      <Button
        background={
          !heardWords
            ? "gray.200"
            : "linear-gradient(83deg, #58cc02 19.02%, #23ac38 90.81%)"
        }
        boxShadow={!heardWords ? "gray" : "0 6px 0 0 #209b32"}
        _hover={{
          background: !heardWords
            ? "gray.200"
            : "linear-gradient(83deg, #7bea00 9.02%, #2fbf33 90.81%)",
        }}
        fontSize={"20px"}
        height={"50px"}
        width={"250px"}
        color={"#fff"}
        borderRadius={"50px"}
        marginTop={"60px"}
        onClick={handleOnClickCheckWords}
      >
        Kiểm tra
      </Button>
    </>
  );
};

export default Writewords;
