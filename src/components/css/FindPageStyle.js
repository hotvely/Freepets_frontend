import styled from "styled-components";

const FindPageStyle = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .homeLink {
    font-size: 2.5rem;
    margin-bottom: 20px;

    font-weight: bold;
    a {
      color: #1e7091;
    }
  }
  .pagename {
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e7091;
  }

  .content {
    margin: 0px 50px;

    .inputForm {
      margin: 20px 0;
      width: 400px;

      .upArea {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-top: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        padding: 20px;
        input {
          font-size: 1.1rem;
          border: 0;
          border-radius: 25px;
          width: 100%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
      }
      .downArea {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-top: 1px solid lightgray;
        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        padding: 20px;

        input {
          font-size: 1.1rem;
          border: 0;
          border-radius: 25px;
          width: 100%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
      }

      .submitBtn,
      .submitBtnClicked {
        width: 100%;
        height: 40px;
        margin-top: 40px;
        background-color: #64a5c1; // #87ceeb94;
        font-weight: bold;
        font-size: 1.2rem;
        color: white;
        border: 0;
        border-radius: 25px;
      }
      .submitBtnClicked {
        background-color: #2c647c;
      }
    }
    .contentFooter {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .fALink {
        background-color: white;
        padding: 0 20px;
        font-size: 0.8rem;
      }
      span {
        font-size: 0.8rem;
      }
    }
  }
`;
export default FindPageStyle;
