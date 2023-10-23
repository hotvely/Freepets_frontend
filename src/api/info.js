import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/api/info/",
});
export const getHospitalBoard = async (page) => {
  let url = `hr?page=${page}`;
  return await instance.get(url);
};
export const addHospitalBoard = async (data) => {
  return await instance.post("hr", data);
};

export const getsearchSelect = async (page, keyword, select) => {
  let url = `hr/search?page=${page}&keyword=${keyword}&select=${select}`
  return await instance.get(url);
}
