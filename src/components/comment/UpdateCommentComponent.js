import { useState } from "react";
import { updateCommentAPI } from "../../api/notice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userLogout } from "../store/userSlice";
import { getTokenCookie } from "../../api/cookie";

const Styled = styled.div`
  margin-top: 20px;
  input {
    width: 500px;
    border: 1px solid #ededed;
    border-radius: 10px;
    background-color: white;
    color: black;

    margin: 0;
    padding: 10px 20px;
    margin-right: 20px;
  }
  button {
    width: 40px;
    height: 35px;
    border: 0;
    padding: 5px;
    border-radius: 5px;
    background-color: #84afc1;
    color: white;
  }
`;

const UpdateCommentComponent = (props) => {
  // const [content, setContent] = useState();
  let content = "";
  const code = props.code;
  const writerId = props.writer;
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const contentHandler = (e) => {
    content = e.target.value;
  };

  const updateComment = async () => {
    console.log(content);
    const formData = {
      commentCode: code,
      commentDesc: content,
    };

    console.log(formData);
    const result = await updateCommentAPI(formData);
    console.log("updateCommentComponent updateCommet 내부 함수");
    console.log(result.data);
    if (result.data) {
      // 결과 반환해주면.. 버튼 눌림 처리 둘다 꺼버리기.
      props.updateSuccHandler();
    }
  };

  return (
    <Styled>
      <input
        type="text"
        placeholder="댓글 변경.."
        onChange={contentHandler}
      ></input>
      <button type="submit" onClick={updateComment}>
        전송
      </button>
    </Styled>
  );
};

export default UpdateCommentComponent;
