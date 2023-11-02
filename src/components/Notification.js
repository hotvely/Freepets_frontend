import {
  addNotificationAPI,
  deleteNotificationAPI,
  getNotificationAPI,
} from "../api/auth";

/*
add할 때 들어 가야 하는 게시판 코드 사용법..
add에 넘겨야 하는 formData의 게시판 이름을             
1 community
2 lost
3 sitter
4 information
5 notice
로 넘기게 되면
*/

// --------------- 자유 게시판에서 알림 추가 하는법!!!
export const addCommunityNotification = async (formData) => {
  //data <- 유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 1,
    postCode: formData.postCode,
    commentCode: formData.commentCode,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

// --------------- 분실 게시판에서 알림 추가 하는법!!!
export const addLostNotification = async (formData) => {
  //data <- 유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 2,
    postCode: formData.postCode,
    commentCode: formData.commentCode,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

// --------------- 시터 게시판에서 알림 추가 하는법!!!
export const addSitterNotification = async (formData) => {
  //data <- 유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 3,
    postCode: formData.postCode,
    commentCode: formData.commentCode,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

// --------------- 병원 정보 게시판에서 알림 추가 하는법!!!
export const addhospitalRevieNotification = async (formData) => {
  //data <- 유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 4,
    postCode: formData.postCode,
    commentCode: formData.commentCode,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

export const addChatNotification = async (formData) => {
  //data <- 유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 6,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

// --------------- 공지사항 에서 알림 추가 하는법!!!
export const addNoticeNotification = async (formData) => {
  //data <- 전달할..유저id, 게시판 코드, 게시글 코드, 댓글 코드, 현재 게시글 url 링크 주소 들어 있어야 함
  console.log(formData);
  const data = {
    id: formData.id,
    boardCode: 5,
    postCode: formData.postCode,
    parentCommentCode: formData.pCommentCode,
    childCommentCode: formData.cCommentCode,
    url: formData.url,
  };
  console.log(data);
  return addNotificationAPI(data);
};

export const getNoticeNotification = async (token) => {
  return await getNotificationAPI(token);
};

export const deleteNoticeNotification = async (code) => {
  return await deleteNotificationAPI(code);
};
