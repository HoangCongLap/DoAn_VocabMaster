import { Stack } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router";
import { getAuthV2 } from "../../firebaseConfig";
import axios from "axios";
import { OverViewVocab } from "../../data/OverViewVocab";
import React from "react";
import StyledButton from "../StyledButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// const optionsOverviewVocab = [
//   {
//     level: 1,
//     count: 1,
//   },
//   {
//     level: 2,
//     count: 2,
//   },
//   {
//     level: 3,
//     count: 6,
//   },
//   {
//     level: 4,
//     count: 1,
//   },
//   {
//     level: 5,
//     count: 2,
//   },
//   {
//     level: 6,
//     count: 1,
//   },
//   {
//     level: 7,
//     count: 10,
//   },
// ];

export default function BarChart() {
  const navigate = useNavigate();
  const [overViewvocabularies, SetoverViewvocabularies] =
    React.useState<OverViewVocab>({
      overviewVocabs: [],
      practiceVocabCount: 0,
    });
  const auth = getAuthV2();
  const getDataOverView = async () => {
    const token = await auth?.currentUser?.getIdToken();
    axios
      .get<OverViewVocab>(
        "https://pi.nhalq.dev/kimochiapi/api/overviewvocabandprogress",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Overresponse.data", response.data);
        SetoverViewvocabularies(response.data);
      });
  };
  React.useEffect(() => {
    console.log("dsafd");
    if (auth?.currentUser) {
      getDataOverView();
    }
  }, [auth?.currentUser]);
  console.log("la", overViewvocabularies);
  const optionsOverviewVocab = overViewvocabularies.overviewVocabs;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  const labels = optionsOverviewVocab.map((item) => item.level.toString());

  const yValues = optionsOverviewVocab.map((item) => item.count);
  const barColors = [
    "#EB5757",
    "#FFCB08",
    "blue",
    "#FF9999",
    "#2F80ED",
    "#CC6600",
    "#213782",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: yValues,
        backgroundColor: barColors,
      },
    ],
  };

  const handleOnclickReview = () => {
    navigate("/load");
  };
  return (
    <div
      style={{
        minHeight: "92vh",
        display: "flex",
      }}
    >
      <Stack style={{ width: "70%", margin: "0 auto", marginTop: "120px" }}>
        <Bar options={options} data={data} />
        <p
          style={{
            justifyItems: "center",
            marginTop: "10px",
            fontSize: "20px",
            marginBottom: "30px",
            margin: "20px auto 0px",
          }}
        >
          Chuẩn bị ôn tập: {overViewvocabularies.practiceVocabCount} từ
        </p>

        <StyledButton onClick={handleOnclickReview}>ÔN TẬP NGAY</StyledButton>
      </Stack>
    </div>
  );
}
