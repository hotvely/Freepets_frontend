import ReactDOM from "react-dom/client";
import { RouterProvider, useLocation } from "react-router-dom";
import Router from "./router";
import "./assets/reset.css";
import { Provider, useSelector } from "react-redux";
import store from "./components/store";
import { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const Root = () => {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setIsRender(false);
  }, []);

  useEffect(() => {
    if (!isRender) {
      console.log("isRender == false");
      const script1 = document.createElement("script");
      script1.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=7t48wvf7nm";
      script1.async = true;
      script1.onload = () => {
        setIsRender(true);
      };
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=7t48wvf7nm&submodules=geocoder";
      script2.async = true;
      script2.onload = () => {
        setIsRender(true);
      };
      document.head.appendChild(script2);
    } else {
      console.log("isRender == true");
    }
  }, [isRender]);

  return (
    <Provider store={store}>
      {isRender ? <RouterProvider router={Router} /> : null}
    </Provider>
  );
};
// const [aaa, bb] = useState();

// const script1 = document.createElement("script");
// const script2 = document.createElement("script");
// script1.src =
//   "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=7t48wvf7nm";
// script1.async = true;
// script1.onload = () => {
//   isRender = true;
// };
// document.body.appendChild(script1);

// //좌표 변환 시키는 API 추가
// script2.src =
//   "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=7t48wvf7nm&submodules=geocoder";
// script2.async = true;
// script2.onload = () => {
//   isRender = true;
// };
// document.body.appendChild(script2);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);
