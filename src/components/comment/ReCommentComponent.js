import { forwardRef } from "react";
import profileImg from "../../../src/resources/kero.jpeg";
import styled from "styled-components";
const ReCommentComponent = forwardRef((props, ref) => {
  const data = props.props;

  const Styled = styled.div`
    width: 80%;
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
        }
        .useName {
          margin-right: 10px;
        }
        .commentTextBox {
          margin-left: 10px;
        }
      }
      .commentDate {
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
            src={
              data.member.memberImg == null
                ? profileImg
                : `${data.member.memberImg}`
            }
          ></img>

          <div className="userName">{data.member.nickname} :</div>
          <div className="commentTextBox"> {data.noticeCommentDesc} </div>
        </div>
        <div className="commentDate">
          {dateFormatter(data.noticeCommentDate)}
        </div>
      </div>
    </Styled>
  );
});

export default ReCommentComponent;
