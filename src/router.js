import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
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
        element: <ProductReview />,
      },
      {
        path: "product",
        element: <ProductReview />
      },
      {
        path: "product/view",
        element: <ProductReviewView />,
      },
      {
        path: "product/create",
        element: <ProductReviewCreate />,
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
  }
]);

export default router;
