import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../../../resources/bannerTest.png";
import yange from "../../../resources/yaonge.jpg";
import hamster from "../../../resources/hamster.test.jpg";
import { Link } from "react-router-dom";
import {
  getLostAPI,
  addCommunityComment,
  updateLostLike,
  deleteLostAPI,
  getLostCommentsAPI,
  getLostCommentAPI,
  addLostCommentAPI,
  updateLostCommentAPI,
  deleteLostCommentAPI,
} from "../../../api/community";
import { dateFormatDefault } from "../../../api/utils";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addBookmarkAPI, deleteBookmarkAPI } from "../../../api/bookmark";
import CommentComponent from "../../../components/comment/CommentComponent";
import UpdateCommentComponent from "../../../components/comment/UpdateCommentComponent";
import ReCommentComponent from "../../../components/comment/ReCommentComponent";
import CommentBtnComponent from "../../../components/comment/CommentBtnComponent";
import ProfileComponent from "../../../components/member/ProfileComponent";
import { addNotificationAPI } from "../../../api/auth";
import { getTokenCookie } from "../../../api/cookie";
import { userLogout } from "../../../components/store//userSlice";

const MainStlye = styled.div`
  padding: 10px;
  width: 100%;
  margin-left: 20px;
  /* margin: 0 50px; */
`;

const MainBanner = styled.div`
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

const MainContentBox = styled.div`
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
          img {
            width: 50px;
            height: 50px;
            border-radius: 50px;
          }
        }
        .profile-area {
          margin-right: 420px;
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
            cursor: pointer;
          }
          button:hover {
            color: #3a98b9;
          }
          .bookmark-btn {
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .bookmark-btn.active {
            color: #ff5733;
          }
        }
      }
    }
    .article-container {
      .article-viewer {
        min-height: 300px;
        margin-bottom: 20px;
      }
      .like-btn {
        /* background-color: slateblue; */
        display: flex;
        justify-content: center;
        padding-bottom: 10px;
        button {
          border: none;
          background-color: white;
        }
        button:hover {
          color: #3a98b9;
          cursor: pointer;
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
                  font-size: 0.9rem;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  .comment-desc {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .commentTextBox {
                      padding: 13px;
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
    .update-btn {
      margin-right: 10px;
    }

    .top-btn {
      margin-left: 10px;
    }

    button {
      border: none;
      border-radius: 5px;
      height: 25px;
    }
    button:hover {
      cursor: pointer;
      background-color: #8ecddd;
    }
  }
`;

const LostView = () => {
  const [post, setPost] = useState();
  const { code } = useParams();
  const navigate = useNavigate();

  //댓글
  const [comments, setComments] = useState([]);
  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selected_Comment, setSelected_Comment] = useState(0);
  const [content, setContent] = useState("");
  //좋아요
  const [liked, setLiked] = useState(0);
  // 북마크
  // const [isIconActive, setIsIconActive] = useState(false);
  // const [bookmark, setBookmark] = useState(false);

  const LostPostAPI = async (code) => {
    const result = await getLostAPI(code);
    console.log("데이터?" + result);
    setPost(result.data);
    setLiked(result.data.lostLikeCount);
  };

  const UpdateLostHandler = (event) => {
    const id = event.target.value;
    console.log("분실게시판 아이디:" + id);
    navigate(`../${id}/update/2`);
  };

  const DeleteLostHandler = async (event) => {
    const id = event.target.value;

    alert("게시물이 삭제되었습니다.");
    await deleteLostAPI(id);
    navigate("../");
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (Object.keys(state.user).length !== 0) {
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        console.log("로그아웃 !!!");
        dispatch(userLogout());
      }
    }
  });

  const viewBtn = post && post.member && post.member.id === user.id;

  const ScrollToTopBtn = () => {
    window.scrollTo(0, 0);
  };

  const BookMarkBtn = async () => {
    //나중에 북마크 경로로
    const formData = {
      boardName: "lost",
      postCode: code,
      token: user?.token,
    };
    window.scrollTo(0, 0);

    // 북마크 등록
    const result = await addBookmarkAPI(formData);
    if (!result.data) {
      alert("이미 북마크에 등록되었습니다.");
    } else alert("북마크에 등록되었습니다.");
  };

  const NavListPage = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const updateLikeHandler = async () => {
    console.log("liked" + liked);
    const formData = {
      postCode: code,
      token: user?.token,
    };
    console.log("게시글번호 : " + code);

    const result = await updateLostLike(formData);
    if (result.data) {
      setLiked(liked + 1);
    } else {
      setLiked(liked - 1);
    }
  };

  const getCommentHandler = async (code) => {
    const result = await getLostCommentsAPI(code);
    setComments([...result.data]);
    console.log("댓글리스트: " + result.data);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const parentCode = e.target.commentDesc.id;
    const formData = {
      token: user.token,
      boardName: "lost",
      postCode: code,
      parentCommentCode: parentCode, //          부모 댓글의 코드를 백으로 넘기는 법
      commentDesc: e.target.commentDesc.value,
    };
    if (formData.commentDesc) {
      const addCommentResult = await addLostCommentAPI(formData);
      const lostData = {
        token: user?.token,
        postCode: formData.postCode,
        pCommentCode: addCommentResult.data.lostCommentCodeSuper,
        cCommenntCode: addCommentResult.data.lostCommentCode,
        url: `http://localhost:3000/community/lost/lostView/${formData.postCode}`,
      };
      await addNotificationAPI(lostData);
      await getCommentHandler(code);
    } else {
      alert("댓글 작성자와 일치하여 알림이 가지 않습니다.");
    }
  };

  const updateCommentHandler = async (code) => {
    // 댓글 수정 버튼을 눌렀을 때 실행해야 하는 로직을 처리하기 위한 함수
    if (code == currClickBtn) {
      code = -1;
    }
    setCurrClickBtn(code);
  };

  useEffect(() => {
    const handler = async () => {
      console.log("수정 관련 핸들러");
      console.log(currClickBtn);
      if (succUpdate) {
        const formData = {
          commentCode: currClickBtn,
          commentDesc: content,
        };
        console.log(formData);
        const result = await updateLostCommentAPI(formData);
        console.log(result.data);
        if (result.data) {
          setSuccUpdate(false);
          setCurrClickBtn(-1);
          getCommentHandler(code);
        }
      }
    };
    console.log(comments);
    handler();
  }, [succUpdate]);

  const updateSuccHandler = () => {
    setSuccUpdate(true);
  };

  const deleteCommentHandler = async (commentCode) => {
    await deleteLostCommentAPI(commentCode);
    await getCommentHandler(code);
    await LostPostAPI(code);
  };

  const selected_Comment_handler = () => {
    setSelected_Comment(0);
  };

  useEffect(() => {
    const asyncHandler = async () => {
      LostPostAPI(code);
      getCommentHandler(code);
    };

    if (code) {
      asyncHandler();
    }
  }, [code]);

  return (
    <MainStlye>
      <MainBanner>
        <div className="banner-img">
          <img src={banner} alt="배너 이미지" />
        </div>
      </MainBanner>
      <MainContentBox>
        <div className="article-content-box">
          <div className="article-header">
            <div className="article-title">
              <Link to={`/community/lost`}>분실게시판▷</Link>
              <div className="title-area">
                <h2>{post?.lostTitle}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">
                <img
                  src={
                    post?.member?.memberImg !== null
                      ? post?.member?.memberImg
                      : yange
                  }
                  alt="양이 이미지"
                />
              </div>
              <div className="profile-area">
                <div className="writer-info">
                  <div className="writer">{post?.member?.nickname}</div>
                </div>
                <div className="article-info">
                  <span>{dateFormatDefault(post?.lostDate)}</span>
                  <span>ㆍ조회{post?.lostViewCount}</span>
                </div>
              </div>
              <div className="article-tool">
                <button className="comment-count-btn">
                  [ <span>{post?.lostCommentCount}</span> ]
                </button>

                <button className={"bookmark-btn"} onClick={BookMarkBtn}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{
                      fontSize: "1rem",
                      color: "#F4CE14",
                      marginRight: "10px",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="article-container">
            <div
              className="article-viewer"
              dangerouslySetInnerHTML={{ __html: String(post?.lostDesc) }}
            />
            <div className="like-btn">
              <button onClick={updateLikeHandler}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#FF6969" }} />
                {" 추천 "}
                {/* {post?.commonLikeCount} */}
                {liked}
              </button>
              {console.log(post?.lostLikeCount)}
            </div>
            <div className="comment-box">
              <div className="commentBox">
                <div className="commentProfile">
                  {/* <img src={hamster}></img> */}
                </div>
                <CommentComponent props={0} ref={addCommentHandler} />
              </div>
              <div className="commentBox2">
                <ul>
                  {comments?.map((comment) =>
                    comment?.lostCommentCodeSuper > 0 ? null : (
                      <li key={comment?.lostCommentCode}>
                        <div className="comment">
                          {
                            // 유저 정보
                          }
                          <div className="comment-content">
                            <div className="comment-desc">
                              <ProfileComponent props={comment?.member} />
                              {
                                // 댓글 정보
                              }
                              <div className="commentTextBox">
                                <p> {comment?.lostCommentDesc}</p>
                              </div>
                            </div>
                            <div className="comment-last">
                              <div className="commentDate-btn ">
                                <div>
                                  {dateFormatDefault(comment?.lostCommentDate)}
                                </div>
                                <CommentBtnComponent
                                  code={comment?.lostCommentCode}
                                  writer={comment?.user?.id}
                                  updateCommentHandler={updateCommentHandler}
                                  deleteCommentHandler={deleteCommentHandler}
                                />
                              </div>
                            </div>
                            {currClickBtn === comment?.lostCommentCode ? (
                              comment?.member?.id === user?.id ? (
                                <>
                                  <UpdateCommentComponent
                                    code={comment?.lostCommentCode}
                                    updateCommentHandler={updateCommentHandler}
                                    updateSuccHandler={updateSuccHandler}
                                    setContent={setContent}
                                  />
                                </>
                              ) : null
                            ) : null}
                          </div>
                          <div className="reCommentViewBtn">
                            {
                              // 대댓글 보기, 대댓글 작성 코드

                              // 상태 값으로 저장하고 있는 숫자와 선택한 댓글의 코드가 같은 경우에?
                              selected_Comment == comment?.lostCommentCode ? (
                                <div>
                                  {
                                    // 댓글 작성 닫기 버튼을 누르게 되면 기존에 저장하고 있는 상태값 숫자를 리셋해 줘야함 set(0)하면 코드 컴파일 도중 실행 되니까.. handler만들어서
                                  }

                                  <button
                                    className="commentView_btn"
                                    onClick={selected_Comment_handler}
                                  >
                                    댓글 보기 닫기
                                  </button>
                                  {/* 대댓글 호출 로직 */}
                                  <ul>
                                    {comments?.map((comment) =>
                                      comment?.lostCommentCodeSuper <
                                      0 ? null : comment.lostCommentCodeSuper !==
                                        selected_Comment ? null : (
                                        <li key={comment.lostCommentCode}>
                                          <div className="recomment-desc">
                                            <ReCommentComponent
                                              member={comment.member}
                                              desc={comment.lostCommentDesc}
                                              date={comment.lostCommentDate}
                                            />

                                            <CommentBtnComponent
                                              code={comment?.lostCommentCode}
                                              writer={comment?.user?.id}
                                              updateCommentHandler={
                                                updateCommentHandler
                                              }
                                              deleteCommentHandler={
                                                deleteCommentHandler
                                              }
                                            />
                                          </div>
                                          {currClickBtn ==
                                          comment.lostCommentCode ? (
                                            comment?.member.id === user?.id ? (
                                              <UpdateCommentComponent
                                                code={comment?.lostCommentCode}
                                                updateCommentHandler={
                                                  updateCommentHandler
                                                }
                                                updateSuccHandler={
                                                  updateSuccHandler
                                                }
                                                setContent={setContent}
                                              />
                                            ) : null
                                          ) : null}
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
                                    id={`${comment.lostCommentCode}`}
                                    onClick={(e) => {
                                      setSelected_Comment(
                                        comment.lostCommentCode
                                      );
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
            </div>
          </div>
        </div>

        <div className="article-bottom-btn">
          <div className="left-btn">
            <button className="list-btn" onClick={NavListPage}>
              목록
            </button>

            <button className="top-btn" onClick={ScrollToTopBtn}>
              △위로
            </button>
          </div>
          <div
            className="right-btn"
            style={{ display: viewBtn ? "block" : "none" }}
          >
            <button
              className="update-btn"
              // id={post?.commonCode}
              onClick={UpdateLostHandler}
              value={post?.lostCode}
            >
              수정
            </button>
            <button
              className="delete-btn"
              onClick={DeleteLostHandler}
              value={post?.lostCode}
            >
              삭제
            </button>
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};
export default LostView;
