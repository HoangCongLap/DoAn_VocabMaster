// lật bóng của từ vựng ./learn
import React, { useState } from "react";
import { Vocabulary } from "../../data/Vocabulary";
import { Image, Stack } from "@chakra-ui/react";
interface Props {
  vocabulary: Vocabulary;
  onFlip: () => void;
}

const FlipItemShadow = ({ vocabulary, onFlip }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCliked, setIsCliked] = useState(false);
  const handleToggle = () => {
    setIsFlipped(!isFlipped);
    setIsCliked(!isCliked);
    onFlip();
  };
  setTimeout(() => {
    if (isFlipped == false && isCliked == false) {
      setIsFlipped(true);
      onFlip();
    }
  }, 8000);
  const cardStyle: React.CSSProperties = {
    width: "100%",
    minWidth: "300px",
    height: "430px",
    perspective: "1000px",
    transformStyle: "preserve-3d",
    transition: "transform 0.5s",
    cursor: "pointer",
    transform: isFlipped ? "rotateY(180deg)" : "none",
    // margin: "auto",
    // position: "absolute",
    // top: "50px",
    // left: "50%",
  };

  const frontStyle: React.CSSProperties = {
    width: "100%",
    height: "90%",
    position: "relative",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    background: "white",
    color: "black",
    borderRadius: "10px",
    textAlign: "center",
    flexDirection: "column",
    border: isFlipped ? "2px solid red" : "none",
  };

  const backStyle: React.CSSProperties = {
    width: "100%",
    height: "90%",
    position: "absolute",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    background: "white",
    color: "black",
    borderRadius: "10px",
    transform: isFlipped ? "rotateY(180deg)" : "backStyle",
    textAlign: "center",
    flexDirection: "column",
    border: isFlipped ? "2px solid red" : "none",
  };
  const imgaPointer = (
    <div
      style={{
        position: "absolute",
        width: "33px",
        zIndex: 2,
        bottom: 0,
        right: 0,
      }}
    >
      <img
        src="https://learn.mochidemy.com/image/aa189bbb8bf83e974d5b39e2934ff2eb.png"
        alt="Pointer"
      ></img>
    </div>
  );
  return (
    <div style={cardStyle} onClick={handleToggle}>
      <div style={backStyle}>
        {imgaPointer}
        <p
          style={{
            fontWeight: "bold",
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "45px",
          }}
        >
          {vocabulary.content}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "15px",
            lineHeight: "45px",
            marginTop: "18px",
          }}
        >
          {vocabulary.phonetic}
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontStyle: "normal",
            fontSize: "15px",
            lineHeight: "45px",
            marginTop: "18px",
          }}
        >
          {vocabulary.trans}
        </p>
        <p style={{ textAlign: "center" }}></p>
      </div>
      <div style={frontStyle}>
        {imgaPointer}
        <Stack direction="row">
          <Image boxSize="250px" src={vocabulary.picture} />
        </Stack>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "30px",
            marginTop: "30px",
            marginBottom: "1rem",
          }}
        >
          {vocabulary.en_hint}
        </p>
      </div>
    </div>
  );
};

export default FlipItemShadow;
