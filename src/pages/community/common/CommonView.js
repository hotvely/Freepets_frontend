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
  getCommunity,
  // updateCommunity,
  deleteCommunity,
  getCommentsAPI,
  getCommentAPI,
  addCommunityComment,
  deleteCommunityComment,
  updateCommunityLike,
} from "../../../api/community";
import { dateFormatDefault } from "../../../api/utils";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CommentComponent from "../../../components/comment/CommentComponent";
import UpdateCommentComponent from "../../../components/comment/UpdateCommentComponent";
import ReCommentComponent from "../../../components/comment/ReCommentComponent";
import CommentBtnComponent from "../../../components/comment/CommentBtnComponent";
import ProfileComponent from "../../../components/member/ProfileComponent";
import { addNotificationAPI } from "../../../api/auth";

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

const CommonView = () => {
  const [post, setPost] = useState();
  const [isIconActive, setIsIconActive] = useState(false);
  const { code } = useParams();
  const navigate = useNavigate();

  //댓글
  const [comments, setComments] = useState([]);
  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selected_Comment, setSelected_Comment] = useState(0);

  //좋아요
  const [liked, setLiked] = useState(false);

  const CommunityPostAPI = async (id) => {
    const result = await getCommunity(id);
    setPost(result.data);
    setLiked(result.data.commonLikeCount);
  };

  const UpdateCommunityAPI = (event) => {
    const id = event.target.value;
    console.log(id);
    navigate(`../${id}/update/1`);
  };

  const DeleteCommunityAPI = async (event) => {
    const id = event.target.value;
    console.log(id);
    alert("게시물이 삭제되었습니다.");
    await deleteCommunity(id);
    navigate("../../");
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      console.log("쿠키 있!");
      return state.user;
    } else {
      if (localStorage.getItem("user")) {
        console.log("호출..?");
        dispatch(userLogout());
      }
    }
  });
  const viewBtn = post && post.member && post.member.id === user.id;
  console.log("사용자: " + user?.token);

  const ScrollToTopBtn = () => {
    window.scrollTo(0, 0);
  };
  const BookMarkBtn = () => {
    //나중에 북마크 경로로
    window.scrollTo(0, 0);
    setIsIconActive(!isIconActive);
    if (isIconActive) {
      alert("북마크가 해제되었습니다.");
    } else {
      alert("북마크 되었습니다.");
    }
  };

  const iconColor = isIconActive ? "#FF5733" : "#F4CE14";

  const NavListPage = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const updateLikeHandler = async (data) => {
    console.log("liked" + liked);
    const formData = new FormData();
    formData.append("commonLike.community.commonCode", code);
    console.log("게시글번호 : " + code);
    formData.append("commonLike.member.id", user?.id);
    console.log("유저아이디 : " + user?.id);
    const result = await updateCommunityLike(formData);
    setLiked(result.data.commonLikeCount);
  };

  const getCommentHandler = async (code) => {
    const result = await getCommentsAPI(code);
    setComments([...result.data]);
  };

  const addCommentHandler = async (e) => {
    console.log(e.target.commentDesc.id);
    e.preventDefault();
    if (user?.token) {
      const parentCode = e.target.commentDesc.id;
      const formData = {
        token: user.token,
        boardName: "community",
        postCode: code,
        parentCommentCode: parentCode, //          부모 댓글의 코드를 백으로 넘기는 법
        commentDesc: e.target.commentDesc.value,
      };
      if (formData.commentDesc) {
        const addCommentResult = await addCommunityComment(formData);
        console.log(addCommentResult.data);

        if (parentCode > 0) {
          // 부모 댓글 있을때.
          console.log(parentCode);
          const result = await getCommentAPI(parentCode);
          console.log(result.data);

          if (result.data.member.id != user.id) {
            const commonData = {
              id: result.data.member.id,
              postCode: formData.postCode,
              pCommentCode: addCommentResult.data.commonCommentCodeSuper,
              cCommenntCode: addCommentResult.data.commonCommentCode,
              url: `http://localhost:3000/community/commonView/${formData.postCode}`,
            };
            await addNotificationAPI(commonData);
          } else {
            alert("댓글 작성자와 일치하여 알림이 가지 않습니다.");
          }
        } else {
          if (post.member.id != user?.id) {
            const commonData = {
              id: post.member.id,
              postCode: formData.postCode,
              pCommentCode: addCommentResult.data.commonCommentCodeSuper,
              cCommenntCode: addCommentResult.data.commonCommentCode,
              url: `http://localhost:3000/community/commonView/${formData.postCode}`,
            };
            await addNotificationAPI(commonData);
          } else {
            alert("작성자가 같아서 알림이 가지 않음");
          }
        }
      }

      await getCommentHandler(code);
      e.target.commentDesc.value = null;
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const updateCommentHandler = async (code) => {
    // 댓글 수정 버튼을 눌렀을 때 실행해야 하는 로직을 처리하기 위한 함수
    if (code == currClickBtn) {
      code = -1;
    }
    setCurrClickBtn(code);
  };

  const updateSuccHandler = () => {
    setSuccUpdate(true);
  };

  const deleteCommentHandler = async (commentCode) => {
    await deleteCommunityComment(commentCode);
    await getCommentHandler(code);
  };

  const selected_Comment_handler = () => {
    setSelected_Comment(0);
  };

  // useEffect(() => {
  //   const asyncHandler = async () => {
  //     CommunityPostAPI(code);
  //     getCommentHandler(code);
  //   };
  //   asyncHandler();
  // }, []);

  useEffect(() => {
    const asyncHandler = async () => {
      CommunityPostAPI(code);
      getCommentHandler(code);
    };

    if (code) {
      asyncHandler();
    }
  }, [code]);
  console.log(post);

  useEffect(() => {
    if (succUpdate) {
      setSuccUpdate(false);
      setCurrClickBtn(-1);
      getCommentHandler(code);
    }
  }, [succUpdate]);

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
              <Link to={`/community`}>자유게시판▷</Link>
              <div className="title-area">
                <h2>{post?.commonTitle}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">
                <img src={yange} alt="양이 이미지" />
              </div>

              <div className="profile-area">
                <div className="writer-info">
                  <div className="writer">{post?.member?.nickname}</div>
                </div>
                <div className="article-info">
                  <span>{dateFormatDefault(post?.commonDate)}</span>
                  <span>ㆍ조회{post?.commonViewCount}</span>
                </div>
              </div>
              <div className="article-tool">
                <button className="comment-count-btn">
                  [ <span>{post?.commonCommentCount}</span> ]
                </button>

                <button className={"bookmark-btn"} onClick={BookMarkBtn}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{
                      fontSize: "1rem",
                      color: iconColor,
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
              dangerouslySetInnerHTML={{ __html: String(post?.commonDesc) }}
            />
            <div className="like-btn">
              <button onClick={updateLikeHandler}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#FF6969" }} />
                {" 추천 "}
                {post?.commonLikeCount}
              </button>
              {console.log(post?.commonLikeCount)}
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
                    comment?.commonCommentCodeSuper > 0 ? null : (
                      <li key={comment?.commonCommentCode}>
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
                                <p> {comment?.commonCommentDesc}</p>
                              </div>
                            </div>
                            <div className="comment-last">
                              <div className="commentDate-btn ">
                                <div>
                                  {dateFormatDefault(
                                    comment?.commonCommentDate
                                  )}
                                </div>
                                <CommentBtnComponent
                                  code={comment?.commonCommentCode}
                                  writer={comment?.member?.id}
                                  updateCommentHandler={updateCommentHandler}
                                  deleteCommentHandler={deleteCommentHandler}
                                />
                              </div>
                            </div>

                            {currClickBtn === comment?.commonCommentCode ? (
                              comment?.member?.id === user?.id ? (
                                <UpdateCommentComponent
                                  code={comment?.commonCommentCode}
                                  updateCommentHandler={updateCommentHandler}
                                  updateSuccHandler={updateSuccHandler}
                                />
                              ) : null
                            ) : null}
                          </div>
                          <div className="reCommentViewBtn">
                            {
                              // 대댓글 보기, 대댓글 작성 코드

                              // 상태 값으로 저장하고 있는 숫자와 선택한 댓글의 코드가 같은 경우에?
                              selected_Comment == comment?.commonCommentCode ? (
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
                                      comment?.commonCommentCodeSuper <
                                      0 ? null : comment.commonCommentCodeSuper !==
                                        selected_Comment ? null : (
                                        <li key={comment.commonCommentCode}>
                                          <div className="recomment-desc">
                                            <ReCommentComponent
                                              member={comment.member}
                                              desc={comment.commonCommentDesc}
                                              date={comment.commonCommentDate}
                                            />

                                            <CommentBtnComponent
                                              code={comment?.commonCommentCode}
                                              writer={comment?.member.id}
                                              updateCommentHandler={
                                                updateCommentHandler
                                              }
                                              deleteCommentHandler={
                                                deleteCommentHandler
                                              }
                                            />
                                          </div>
                                          {currClickBtn ==
                                          comment.commonCommentCode ? (
                                            comment?.member.id === user?.id ? (
                                              <UpdateCommentComponent
                                                code={
                                                  comment?.commonCommentCode
                                                }
                                                updateCommentHandler={
                                                  updateCommentHandler
                                                }
                                                updateSuccHandler={
                                                  updateSuccHandler
                                                }
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
                                    id={`${comment.commonCommentCode}`}
                                    onClick={(e) => {
                                      setSelected_Comment(
                                        comment.commonCommentCode
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
              onClick={UpdateCommunityAPI}
              value={post?.commonCode}
            >
              수정
            </button>
            <button
              className="delete-btn"
              onClick={DeleteCommunityAPI}
              value={post?.commonCode}
            >
              삭제
            </button>
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};
export default CommonView;
