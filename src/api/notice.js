import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getBoardsByPage = async (page) => {
  console.log("get page 로 게시글들 받아옴");
  let url = `notice?page=${page}`;

  return await instance.get(url);
};

export const getBoardViewAPI = async (code) => {
  return await instance.get(`notice/${code}`);
};

export const getCommentsAPI = async (code) => {
  let url = `notice/${code}/comment`;
  return await instance.get(url);
};

export const getReCommentsAPI = async (pCode) => {
  let url = `notice/comment/${pCode}`;
  return await instance.get(url);
};

//Lost Board 게시글 서버로 전송
export const addNoticeBoard = async (data) => {
  console.log("post로 DB에 게시글 저장 완료");
  return await instance.post("notice", data);
};

export const addCommentAPI = async (data) => {
  return await instance.post("notice/comment", data);
};

export const addImg = async (data) => {
  return await instance.post("img", data);
};
