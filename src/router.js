import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import HLayout from "./components/HLayout";
import MyPage from "./pages/member/MyPage";
import HospitalReview from "./pages/information/HospitalReview";
import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import Logout from "./pages/member/Logout";
import MemberFindId from "./pages/member/MemberFindId";
import MemberFindPwd from "./pages/member/MemberFindPwd";
import Post from "./components/Post";
import CMediaList from "./pages/community/common/CMediaList";
import CommonList from "./pages/community/common/CommonList";
import CommonView from "./pages/community/common/CommonView";
import Notice from "./pages/notice/Notice";
import NoticeView from "./pages/notice/NoticeView";
import LMediaList from "./pages/community/lost/LMediaList";
import LostView from "./pages/community/lost/LostView";
import UpdatePost from "./components/UpdatePost";
import HospitalReviewView from "./pages/information/HospitalReviewView";
import EventCalendar from "./pages/notice/EventCalendar";
import UserPage from "./pages/member/UserPage";
import NoticeList from "./pages/notice/NoticeList";
import Chatting from "./pages/Chatting";
import TotalSearch from "./pages/TotalSearch";
import Header from "./components/Header";
import KakaoPostAPI from "./pages/member/KakaoPostAPI";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/main",
    element: <HLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/totalSearch",
    element: <HLayout />,
    children: [
      {
        index: true,
        element: <TotalSearch />,
      },
      {
        path: "?search=:search",
        element: <TotalSearch />,
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
    path: "/userpage/:id",
    element: <BLayout />,
    children: [{ index: true, element: <UserPage /> }],
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
        path: "?page=:page",
        element: <Notice />,
      },
      {
        path: "update/:boardCode/:postCode",
        element: <UpdatePost />,
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
    path: "/hospital",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <HospitalReview />,
      },
      {
        path: "?page=:page",
        element: <HospitalReview />,
      },
      {
        path: "create",
        element: <Post />,
      },
      {
        path: "view/:code",
        element: <HospitalReviewView />,
      },
      {
        path: ":postCode/update/:boardCode",
        element: <UpdatePost />,
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
            path: "cmedialist/:ListBtn",
            element: <CMediaList />,
          },
          {
            path: "commonlist",
            element: <CommonList />,
          },
          {
            path: "commonview/:code/:ListBtn",
            element: <CommonView />,
          },
          {
            path: "create",
            element: <Post />,
          },
          {
            path: ":postCode/update/:boardCode",
            element: <UpdatePost />,
          },
        ],
      },
      {
        path: "lost",
        children: [
          {
            index: true,
            element: <LMediaList />,
          },
          {
            path: "lostList",
            element: <LMediaList />,
          },
          {
            path: "lostview/:code",
            element: <LostView />,
          },
          {
            path: "create",
            element: <Post />,
          },
          {
            path: ":postCode/update/:boardCode",
            element: <UpdatePost />,
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
        path: "?page=:page",
        element: <Sitter />,
      },
      {
        path: "view/:code",
        element: <SitterView />,
      },
      {
        path: ":postCode/update/:boardCode",
        element: <UpdatePost />,
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
      {
        path: "API",
        element: <KakaoPostAPI />,
      },
    ],
  },
  {
    path: "/chatting/:id",
    element: <Chatting />,
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
