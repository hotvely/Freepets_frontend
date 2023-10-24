import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 100vw;
  align-items: center;

  .venner {
    width: 90%;
    img {
      width: 100%;
      height: 150px;
    }
  }

  .vennerBottom {
    display: flex;
    align-items: center;
    width: 90%;
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
    position: relative;

    .full {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;

      .full-line-left {
        border: 1px solid hsla(220, 9%, 46%, 0.3);
        width: 1%;
      }

      .full-line-right {
        border: 1px solid hsla(220, 9%, 46%, 0.3);
        width: 92.7%;
        margin-left: 103px;
      }
    }
    .vennerText {
      .text-box {
        background-color: white;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-left: 1.25rem;

        .text-blue {
          color: #2687a6;
        }
      }
    }
  }

  .contentHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 90%;

    .userProfile {
      display: flex;
      flex-direction: column;
      align-items: center;
      .profile {
        margin: 0px 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        justify-content: center;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .user {
        margin: 0px 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .usertTitle {
          display: flex;
          p {
            margin: 5px 0px;
            border: 2px solid #dedede;
            border-radius: 5px;
            padding: 5px;
            font-weight: bolder;
          }
        }

        .viewicon {
        }
      }
    }
    .icon {
    }
  }

  .descHeader {
    width: 90%;
    margin: 15px 0px;
    font-weight: bolder;
    font-size: 45px;
  }
  .desc {
    width: 90%;
    border: 1px solid hsla(220, 9%, 46%, 0.3);
    height: 30%;
  }
  .likeBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;
    button {
      border: 0;
      background-color: white;
    }
  }
  .commentProfile {
    // flex: 0 1 10%;
    //margin: 0 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .commentBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 70px;

    .commentProfile {
      margin-right: 20px;
      width: 50px;
      flex: none;
    }

    /* form {
      width: 80%;
      height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .commentDesc {
        margin-left: 30px;
        width: 80%;
        input {
          padding: 15px;
          border-radius: 10px;
          width: 90%;
          height: 15px;
        }
      }
      .submitBtn {
        button {
          border-radius: 10px;
          height: 50px;
          background-color: skyblue;
          color: white;
          border: 0;
        }
      }
    } */
  }

  .commentBox2 {
    width: 90%;
    .comment {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      margin-top: 15px;

      .userProfile {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .comment {
          .profile {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0px 5px;

            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 20px;
            }
          }
          .comment-desc {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0;

            .commentDate-btn {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }
        }

        .reCommentContent {
          padding: 5px;
          .commentView_btn {
            height: 35px;
            background-color: #437b92;
            border: 0;
            border-radius: 5px;
            color: white;
            margin: 3px 0;
          }

          ul {
            margin-top: 20px;
            li {
              display: flex;
              flex-direction: column;
              margin-bottom: 15px;
              .recomment-desc {
                display: flex;
                flex-direction: row;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledMain;
