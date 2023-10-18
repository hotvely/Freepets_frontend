import { forwardRef } from "react";
import styled from "styled-components";
const Styled = styled.div`
  flex: 0 1 100%;

  form {
    flex: 1 1 800px;

    margin: 20px 0px;
    padding: 20px 0px;
    /* border: 1px solid black; */

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    .commentDesc {
      width: 70%;

      input {
        width: 90%;
        border: 0;
        border-radius: 10px;
        background-color: darkgray;
        color: white;

        margin: 0;
        padding: 10px 20px;
      }
    }
    .submitBtn {
      width: 70px;
      button {
        height: 40px;
        background-color: black;
        border-radius: 10px;
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
