import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import ProductReview from "./pages/information/ProductReview";
import ProductReviewView from "./pages/information/ProductReviewView";
import ProductReviewCreate from "./pages/information/ProductReviewCreate";
import HospitalReview from "./pages/information/HospitalReview";
import Videoinfo from "./pages/information/Videoinfo";
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
      }
    ],
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
