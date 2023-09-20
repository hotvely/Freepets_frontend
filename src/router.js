import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";
import MyPage from "./pages/MyPage";
import Lost from "./pages/Lost";

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
        path:"mypage",
        element: <MyPage />,
      },
      {
        path : "lost",
        element:<Lost/>
      }
    ],
  },
 
]);

export default router;
