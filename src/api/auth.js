import axios from "axios";
import { Link } from "react-router-dom";

const instance = axios.create({ baseURL: "http://localhost:8080/auth/" });

export const registerAPI = async (data) => {
  console.log("회원가입 axios call!!");
  return await instance.post("register", data).then((response) => {
    console.log("회원가입 응답 !! : " + response);
  });
};

export const loginAPI = async (data) => {
  console.log("로그인 axios call!!");
  return await instance.post("login", data);
};

export const saveTokenAPI = async (token) => {
  localStorage.setItem("userToken", token);
};

export const getTokenAPI = async () => {
  const token = localStorage.getItem("userToken");
  return token !== null ? `Bearer ${token}` : "";
};

export const fetchToken = async () => {
  try {
    const headers = { Authorization: await getTokenAPI() }; //토큰 헤더에 추가

    const response = await instance.get("showMember", { headers });
    console.log(response);
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};

// 로그아웃 시 localStorage에서 토큰을 제거하는 함수
export const logoutAPI = () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    localStorage.removeItem("userToken");
  }
};
