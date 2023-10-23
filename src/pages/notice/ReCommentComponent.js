import { forwardRef } from "react";
import profileImg from "../../../src/resources/kero.jpeg";
import styled from "styled-components";
const ReCommentComponent = forwardRef((props, ref) => {
  const data = props.props;

  const Styled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    img {
      width: 30px;
      height: 30px;
    }
  `;

  return (
    <Styled className="commentDesc">
      {console.log(data)}
      {/* 대댓글 + code :{`${comment.noticeCommentCode}`} */}

      <img
        src={
          data.member.memberImg == null
            ? profileImg
            : `${data.member.memberImg}`
        }
      ></img>

      <div> {data.member.nickname} : </div>
      <div className="commentTextBox"> {data.noticeCommentDesc} </div>
      <div> {data.noticeCommentDate}</div>
    </Styled>
  );
});

export default ReCommentComponent;
