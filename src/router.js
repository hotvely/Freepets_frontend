import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BLayout from "./components/BLayout";
import MyPage from "./pages/member/MyPage";
import Lost from "./pages/Lost";
import Media from "./pages/Media";

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
    path: "/media",
    element: <BLayout />,
    children: [
      {
        index: true,
        element: <Media />,
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
    ],
  },
]);

export default router;
