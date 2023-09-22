import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/MyPage";
import ProductReview from "./pages/information/ProductReview";
import HospitalReview from "./pages/information/HospitalReview";
import Videoinfo from "./pages/information/Videoinfo";
import Lost from "./pages/Lost";
import LostDetail from "./pages/LostDeatail";

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
    path:"/lostdetail",
    element:<BLayout />,
    children: [{
      index : true,
      element:<LostDetail />
    }]
  }
  
]);

export default router;
