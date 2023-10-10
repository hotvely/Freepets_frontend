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
