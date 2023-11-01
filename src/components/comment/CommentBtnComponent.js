import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../store/userSlice";

const Styled = styled.div`
  .comment-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    button {
      border: 0;
      padding: 5px;
      border-radius: 5px;
      background-color: #98dbf2;
      color: white;
      margin: 0 5px;
    }
  }
`;

const CommentBtnComponent = (props) => {
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

  const writer = props.writer;

  return (
    <Styled>
      <div className="comment-btn">
        <button
          id={props.code}
          onClick={() => {
            props.updateCommentHandler(props.code);
          }}
          className={props.className}
        >
          수정
        </button>
        <button
          onClick={() => {
            if (user.id == writer) {
              props.deleteCommentHandler(props.code);
            }
            console.log("사용자와 작성자가 달라서 삭제 불가");
          }}
        >
          삭제
        </button>
      </div>
    </Styled>
  );
};

export default CommentBtnComponent;
