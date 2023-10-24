import axios from "axios";
import { Link } from "react-router-dom";

const instance = axios.create({ baseURL: "http://localhost:8080/auth/" });

export const getMemberByIdAPI = async (id) => {
  return await instance.get(`findMember/${id}`);
};

export const registerAPI = async (data) => {
  console.log("회원가입 axios call!!");
  return await instance.post("register", data);
};

export const loginAPI = async (data) => {
  console.log("로그인 axios call!!");
  return await instance.post("login", data);
};

export const findIdAPI = async (data) => {
  console.log("아이디 찾기 axios call");
  return await instance.post("findId", data);
};

export const findPwdAPI = async (data) => {
  console.log("비밀번호 찾기 axios call");
  return await instance.post("findPwd", data);
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

export const getNotificationAPI = async (token) => {
  const url = `noti/${token}`;
  return await instance.get(url);
};

export const addNotificationAPI = async (data) => {
  return await instance.post("noti/register", data);
};

export const deleteNotificationAPI = async (code) => {
  return await instance.delete(`noti/${code}`);
};
