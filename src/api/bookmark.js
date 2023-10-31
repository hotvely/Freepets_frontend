import axios from "axios";
import { Link } from "react-router-dom";

const instance = axios.create({ baseURL: "http://localhost:8080/api/" });

export const addBookmarkAPI = async (data) => {
  console.log("북마크 등록 axios call!!");
  return await instance.post("bookmark", data);
};

export const getBookmarkAPI = async (token) => {
  return await instance.get(`bookmark/${token}`);
};

export const deleteBookmarkAPI = async (code) => {
  console.log("북마크 삭제" + code);
  return await instance.delete(`bookmark/${code}`);
};
