import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faComments,
  faArrowUpFromBracket,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import testImg from "../../../src/resources/image.jpg";
import banner from "../../../src/resources/bannerTest.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  addCommentAPI,
  deleteCommentAPI,
  deleteNoticeAPI,
  getBoardViewAPI,
  getCommentAPI,
  getCommentsAPI,
  updateCommentAPI,
  updateLikeNoticeAPI,
} from "../../api/notice";
import CommentComponent from "../../components/comment/CommentComponent";
import ReCommentComponent from "../../components/comment/ReCommentComponent";
import { addBookmarkAPI } from "../../api/bookmark";
import { useDispatch, useSelector } from "react-redux";
import UpdateCommentComponent from "../../components/comment/UpdateCommentComponent";
import {
  addNoticeNotification,
  addNotification,
} from "../../components/Notification";
import CommentBtnComponent from "../../components/comment/CommentBtnComponent";
import {
  MainStlye,
  MainBanner,
  MainContentBox,
} from "../../components/css/PostView";
import ProfileComponent from "../../components/member/ProfileComponent";
import { Link, useNavigate } from "react-router-dom";
import yaonge from "../../resources/yaonge.jpg";
import { dateFormatDefault } from "../../api/utils";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../../components/store/userSlice";
import { async } from "q";

const NoticeView = () => {
  const { code } = useParams();
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const [likeCount, setLikeCount] = useState();

  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selected_Comment, setSelected_Comment] = useState(0);
  const navigate = useNavigate();
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

  const getPostHandler = async (code) => {
    const result = await getBoardViewAPI(code);
    setPostData(result.data);
    setLikeCount(result.data.noticeLike);
  };
  const getCommentHandler = async (code) => {
    const result = await getCommentsAPI(code);
    setComments([...result.data]);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (user?.token) {
      const parentCode = e.target.commentDesc.id;
      const formData = {
        token: user.token,
        boardName: "notice",
        postCode: code,
        parentCommentCode: parentCode, //부모 댓글의 코드를 백으로 넘기는 법
        commentDesc: e.target.commentDesc.value,
      };

      if (formData.commentDesc) {
        const addCommentResult = await addCommentAPI(formData);
        console.log(addCommentResult);
        await getPostHandler(code);
        // 댓글 작성 비동기 함수가 돌기 때문에.. 여기서 알림 DB 추가 해주면 됨
        // 단, 게시글 작성자 아이디하고 현재 아이디 하고 같으면 알림 추가 안함
        if (parentCode > 0) {
          // 부모 댓글 있을때.
          console.log(parentCode);
          const result = await getCommentAPI(parentCode);
          console.log(result.data);

          // 부모 댓글 작성자와 대댓글 작성자가 다를때
          if (result.data.member.id != user.id) {
            const notiData = {
              id: result.data.member.id,

              postCode: formData.postCode,
              pCommentCode: addCommentResult.data.noticeCommentCodeSuper,
              cCommentCode: addCommentResult.data.noticeCommentCode,
              url: `http://localhost:3000/notice/noticeView/${formData.postCode}`,
            };
            await addNoticeNotification(notiData);
            console.log("댓글 작성자랑 달라서 알림 감!");
          } else {
            alert("댓글 작성자와 일치한 사람이라 알림 안갑니다.");
          }
        } else {
          // 부모 댓글 없어서 그냥 댓글 달때
          if (postData.member.id != user?.id) {
            const notiData = {
              id: postData.member.id,

              postCode: formData.postCode,
              pCommentCode: addCommentResult.data.noticeCommentCodeSuper,
              cCommentCode: addCommentResult.data.noticeCommentCode,
              url: `http://localhost:3000/notice/noticeView/${formData.postCode}`,
            };
            await addNoticeNotification(notiData);

            console.log("댓글 작성자랑 달라서 알림 감!");
          } else {
            alert("같은사용자는 알림 안감");
          }
        }
      }

      await getCommentHandler(code);
      e.target.commentDesc.value = null;
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const addBookmarkHandler = async () => {
    console.log(user);
    if (postData.noticeCode) {
      const formData = {
        boardName: "notice",
        postCode: postData.noticeCode,
        token: user?.token,
      };
      console.log(formData);

      const result = await addBookmarkAPI(formData);
      if (!result.data) {
        alert("이미 북마크가 등록되어 있습니다.");
      }
      alert("북마크가 등록 되었습니다.");
    }
  };

  const likeBtnHandler = async () => {
    if (user?.token) {
      const formData = {
        postCode: code,
        token: user?.token,
      };
      const result = await updateLikeNoticeAPI(formData);
      if (result.data) {
        // 좋아요 버튼이 눌려서 추가가 성공되면 ! 혹은 삭제하면 !
        // await getPostHandler(code);
        setLikeCount(likeCount + 1);
      } else {
        console.log("삭제 코드 들어옴");
        setLikeCount(likeCount - 1);
      }
    } else {
      alert("로그인 필요합니다.");
    }
  };

  const updateCommentHandler = async (code) => {
    if (code == currClickBtn) {
      code = -1;
    }

    setCurrClickBtn(code);
  };

  const updateSuccHandler = () => {
    setSuccUpdate(true);
  };

  const deleteCommentHandler = async (commentCode) => {
    // 댓글 삭제 해주는...코..드...

    await deleteCommentAPI(commentCode);
    await getCommentHandler(code);
  };

  const selected_Comment_handler = () => {
    // 대댓글 작성을 하지 않기 위해 아예 부모 값 전달을 하지 않아버리면 됨
    setSelected_Comment(0);
  };

  const updateHandler = (e) => {
    navigate(`../update/5/${code}}`);
  };

  const deleteHandler = async (e, id) => {
    await deleteNoticeAPI(code);
    navigate("../");
  };

  useEffect(() => {
    const handler = async () => {
      console.log("페이지 시작..");
      await getPostHandler(code);
      await getCommentHandler(code);
    };
    handler();
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (succUpdate) {
        const formData = { commentCode: currClickBtn, commentDesc: content };
        const result = await updateCommentAPI(formData);
        if (result.data) {
          setSuccUpdate(false);
          setCurrClickBtn(-1);
          getCommentHandler(code);
        }
      }
    };
    handler();
  }, [succUpdate]);

  const ScrollToTopBtn = () => {
    window.scrollTo(0, 0);
  };

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
              <Link to={`../`}>공지사항▷</Link>
              <div className="title-area">
                <h2>{postData?.noticeTitle}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div
                className="profile-img"
                onClick={() => {
                  navigate(`/userpage/${postData.member.id}`);
                }}
              >
                <img src={yaonge} alt="배너 이미지" />

                <div className="profile-area">
                  <div className="writer-info">
                    <div className="writer">{postData?.member?.nickname}</div>
                  </div>
                  <div className="article-info">
                    <span>{dateFormatDefault(postData?.noticeDate)}</span>
                    <span>ㆍ조회{postData?.noticeViews}</span>
                    {/* <span>ㆍ댓글{postData?.noticeCommentCount}</span> */}

                    <span>ㆍ좋아요{likeCount}</span>
                  </div>
                </div>
              </div>
              <div className="article-tool">
                <button className="comment-count-btn">
                  [ <span>{postData?.noticeCommentCount}</span> ]
                </button>
                <button className="url-copy-btn">URL복사</button>
                <button
                  onClick={() => {
                    addBookmarkHandler();
                  }}
                >
                  북마크!!
                </button>
              </div>
            </div>
          </div>
          <div className="article-container">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: String(postData?.noticeDesc),
              }}
            />
            <div className="likeBtn">
              <button onClick={likeBtnHandler}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{
                    color: "white",
                    margin: "0px 5px",
                    fontSize: "20px",
                  }}
                />
                좋아요
              </button>
            </div>
            <div className="comment-box">
              <div className="commentBox">
                <div className="commentProfile">
                  {user?.memberImg ? (
                    <img src={user?.memberImg}></img>
                  ) : (
                    <img src={yaonge}></img>
                  )}
                </div>
                <CommentComponent props={0} ref={addCommentHandler} />
              </div>
              <div className="commentBox2">
                <ul>
                  {comments?.map((comment) =>
                    comment?.noticeCommentCodeSuper > 0 ? null : (
                      <li key={comment?.noticeCommentCode}>
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
                                <p> {comment?.noticeCommentDesc}</p>
                              </div>
                            </div>
                            <div className="comment-last">
                              <div className="commentDate-btn ">
                                <div>
                                  {dateFormatDefault(
                                    comment?.noticeCommentDate
                                  )}
                                </div>
                                {comment?.member.id === user?.id ? (
                                  <CommentBtnComponent
                                    code={comment?.noticeCommentCode}
                                    writer={comment?.member?.id}
                                    updateCommentHandler={updateCommentHandler}
                                    deleteCommentHandler={deleteCommentHandler}
                                  />
                                ) : null}
                              </div>
                            </div>

                            {currClickBtn === comment?.noticeCommentCode ? (
                              comment?.member?.id === user?.id ? (
                                <UpdateCommentComponent
                                  setContent={setContent}
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
                              selected_Comment == comment?.noticeCommentCode ? (
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
                                      comment?.noticeCommentCodeSuper <
                                      0 ? null : comment.noticeCommentCodeSuper !==
                                        selected_Comment ? null : (
                                        <li key={comment.noticeCommentCode}>
                                          <div className="recomment-desc">
                                            <ReCommentComponent
                                              member={comment.member}
                                              desc={comment.noticeCommentDesc}
                                              date={comment.noticeCommentDate}
                                            />
                                            {comment?.member?.id ===
                                            user?.id ? (
                                              <CommentBtnComponent
                                                code={
                                                  comment?.noticeCommentCode
                                                }
                                                writer={comment?.member.id}
                                                updateCommentHandler={
                                                  updateCommentHandler
                                                }
                                                deleteCommentHandler={
                                                  deleteCommentHandler
                                                }
                                              />
                                            ) : null}
                                          </div>
                                          {currClickBtn ==
                                          comment.noticeCommentCode ? (
                                            comment?.member.id === user?.id ? (
                                              <UpdateCommentComponent
                                                setContent={setContent}
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
                                    id={`${comment.noticeCommentCode}`}
                                    onClick={(e) => {
                                      setSelected_Comment(
                                        comment.noticeCommentCode
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
          {user?.authority === "ADMIN" ? (
            <div
              className="left-btn"
              // style={{ display: viewBtn ? "block" : "none" }}
            >
              <button
                className="update-btn"
                onClick={updateHandler}
                value={postData?.commonCode}
              >
                수정
              </button>
              <button
                className="delete-btn"
                onClick={deleteHandler}
                value={postData?.commonCode}
              >
                삭제
              </button>
            </div>
          ) : null}

          <div className="right-btn">
            <button className="list-btn">
              <Link to={`../`}>목록</Link>
            </button>
            <button className="top-btn" onClick={ScrollToTopBtn}>
              △위로
            </button>
          </div>
        </div>
      </MainContentBox>
      {user ? null : <Link to={`../noticeView/${code}`} />}
    </MainStlye>
  );
};
export default NoticeView;
