// import { Vocabulary } from "../../data/Vocabulary";

import { Vocabulary } from "../../data/Vocabulary";

interface Props {
  vocabulary: Vocabulary;
}

const WrongAnswer = ({ vocabulary }: Props) => {
  return (
    <div
      style={{
        left: "50px",
        width: "100%",
        height: "200px",
        backgroundColor: "#EB5757",
        display: "flex",
        justifyContent: "center",
        fontSize: "16px",
        color: "white",
        borderRadius: "20px",
        flexDirection: "column",
        marginTop: "30px",
      }}
    >
      <div style={{ marginLeft: "40px" }}>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {vocabulary.content}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "18px",
          }}
        >
          {vocabulary.phonetic}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "45px",
          }}
        >
          {vocabulary.trans}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "45px",
          }}
        >
          {vocabulary.en_hint}
        </p>
      </div>
    </div>
  );
};

export default WrongAnswer;
