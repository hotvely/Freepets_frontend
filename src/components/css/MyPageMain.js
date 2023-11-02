import styled from "styled-components";

const MyPageMain = styled.main`
  margin: 0;
  flex: 0 1 100%-800px;
  padding: 0 100px;
  img {
    width: 100%;
  }

  header {
    font-size: 1.3rem;
    margin-top: 20px;
    justify-content: center;
    font-weight: bold;
    background-color: black;
    width: 100%;
    height: 80px;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    p {
      padding-left: 30px;
    }
    .alarm {
      display: flex;
      background-color: orange;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
    }
  }

  .profile {
    display: flex;
    flex-direction: row;

    .profile-photo {
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;

        .profileImg {
          width: 150px;
          height: 150px;
          border-radius: 50%;

          position: absolute;
          z-index: -2;
        }

        .profileBorder {
          position: absolute;
          width: 200px;
          height: 200px;
          z-index: -1;
        }
      }

      label {
        font-size: 1.5rem;
        font-weight: bold;
        padding: 30px 0;
      }
    }

    .profileInfo {
      display: flex;
      flex: 0 1 100%;
      flex-direction: column;
      padding: 20px 20px;

      div {
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        width: 100%-200px;
        padding: 5px 0;
        align-items: center;

        p {
          font-size: 1rem;
          font-weight: bold;
          width: 30%;
          color: rgb(129, 129, 129);
          flex-basis: 70px;
          flex-shrink: 0;
        }
        .info {
          font-size: 1rem;
          font-weight: bold;
          flex-basis: 150px;
          flex-grow: 1;
          white-space: normal;
          line-height: 150%;
        }
      }
    }
  }

  .profile_btn {
    display: flex;
    justify-content: end;
    padding: 20px 10px;
    width: 95%;
    height: 50px;
    button {
      border-radius: 10px;
      background-color: skyblue;
      color: white;
      font-weight: bold;
      border: 0;
      font-size: 1.2rem;
      margin: 0 10px;
    }
  }

  .profile-alram {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .check-Alarm {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin: 20px 0;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
      button {
        background-color: white;
        border: 0;
        font-weight: bold;
      }

      .check-Alarm-Content {
        width: 800px;
        height: 50px;

        /* margin-right: 100px; */
        display: flex;
        flex-direction: column;
        justify-content: center;

        .check_Alarm-info {
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          flex-basis: 750px;
          flex-grow: 1;
          div {
          }
          .commentTitle {
            margin-left: 20px;
            white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정합니다. */
            overflow: hidden; /* 요소의 내용이 너무 길어지면 숨깁니다. */
            text-overflow: ellipsis; /* 생략 부호(...)를 사용하여 표시됩니다. */
            flex-grow: 0;
            flex-shrink: 1;
          }

          .commentDesc {
            margin-left: 10px;

            flex-grow: 0;
            white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정합니다. */
            overflow: hidden; /* 요소의 내용이 너무 길어지면 숨깁니다. */
            text-overflow: ellipsis; /* 생략 부호(...)를 사용하여 표시됩니다. */
          }
        }
      }
    }
  }

  .profile-Post {
    display: flex;
    flex-direction: column;
    width: 100%;
    .Post {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-basis: 50px;
      width: 750px;

      margin-top: 20px;
      margin-left: 70px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .postInfo_basic {
        flex: 0 1 50px;
        padding-left: 20px;
        font-weight: bold;
        width: 350px;
      }
      .postInfo_boardname {
        flex: 0 1 100px;
        padding-left: 20px;
        font-weight: bold;
      }
      .postInfo_title {
        flex: 0 1 300px;
        padding-left: 20px;
        text-overflow: ellipsis;
      }
      .postInfo_date {
        flex: 0 1 150px;
        padding-left: 20px;
      }
      .bookmarkDeletBtn {
        button {
          border: 0;
          background-color: white;
          font-weight: bold;
          font-size: 1rem;
        }
      }
    }
  }

  .profile-myReview {
    display: flex;
    flex-direction: column;
    width: 100%;
    .myReview {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 20px 20px;

      height: 40px;
      .review_boardname {
        flex: 0 1 150px;
        font-weight: bold;
      }
      .review_title {
        flex: 0 1 250px;
        padding-left: 20px;
        font-weight: bold;
      }
      .review_content {
        flex: 0 1 400px;
      }
      .review_date {
        flex: 0 1 150px;
        padding-left: 20px;
      }
    }
  }
`;

export default MyPageMain;
