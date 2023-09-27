import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/member/MyPage";
import ProductReview from "./pages/information/ProductReview";
import ProductReviewView from "./pages/information/ProductReviewView";
import ProductReviewCreate from "./pages/information/ProductReviewCreate";
import HospitalReview from "./pages/information/HospitalReview";
import HospitalReviewView from "./pages/information/HospitalReviewView";
import HospitalReviewCreate from "./pages/information/HospitalReviewCreate";
import Videoinfo from "./pages/information/Videoinfo";
import VideoinfoView from "./pages/information/VideoinfoView";
import VideoinfoCreate from "./pages/information/VideoinfoCreate";
import Sitter from "./pages/sitter/Sitter";
import SitterView from "./pages/sitter/SitterView";
import HLayout from "./components/HLayout";
import Chatting from "./pages/Chatting";

import Lost from "./pages/Lost";
import LostDetail from "./pages/LostDeatail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/information",
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
        element: <ProductReview />,
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
      {
        path: "product/view",
        element: <ProductReviewView />,
      },
      {
        path: "product/create",
        element: <ProductReviewCreate />,
      },
    ],
  },
  {
    path: "/test",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Lost />,
      },
      {
        path: "videoinfo",
        element: <Videoinfo />,
      },
      {
        path: "videoinfo/view",
        element: <VideoinfoView />,
      },
      {
        path: "videoinfo/create",
        element: <VideoinfoCreate />
      },
      {
        path: "hospital",
        element: <HospitalReview />
      },
      {
        path: "hospital/view",
        element: <HospitalReviewView />
      },
      {
        path: "hospital/create",
        element: <HospitalReviewCreate />
      }
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
        element: <SitterView/>
      }
    ]
  },
  {
    path: "/chatting",
    element: <HLayout />,
    children: [
      {
        index: true,
        element: <Chatting />,
      }
    ]
  }
]);

export default router;
