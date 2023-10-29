import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getBoardsByPageAPI = async (page, sortNum) => {
  let url = `notice?page=${page}&sortNum=${sortNum}`;
  return await instance.get(url);
};

export const getBoardViewAPI = async (code) => {
  let url = `notice/${code}`;
  return await instance.get(url);
};

export const getSearchAPI = async (page, keyword, sortNum) => {
  let url = `notice/search/${keyword}/${sortNum}?page=${page}`;
  return await instance.get(url);
};

export const getCommentsAPI = async (postCode) => {
  let url = `notice/${postCode}/comments`;
  return await instance.get(url);
};

export const getCommentAPI = async (code) => {
  return await instance.get(`notice/comment/${code}`);
};

export const getReCommentsAPI = async (pCode) => {
  let url = `notice/comment/${pCode}`;
  return await instance.get(url);
};

export const getEventAPI = async (year) => {
  return await instance.get(`event?year=${year}`);
};

//Lost Board 게시글 서버로 전송
export const addNoticeBoard = async (data) => {
  console.log("post로 DB에 게시글 저장 완료");
  console.log(data);
  return await instance.post("notice", data);
};

export const addCommentAPI = async (data) => {
  return await instance.post("notice/comment", data);
};

export const addImg = async (data) => {
  return await instance.post("img", data);
};

export const addEvent = async (data) => {
  return await instance.post("event", data);
};

export const deleteNoticeAPI = async (code) => {
  console.log("삭제 비동 API@@@;");
  return await instance.delete(`notice/${code}`);
};

export const updateNoticeAPI = async (data) => {
  return await instance.put("notice", data);
};

export const updateCommentAPI = async (data) => {
  console.log("UpdateCommentAPI 시작");
  return await instance.put("notice/comment", data);
};

export const updateLikeNoticeAPI = async (data) => {
  return await instance.post("notice/like", data);
};

export const deleteCommentAPI = async (code) => {
  console.log(code);
  return await instance.delete(`notice/comment/${code}`);
};
