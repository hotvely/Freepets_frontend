import { forwardRef } from "react";
import profileImg from "../../../src/resources/kero.jpeg";
import { dateFormatDefault } from "../../api/utils";
import styled from "styled-components";
const ReCommentComponent = forwardRef((props, ref) => {
  const member = props.member;
  const desc = props.desc;
  const commentDate = props.date;

  const Styled = styled.div`
    display: flex;
    width: 85%;
    .recomment {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .infoUser-commentDesc {
        width: 85%;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 50%;
        }
        .useName {
          margin-right: 10px;
        }
        .commentTextBox {
          width: 400px;
          margin-left: 10px;
          word-break: break-all;
        }
      }
      .commentDate {
        font-size: 0.9rem;
      }
    }
  `;

  const dateFormatter = (data) => {
    if (data) {
      const date = new Date(`${data}`);

      const result =
        date.getFullYear() +
        "-" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        date.getDate();
      return result;
    }
  };

  return (
    <Styled>
      <div className="recomment">
        <div className="infoUser-commentDesc">
          <img
            src={member.memberImg == null ? profileImg : `${member.memberImg}`}
          ></img>

          <div className="userName">{member.nickname} :</div>
          <div className="commentTextBox"> {desc} </div>
        </div>
        <div className="commentDate">{dateFormatDefault(commentDate)}</div>
      </div>
    </Styled>
  );
});

export default ReCommentComponent;