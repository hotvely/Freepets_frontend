import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/member/MyPage";
import ProductReview from "./pages/information/ProductReview";
import HospitalReview from "./pages/information/HospitalReview";
import HospitalReviewCreate from "./pages/information/HospitalReviewCreate";
import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
import Chatting from "./pages/Chatting";
import SitterCreate from "./pages/sitter/SitterCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/main",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/mypage",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/information",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <HospitalReview />
      },
      {
        path: "hospital",
        element: <HospitalReview />
      },
      {
        path: "hospital/create",
        element: <HospitalReviewCreate/>
      }
    ]
  },
  {
    path: "/sitter",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Sitter />
      },
      {
        path: "view",
        element: <SitterView/> 
      },
      {
        path: "create",
        element: <SitterCreate/>
      }
    ]
  }
]);

export default router;
