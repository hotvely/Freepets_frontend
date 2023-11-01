import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../store/userSlice";

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
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (Object.keys(state.user).length !== 0) {
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        console.log("로그아웃 !!!");
        dispatch(userLogout());
      }
    }
  });

  const contentHandler = (e) => {
    setContent(e.target.value);
    props.setContent(e.target.value);
  };

  const updateComment = async () => {
    // console.log(content);
    // const formData = {
    //   commentCode: code,
    //   commentDesc: content,
    // };
    console.log(content);
    if (content) {
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
