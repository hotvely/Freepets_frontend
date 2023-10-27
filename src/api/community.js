import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCommunityList = async (page, orderBy) => {
  console.log("오고 있니....");
  console.log(orderBy);
  let url = `community?page=${page}&orderBy=${orderBy}`;
  return await instance.get(url);
};

export const getSearchCommunityList = async (
  page,
  searchKeyword,
  searchType
  // orderBy
) => {
  console.log("searchType" + searchType);
  console.log("page" + page);
  console.log("searchKeyword" + searchKeyword);
  // console.log("orderBy" + orderBy);
  let url = `community/search?page=${page}&searchKeyword=${searchKeyword}&searchType=${searchType}`;
  return await instance.get(url);
};

export const getCommunity = async (id) => {
  let url = `community/${id}`;
  return await instance.get(url);
};

export const addCommunity = async (data) => {
  console.log("글쓰기 데이터 갔냐고...");
  console.log(data);
  return await instance.post("community", data);
};

export const updateCommunity = async (data) => {
  return await instance.put("community", data);
};

export const deleteCommunity = async (id) => {
  console.log("삭제 됐나?");
  return await instance.delete(`community/${id}`);
};
