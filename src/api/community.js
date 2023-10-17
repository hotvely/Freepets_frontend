import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCommunityList = async (page) => {
  let url = `community?page=${page}`;
  return await instance.get(url);
};

export const getCommunity = async (id) => {
  let url = `community/${id}`;
  return await instance.get(url);
};

export const addCommunity = async (data) => {
  return await instance.post("community", data);
};
