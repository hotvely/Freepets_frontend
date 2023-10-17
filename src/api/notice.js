import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getBoardsBasic = async (page) => {
  console.log("get page 로 게시글들 받아옴");
  let url = `notice?page=1`;

  return await instance.get(url);
};

export const getBoardView = async (id) => {
  let url = `notice/post/${id}`;

  return await instance.get(url);
};

export const getComments = async (code) => {
  let url = `notice/${code}/comment`;
  return await instance.get(url);
};

//Lost Board 게시글 서버로 전송
export const addNoticeBoard = async (data) => {
  console.log("post로 DB에 게시글 저장 완료");
  return await instance.post("notice", data);
};

export const addNoticePostComment = async (data) => {
  return await instance.post("notice/comment", data);
};

export const addImg = async (data) => {
  return await instance.post("img", data);
};
