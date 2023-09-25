import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/member/MyPage";
import ProductReview from "./pages/information/ProductReview";
import HospitalReview from "./pages/information/HospitalReview";
import Videoinfo from "./pages/information/Videoinfo";
import Lost from "./pages/Lost";
import LostDetail from "./pages/LostDeatail";
import EventCalendar from "./pages/EventCalendar";

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
    path: "/community",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Lost />,
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
]);

export default router;
