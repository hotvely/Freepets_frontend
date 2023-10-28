import styled from "styled-components";

export const MainStlye = styled.div`
  padding: 10px;
  width: 100%;
  margin-left: 20px;
  /* margin: 0 50px; */
  flex-basis: 800px;
  flex-shrink: 0;
  flex-grow: 1;
`;
export const MainBanner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;

  .banner-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

export const MainContentBox = styled.div`
  border: 1px solid #3a98b9;
  padding: 20px;

  .article-content-box {
    display: flex;
    flex-direction: column;
    position: relative;
    text-size-adjust: none;
    .article-header {
      position: relative;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #3a98b9;
      display: flex;
      flex-direction: column;
      .article-title {
        font-size: 0.9rem;
      }
      .title-area {
        padding-top: 10px;
        padding-bottom: 15px;
        font-size: 1.5rem;
        font-weight: bold;
      }
      .writer-info {
        display: flex;
        justify-content: space-between;
        .profile-img {
          display: flex;
          flex-direction: row;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            margin-right: 20px;
          }
        }
        .profile-img :hover {
          cursor: pointer;
        }
        .profile-area {
          margin-right: 0px;
          padding-top: 5px;
          .writer-info {
            .writer {
              margin-bottom: 5px;
            }
          }
          .article-info {
            color: #7d7c7c;
          }
        }
        .article-tool {
          display: flex;
          align-items: center;
          .comment-count-btn {
            font-size: 0.9rem;
          }
          button {
            border: none;
            background-color: white;
          }
          button:hover {
            color: #3a98b9;
          }
        }
      }
    }
    .article-container {
      .article-viewer {
        min-height: 300px;
        margin-bottom: 20px;
      }

      .likeBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        button {
          border: 0;
          padding: 5px;
          border-radius: 5px;
          background-color: #98dbf2;
          color: white;
          margin: 0 5px;

          display: flex;
          align-items: center;
        }
      }

      .comment-box {
        border-top: 1px solid #3a98b9;

        .commentBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 20px 0;
          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 20px;
          }
        }
        .commentBox2 {
          ul {
            li {
              .comment {
                width: 100%;
                display: flex;
                flex-direction: column;
                .comment-content {
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  .comment-desc {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    flex-basis: 75%;
                    .commentTextBox {
                      padding: 13px;
                      flex-basis: 800px;
                      flex-grow: 0;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      word-break: break-all;
                    }
                  }
                  .comment-last {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .commentDate-btn {
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    }
                  }
                }
                .reCommentViewBtn {
                  margin-top: 20px;

                  button {
                    border: 0;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #98dbf2;
                    color: white;
                    margin: 0 5px;
                  }

                  ul {
                    margin-top: 20px;
                    li {
                      margin-bottom: 20px;
                      .recomment-desc {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                      }

                      button {
                        border: 0;
                        padding: 5px;
                        border-radius: 5px;
                        background-color: #98dbf2;
                        color: white;
                        margin: 0 5px;
                      }
                    }
                  }
                }
              }

              .recomment {
              }
            }
          }
        }
      }
    }
  }
  .article-bottom-btn {
    display: flex;
    justify-content: space-between;
    button {
      border: 0;
      padding: 5px;
      border-radius: 5px;
      background-color: #98dbf2;
      color: white;
      margin: 0 5px;

      a {
        color: white;
      }
    }
  }
`;
