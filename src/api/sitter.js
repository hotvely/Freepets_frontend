import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getBoardsBasic = async (page) => {
  let url = `sitter?page=${page}`;
  return await instance.get(url);
};

export const getBoardView = async (id) => {
  let url = `sitter/${id}`;
  return await instance.get(url);
};

export const getReviews = async (id) => {
  let url = `sitter/${id}/review`;
  return await instance.get(url);
};

export const addSitterBoard = async (data) => {
  return await instance.post("sitter", data);
};

export const addImg = async (data) => {
  return await instance.post("img", data);
};