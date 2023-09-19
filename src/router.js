import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Mypage from "./pages/Mypage";
import BLayout from "./components/BLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/main",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
