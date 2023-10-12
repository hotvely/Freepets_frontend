import axios from "axios";
import { Link } from "react-router-dom";

const instance = axios.create({ baseURL: "http://localhost:8080/auth/" });

export const registerAPI = async (data) => {
  console.log("회원가입 axios call!!");
  return await instance.post("register", data);
};

export const loginAPI = async (data) => {
  console.log("로그인 axios call!!");
  return await instance.post("login", data);

  // API쪽에서 처리하니까.. 위쪽인 redux에서 처리가 안됨;;
  // await instance
  //   .post("login", data)
  //   .then((response) => {
  //     console.log(response);
  //     return response.data;
  //     // return response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     console.log("에러발생 ㅅㅂ");
  //     throw error;
  //   });
};

export const updateAPI = async (data) => {
  console.log("유저 정보 수정 api");
  return await instance.put("update", data);
};

export const deleteAPI = async (data) => {
  console.log("회원 탈퇴 API ");
  console.log(data);
  return await instance.put("delete", data);
};
