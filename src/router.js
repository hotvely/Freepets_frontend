import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/MyPage";
import ProductReview from "./pages/information/ProductReview";
import HospitalReview from "./pages/information/HospitalReview";
import Videoinfo from "./pages/information/Videoinfo";
import MyCalendar from "./pages/MyCalendar";

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
        element: <BoardTest />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "product",
        element: <ProductReview />,
      },
      {
        path: "hospital",
        element: <HospitalReview />,
      },
      {
        path: "videoinfo",
        element: <Videoinfo />,
      },
      {
        path: "calendar",
        element: <MyCalendar />,
      },
    ],
  },
]);

export default router;
