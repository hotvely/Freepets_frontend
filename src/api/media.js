import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/media",
});

export const getMedia = async () => {
  return await instance.get(id);
};
