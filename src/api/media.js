import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getMediaList = async (page) => {
  let url = `community?page=${page}`;
  return await instance.get(url);
};

export const getMedia = async (id) => {
  let url = `community/${id}`;
  return await instance.get(url);
};
