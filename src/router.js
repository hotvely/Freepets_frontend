import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import BLayout from "./components/BLayout";
import BoardTest from "./pages/BoardTest";

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
]);

export default router;
