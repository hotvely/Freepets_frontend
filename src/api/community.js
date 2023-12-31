import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCommunityList = async (page, orderBy) => {
  let url = `community?page=${page}&orderBy=${orderBy}`;
  return await instance.get(url);
};
export const getSearchCommunityList = async (
  page,
  searchKeyword,
  searchType
) => {
  let url = `community/search?page=${page}&searchKeyword=${searchKeyword}&searchType=${searchType}`;
  return await instance.get(url);
};

export const getCommunity = async (id) => {
  let url = `community/${id}`;
  return await instance.get(url);
};
export const getCommentsAPI = async (postCode) => {
  let url = `community/${postCode}/comments`;
  return await instance.get(url);
};
export const getCommentAPI = async (code) => {
  return await instance.get(`community/comment/${code}`);
};
// export const getReCommentsAPI = async (pCode) => {
//   let url = `community/comment/${pCode}`;
//   return await instance.get(url);
// };

export const addCommunity = async (data) => {
  return await instance.post("community", data);
};

export const addCommunityComment = async (data) => {
  return await instance.post("community/comment", data);
};

export const updateCommunity = async (data) => {
  return await instance.put("community", data);
};

export const updateCommentAPI = async (data) => {
  return await instance.put("community/comment", data);
};

export const updateCommunityLike = async (data) => {
  return await instance.post("community/like", data);
};

export const deleteCommunity = async (id) => {
  return await instance.delete(`community/${id}`);
};

export const deleteCommunityComment = async (code) => {
  return await instance.delete(`/community/comment/${code}`);
};

// 분실 게시판
export const getLostList = async (page, orderBy) => {
  let url = `community/lost?page=${page}&orderBy=${orderBy}`;
  return await instance.get(url);
};

export const getLostAPI = async (id) => {
  let url = `community/lost/${id}`;
  return await instance.get(url);
};

export const getSearchLostList = async (
  page,
  searchKeyword,
  searchType,
  orderBy
) => {
  let url = `community/lost/search?page=${page}&orderBy=${orderBy}&searchKeyword=${searchKeyword}&searchType=${searchType}`;
  return await instance.get(url);
};

export const addLostAPI = async (data) => {
  return await instance.post("community/lost", data);
};

export const updateLostAPI = async (data) => {
  return await instance.put("community/lost", data);
};

export const updateLostLike = async (data) => {
  return await instance.post("community/lost/like", data);
};

export const deleteLostAPI = async (id) => {
  return await instance.delete(`community/lost/${id}`);
};

export const getLostCommentsAPI = async (postCode) => {
  let url = `community/lost/${postCode}/comments`;
  return await instance.get(url);
};
export const getLostCommentAPI = async (code) => {
  return await instance.get(`community/lost/comment/${code}`);
};
export const getLostReCommentsAPI = async (pCode) => {
  let url = `community/lost/comment/${pCode}`;
  return await instance.get(url);
};

export const addLostCommentAPI = async (data) => {
  return await instance.post("community/lost/comment", data);
};

export const updateLostCommentAPI = async (data) => {
  return await instance.put("community/lost/comment", data);
};

export const deleteLostCommentAPI = async (code) => {
  return await instance.delete(`community/lost/comment/${code}`);
};
