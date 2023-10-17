import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import MyPage from "./pages/member/MyPage";
import HospitalReview from "./pages/information/HospitalReview";
import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
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
import Notice from "./pages/notice/Notice";
import NoticeView from "./pages/notice/NoticeView";

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
    path: "/notice",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Notice />,
      },
      {
        path: "create",
        element: <Post />,
      },
      {
        path: "noticeView/:code",
        element: <NoticeView />,
      },
      {
        path: "event",
        element: <EventCalendar />,
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
