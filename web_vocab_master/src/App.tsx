import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Nav from "./component/Nav";
import Learning from "./pages/LearningVocab";
import LessonVocab from "./pages/LessonVocab";
import { ToastContainer } from "react-toastify";
import CatsMenu from "./component/Menu/CatsMenu";
import Hstack from "./component/Stack/Hstack";
import BarChart from "./component/Chart/BarChart";
import ReviewAnswer from "./pages/ReviewAnswer";
import BoxAnswer from "./component/Boxx/BoxAnswer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { setupFirebase } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EndOfLesson from "./component/EndOfLessoning/EndOfLesson";
import EndOfReviewAnswer from "./component/EndOfReviewAnswer/EndOfReviewAnswer";
import NoteBook from "./pages/NoteBook";
import LoaderByTimlmit from "./component/LoaderByTimlmit/LoaderByTimlmit";
import LabCourse from "./component/LabCourse/LabCourse";
import Profile from "./component/Profile/Profile";
// import Logincss from "./pages/Logincss/Logincss";

const router = createBrowserRouter([
  {
    path: "/lessonvocab/:courseId",
    element: (
      <Hstack children={<LessonVocab />} childrenRight={<LabCourse />} />
    ),
  },
  {
    path: "/learning/:courseId/:lessionId",
    element: <Learning />,
  },
  {
    path: "menu",
    element: <CatsMenu />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "nav",
    element: <Nav />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "review",
    element: (
      <Hstack>
        <BarChart />
      </Hstack>
    ),
  },
  {
    path: "reviewAnswer",
    element: (
      <Hstack>
        <ReviewAnswer />
      </Hstack>
    ),
  },
  {
    path: "notebook",
    element: (
      <Hstack>
        <NoteBook />
      </Hstack>
    ),
  },
  {
    path: "/endofreview/:length/:value",
    element: <EndOfReviewAnswer />,
  },
  //=========== test
  // {
  //   path: "H",
  //   element: <Hstackk />,
  // },

  {
    path: "chart",
    element: <BarChart />,
  },
  {
    path: "box",
    element: <BoxAnswer />,
  },
  {
    path: "drawer",
    // element: <DrawerCourse />,
  },
  // {
  //   path: "wrong",
  //   element: <WrongAnswer />,
  // },
  {
    path: "endoflesson",
    element: <EndOfLesson />,
  },
  {
    path: "lab",
    element: <LabCourse />,
  },
  {
    path: "load",
    element: (
      <Hstack>
        <LoaderByTimlmit />
      </Hstack>
    ),
  },

  {
    path: "profile",
    element: <Profile />,
  },
  // {
  //   path: "logg",
  //   element: <Logincss />,
  // },
]);
function App() {
  const [indexState, setIndexState] = useState(0);
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();
    onAuthStateChanged(auth, () => {
      setIndexState(indexState + 1);
    });
  }, []);
  return (
    <ChakraProvider key={indexState}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
