import { useSelector } from "react-redux";
import styled from "styled-components";

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
      background-color: #84afc1;
      color: white;
      margin: 0 5px;
    }
  }
`;

const CommentBtnComponent = (props) => {
  const user = useSelector((state) => {
    return state.user;
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
