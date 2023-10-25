import { forwardRef } from "react";
import styled from "styled-components";
const Styled = styled.div`
  flex: 0 1 100%;

  form {
    flex: 1 1 800px;
    /* border: 1px solid black; */

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    .commentDesc {
      width: 90%;

      input {
        width: 90%;
        border: 1px solid #ededed;
        border-radius: 10px;
        background-color: white;
        color: black;

        margin: 0;
        padding: 10px 20px;
      }
    }
    .submitBtn {
      margin-left: 20px;
      button {
        width: 80px;
        height: 35px;
        border: 0;
        padding: 5px;
        border-radius: 5px;
        background-color: #437b92;
        color: white;
      }
    }
  }
`;

const CommentComponent = forwardRef((props, ref) => {
  return (
    <Styled>
      <form onSubmit={ref}>
        <div className="commentDesc">
          <input
            id={`${props.props}`}
            type="text"
            placeholder="댓글 입력창..."
            name="commentDesc"
          ></input>
        </div>
        <div className="submitBtn">
          <button type="submit">댓글작성</button>
        </div>
      </form>
    </Styled>
  );
});

export default CommentComponent;
