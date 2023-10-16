import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import MyPage from "./pages/member/MyPage";
import HospitalReview from "./pages/information/HospitalReview";
import HospitalReviewCreate from "./pages/information/HospitalReviewCreate";
import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
import SitterCreate from "./pages/sitter/SitterCreate";
// import LostDetail from "./pages/LostDeatail";
import EventCalendar from "./pages/EventCalendar";
import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
// import Header from "./components/Header";
import Logout from "./pages/member/Logout";
import MemberFindId from "./pages/member/MemberFindId";
import MemberFindPwd from "./pages/member/MemberFindPwd";
import Post from "./components/Post";

import CMediaList from "./pages/community/common/CMediaList";
import CommonCreate from "./pages/community/common/CommonCreate";
import CommonList from "./pages/community/common/CommonList";
import CommonView from "./pages/community/common/CommonView";
import LMediaList from "./pages/community/lost/LMediaList";
import LostCreate from "./pages/community/lost/LostCreate";
import LostList from "./pages/community/lost/LostList";
import LostView from "./pages/community/lost/LostView";

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
        element: <Post />,
      },
    ],
  },
  {
    path: "/community",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <CMediaList />,
      },
      {
        path: "common",
        element: <BLayout />, // Common의 레이아웃
        children: [
          {
            path: "cmedialist",
            element: <CMediaList />,
          },
          {
            path: "commonlist",
            element: <CommonList />,
          },
          {
            path: "commonview/:id",
            element: <CommonView />,
          },
          {
            path: "commoncreate",
            element: <CommonCreate />,
          },
        ],
      },
      {
        path: "lost",
        element: <BLayout />, // Lost의 레이아웃
        children: [
          {
            index: true,
            element: <LMediaList />,
          },
          {
            path: "lmedialist",
            element: <LMediaList />,
          },
          {
            path: "lostList",
            element: <LostList />,
          },
          {
            path: "lostview/:id",
            element: <LostView />,
          },
          {
            path: "lostcreate",
            element: <LostCreate />,
          },
        ],
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
        element: <Post />,
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
      {
        path: "findId",
        element: <MemberFindId />,
      },
      {
        path: "findPwd",
        element: <MemberFindPwd />,
      },
    ],
  },
  {
    path: "/test",
    children: [
      {
        index: true,
        element: <Post />,
      },
    ],
  },
]);

export default router;
