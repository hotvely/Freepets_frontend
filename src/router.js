import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import MyPage from "./pages/member/MyPage";
import HospitalReview from "./pages/information/HospitalReview";

import HospitalReviewCreate from "./pages/information/HospitalReviewCreate";

import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
import SitterCreate from "./pages/sitter/SitterCreate";
import Media from "./pages/community/Media";
import Lost from "./pages/community/Lost";
// import LostDetail from "./pages/LostDeatail";
import EventCalendar from "./pages/EventCalendar";
import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
// import Header from "./components/Header";
import Logout from "./pages/member/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/main",
    element: <Home />,
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
    path: "/lost",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Lost />,
      },
    ],
  },

  {
    path: "/information",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <HospitalReview />,
      },
      {
        path: "hospital",
        element: <HospitalReview />,
      },
      {
        path: "hospital/create",
        element: <HospitalReviewCreate />,
      },
    ],
  },
  {
    path: "/media",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Media />,
      },
    ],
  },
  {
    path: "/sitter",

    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Sitter />,
      },
      {
        path: "view",
        element: <SitterView />,
      },
      {
        path: "create",
        element: <SitterCreate />,
      },
    ],
  },
  {
    path: "/event",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <EventCalendar />,
      },
    ],
  },

  {
    path: "/auth",
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
