import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/api/info/",
});
export const getHospitalBoard = async (page) => {
  let url = `hr?page=${page}`;
  return await instance.get(url);
};

export const getOneBoard = async (code) => {
  let url = `hr/${code}`;
  return await instance.get(url);
}

export const addHospitalBoard = async (data) => {
  return await instance.post("hr", data);
};

export const getsearchSelect = async (page, keyword, select) => {
  let url = `hr/search?page=${page}&keyword=${keyword}&select=${select}`
  return await instance.get(url);
}

export const likeAddorDelete = async (data) => {
  return await instance.post("hr/like", data);
}

export const getLikeOrder = async (page) => {
  let url = `hr/orderlike?page=${page}`;
  return await instance.get(url);
}

export const getCommentOrder = async (page) => {
  let url = `hr/ordercomment?page=${page}`;
  return await instance.get(url);
}

export const deleteBoard = async (id) => {
  let url = `hr/${id}`
  return await instance.delete(url);
}
