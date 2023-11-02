import axios from "axios";
import { Link } from "react-router-dom";

const instance = axios.create({ baseURL: "http://localhost:8080/auth/" });

export const getMemberByIdAPI = async (id) => {
  return await instance.get(`findMember/${id}`);
};

export const registerAPI = async (data) => {
  return await instance.post("register", data);
};

export const loginAPI = async (data) => {
  const response = await instance.post("login", data);
  return await response;
};

export const findIdAPI = async (data) => {
  return await instance.post("findId", data);
};

export const findPwdAPI = async (data) => {
  return await instance.post("findPwd", data);
};

export const updateAPI = async (data) => {
  return await instance.put("update", data);
};

export const deleteAPI = async (data) => {
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
