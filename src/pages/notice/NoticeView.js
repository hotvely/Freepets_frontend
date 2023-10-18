import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faComments,
  faArrowUpFromBracket,
  faBookmark,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import testImg from "../../../src/resources/image.jpg";
import banner from "../../../src/resources/bannerTest.png";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  addCommentAPI,
  addNoticePostComment,
  boardViewAPI,
  getBoardView,
  getBoardViewAPI,
  getComments,
  getCommentsAPI,
  getReCommentsAPI,
  getReviews,
} from "../../api/notice";
import { async } from "q";
import CommentComponent from "./CommentComponent";
import ReCommentComponent from "./ReCommentComponent";

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
      flex-direction: row;
      .profile {
        margin: 0px 5px;
        display: flex;
        flex-direction: column;
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
          margin: 5px 0px;
          span {
            margin-right: 15px;
          }
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
    margin: 30px 0px;
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
    margin-top: 30px;
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
      margin-top: 80px;

      .userProfile {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .useruser {
          display: flex;
          flex-direction: row;

          .profile {
            margin: 0px 5px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }

          .user {
            display: flex;
            flex-direction: column;
            justify-content: center;

            p {
              margin-left: 10px;
              border: 2px solid #dedede;
              border-radius: 5px;
              padding: 5px;
              font-weight: bolder;
            }
            span {
              margin-right: 10px;
            }
          }
        }
        .comment-desc {
          padding: 20px;
          margin-top: 10px;
        }

        .reCommentContent {
          padding: 20px;
          .commentView_btn {
            height: 40px;
            background-color: #437b92;
            border: 0;
            border-radius: 5px;
            color: white;
            margin: 10px 0;
          }

          ul {
            margin-top: 10px;
          }

          li {
            padding-top: 20px;
          }
        }
      }
    }
  }
`;

const NoticeView = () => {
  const { code } = useParams();
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const [selected_Comment, setSelected_Comment] = useState(0);

  const getPostHandler = async () => {
    const post = await getBoardViewAPI(code);
    if (post) {
      return post.data;
    }
  };

  const getCommentHandler = async () => {
    const comments = await getCommentsAPI(code);

    if (comments) {
      return comments.data;
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.commentDesc.id);
    const parentCode = e.target.commentDesc.id;
    const formData = {
      token: localStorage.getItem("token"),
      boardName: "notice",
      postCode: code,
      parentCommentCode: parentCode, //부모 댓글의 코드를 백으로 넘기는 법
      commentDesc: e.target.commentDesc.value,
    };

    console.log(formData);
    if (formData.commentDesc) {
      await addCommentAPI(formData);
      const updatedComment = await getCommentsAPI(code);
      if (updatedComment) {
        setComments(updatedComment.data);
        e.target.commentDesc.value = null;
      }
    } else {
      alert("댓글 작성후 등록하세요");
    }
  };

  const selected_Comment_handler = () => {
    // 대댓글 작성을 하지 않기 위해 아예 부모 값 전달을 하지 않아버리면 됨
    setSelected_Comment(0);
  };
  console.log("선택된 부모 댓글 코드 리셋 : " + selected_Comment);

  useEffect(() => {
    const asyncHandler = async () => {
      const pData = await getPostHandler(code);
      setPostData(pData);

      const cData = await getCommentHandler(code);
      setComments(cData);
    };

    asyncHandler();
  }, []);

  return (
    <StyledMain>
      <div className="venner">
        <img src={banner} />
      </div>
      <div className="vennerBottom">
        <div className="full">
          <div className="full-line-left"></div>
        </div>

        <div className="vennerText">
          <div className="text-box">
            <span></span>
            <a className="text-blue" href="#">
              커뮤니티
            </a>
            <span></span>
          </div>
        </div>

        <div className="full">
          <div className="full-line-right"></div>
        </div>
      </div>
      <div className="contentHeader">
        <div className="userProfile">
          <div className="profile">
            <img src={testImg} alt="작성자 프로필" />
          </div>

          <div className="user">
            <div className="usertTitle">
              <p style={{ fontSize: "18px", fontWeight: "border" }}>
                {postData?.member.nickname}
              </p>
            </div>

            <div className="viewicon">
              <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#1FB1D1" }} />
              <span id="like">{postData?.noticeLike}</span>{" "}
              <FontAwesomeIcon icon={faEye} style={{ color: "#1FB1D1" }} />
              <span id="views">{postData?.noticeViews}</span>
              <FontAwesomeIcon icon={faComments} style={{ color: "#1FB1D1" }} />
              <span id="comment">{postData?.noticeCommentCount}</span>
            </div>
          </div>
        </div>

        <div className="icon">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            style={{
              color: "#C9C9C9",
              margin: "0px 5px",
              fontSize: "20px",
            }}
          />
          <FontAwesomeIcon
            icon={faBookmark}
            style={{
              color: "#C9C9C9",
              margin: "0px 5px",
              fontSize: "20px",
            }}
          />
        </div>
      </div>
      <div className="descHeader">
        <h1>{postData?.noticeTitle}</h1>
      </div>
      <div className="desc">
        <div>{postData?.noticeDesc}</div>
      </div>
      <div className="commentBox">
        <div className="commentProfile">
          <img src={testImg}></img>
        </div>

        <CommentComponent props={0} ref={addCommentHandler} />
      </div>
      <div className="commentBox2">
        <ul className="comment">
          {comments?.map((comment) =>
            comment.noticeCommentCodeSuper > 0 ? null : (
              <li className="userProfile" key={comment.noticeCommentCode}>
                <div>
                  {
                    // 유저 정보
                  }
                  <div className="useruser">
                    <div className="profile">
                      <img src={testImg} alt="작성자 프로필" />
                    </div>

                    <div className="user">
                      <p style={{ fontSize: "18px", fontWeight: "border" }}>
                        {comment?.member?.nickname}
                      </p>
                    </div>
                  </div>

                  {
                    // 댓글 정보
                  }
                  <div className="comment-desc">
                    <p>{comment?.noticeCommentDesc}</p>
                  </div>

                  <div className="reCommentContent">
                    {
                      // 대댓글 보기, 대댓글 작성 코드

                      // 상태 값으로 저장하고 있는 숫자와 선택한 댓글의 코드가 같은 경우에?
                      selected_Comment == comment.noticeCommentCode ? (
                        <div>
                          {
                            // 댓글 작성 닫기 버튼을 누르게 되면 기존에 저장하고 있는 상태값 숫자를 리셋해 줘야함 set(0)하면 코드 컴파일 도중 실행 되니까.. handler만들어서
                            console.log(selected_Comment)
                          }
                          {console.log(comments)}
                          <button
                            className="commentView_btn"
                            onClick={selected_Comment_handler}
                          >
                            댓글 보기 닫기
                          </button>
                          {/* 대댓글 호출 로직 */}
                          <ul>
                            {comments.map((comment) =>
                              comment.noticeCommentCodeSuper <
                              0 ? null : comment.noticeCommentCodeSuper !==
                                selected_Comment ? null : (
                                <li key={comment.noticeCommentCode}>
                                  <ReCommentComponent props={comment} />
                                </li>
                              )
                            )}
                          </ul>

                          <CommentComponent
                            // props={{ num1: currClickComment, num2: 10, num3: 100 }}    //<- 여러개 던질때
                            props={selected_Comment}
                            ref={addCommentHandler}
                          />
                        </div>
                      ) : (
                        <div>
                          {
                            //id에 상위 댓글의 코드 값을 넣어서 버튼 id부여함.
                            // 부여한 이유는... 댓글 작성의 경우에 CommentComponent를 호출해서 재사용 하기 위함
                          }
                          <button
                            className="commentView_btn"
                            id={`${comment.noticeCommentCode}`}
                            onClick={(e) => {
                              setSelected_Comment(comment.noticeCommentCode);
                            }}
                          >
                            댓글 보기
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>

                <hr
                  style={{
                    width: "100%",
                    border: "0px",
                    borderTop: "1px solid #7BCFE1",
                  }}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </StyledMain>
  );
};
export default NoticeView;
