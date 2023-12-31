import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneBoard, 
        deleteBoard, 
        likeAddorDelete, 
        getHrComment,
        getHrCommentOne,
        addComment,
        deleteComment,
        updateComment } from "../../api/info";
import { addBookmarkAPI } from "../../api/bookmark";
import { useNavigate } from "react-router-dom";
import banner from "../../resources/bannerTest.png";
import yaonge from "../../resources/yaonge.jpg";
import { Link } from "react-router-dom";
import { dateFormatDefault } from "../../api/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "../../components/comment/CommentComponent";
import CommentBtnComponent from "../../components/comment/CommentBtnComponent";
import ReCommentComponent from "../../components/comment/ReCommentComponent";
import UpdateCommentComponent from "../../components/comment/UpdateCommentComponent";
import { addhospitalRevieNotification }  from "../../components/Notification";
import ProfileComponent from "../../components/member/ProfileComponent";
import {
  MainStlye,
  MainBanner,
  MainContentBox,
} from "../../components/css/PostView";
import HospitalMap from "./HospitalMap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../components/store/userSlice";
import { getTokenCookie } from "../../api/cookie";

const HospitalReviewView = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [boardView, setBoardView] = useState();
  const [like, setLike] = useState();
  const [comments, setComments] = useState([]);
  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selectedComment, setSelectedComment] = useState(0);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (Object.keys(state.user).length !== 0) {
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        dispatch(userLogout());
      }
    }
  });

  const ScrollToTopBtn = () => {
    window.scrollTo(0, 0);
  };

  const boardViewAPI = async () => {
    const resultBoard = await getOneBoard(code);
    setBoardView(resultBoard.data);
    setLike(resultBoard.data.likeCount);
  };

  const onUpdateClick = async () => {
    navigate(`../${code}/update/4`);
  };

  const onDeleteClick = async () => {
    const response = window.confirm("정말로 삭제하시겠습니까?");
    if (response) {
      await deleteBoard(code);
      navigate("../");
    }
  };

  const onLikeBtn = async () => {
    const formData = new FormData();
    formData.append("hospitalReview.hospitalReviewCode", code);
    formData.append("member.id", data?.id);
    const result = await likeAddorDelete(formData);
    setLike(result.data.likeCount);
  };

  const onBookMarkBtn = async () => {
    const formData = {
      boardName: "hospitalReview",
      postCode: code,
      token: data?.token,
    };

    const result = await addBookmarkAPI(formData);
    if (!result.data) {
      alert("이미 북마크에 등록되었습니다.");
    } else alert("북마크에 등록되었습니다.");
  };

  const getCommentHandler = async (code) => {
    const resultComment = await getHrComment(code);
    setComments([...resultComment.data]);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const parentCode = e.target.commentDesc.id;
    const formData = {
      token: data?.token,
      boardName: "hospitalReview",
      postCode: code,
      parentCommentCode: parentCode,
      commentDesc: e.target.commentDesc.value,
    };

    if (formData.commentDesc) {
      const commentResult = await addComment(formData);
      if(parentCode > 0) {
        const result = await getHrCommentOne(parentCode);
        if(result?.data?.member?.id != data.id) {
          const notiData = {
            id: result?.data?.member?.id,
            postCode: formData.postCode,
            pCommentCode: commentResult.data.superHrCommentCode,
            cCommentCode: commentResult.data.hrCommentCode,
            url: `http://localhost:3000/hospital/view/${formData.postCode}`,
          };
          await addhospitalRevieNotification(notiData);
        }
      } else {
        if(boardView?.memberDTO?.id != data.id) {
          const notiData = {
            id: boardView?.memberDTO?.id,
            postCode: formData.postCode,
            pCommentCode: commentResult.data.superHrCommentCode,
            cCommentCode: commentResult.data.hrCommentCode,
            url: `http://localhost:3000/hospital/view/${formData.postCode}`,
          };

          await addhospitalRevieNotification(notiData);
        }
      }
      
      await getCommentHandler(code);
      e.target.commentDesc.value = null;
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const updateCommentHandler = async (id) => {
    if (id == currClickBtn) {
      id = -1;
    }
    setCurrClickBtn(id);
  };

  const updateSuccHandler = () => {
    setSuccUpdate(true);
  };

  const deleteCommentHandler = async (commentCode) => {
    const response = window.confirm("정말로 삭제하시겠습니까?");
    if (response) {
      await deleteComment(commentCode);
      await getCommentHandler(code);
    }
  };

  const selectCommentHandler = () => {
    setSelectedComment(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const asyncHandler = async () => {
      boardViewAPI();
      getCommentHandler(code);
    };
    asyncHandler();
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (succUpdate) {
        const formData = {
          commentCode: currClickBtn,
          commentDesc: content,
        };
        const result = await updateComment(formData);
        if (result.data) {
          setSuccUpdate(false);
          setCurrClickBtn(-1);
          getCommentHandler(code);
        }
      }
    };
    handler();
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
              <Link to={`../`}>병원 정보 게시판▷</Link>
              <div className="title-area">
                <h2>{boardView?.title}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">
                <img src={boardView?.memberDTO?.memberImg !== null ? boardView?.memberDTO?.memberImg : yaonge} alt="유저 이미지" />

                <div className="profile-area">
                  <div className="writer-info">
                    <div className="writer">
                      {boardView?.memberDTO?.nickname}
                    </div>
                  </div>
                  <div className="article-info">
                    <span>{dateFormatDefault(boardView?.date)}</span>
                    <span>ㆍ조회 {boardView?.viewCount}</span>
                    <span>ㆍ좋아요 {like}</span>
                  </div>
                </div>
              </div>
              <div className="article-tool">
                <button className="comment-count-btn">
                  [ <span>{boardView?.commentCount}</span> ]
                </button>
                <button className="bookmark" onClick={onBookMarkBtn}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{ fontSize: "1.5rem", color: "#ddd" }}
                  />
                </button>
              </div>
            </div>
            <div className="hospital-container">
              <div id="hospitalName"># {boardView?.hospitalName}</div>
              <div id="hospitalAddress">{boardView?.hospitalAddress}</div>
            </div>
          </div>
          <div className="article-container">
            <div className="hospitalMap-container">
              <HospitalMap hospitalAddress={boardView?.hospitalAddress} />
            </div>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: String(boardView?.desc),
              }}
            />
            <div className="likeBtn">
              <button onClick={onLikeBtn}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{
                    color: "white",
                    margin: "0px 5px",
                    fontSize: "20px",
                  }}
                />
                {like}
              </button>
            </div>
            <div className="comment-box">
              <div className="commentBox">
                <div className="commentProfile">
                  <img src={data?.memberImg !== null ? data?.memberImg : yaonge}></img>
                </div>
                <CommentComponent props={0} ref={addCommentHandler} />
              </div>
              <div className="commentBox2">
                <ul>
                  {comments?.map((comment) =>
                    comment?.superHrCommentCode > 0 ? null : (
                      <li key={comment.hrCommentCode}>
                        <div className="comment">
                          <div className="comment-content">
                            <div className="comment-desc">
                              <ProfileComponent props={comment?.member} />
                              <div className="commentTextBox">
                                <p> {comment?.hrCommentDesc}</p>
                              </div>
                            </div>
                            <div className="comment-last">
                              <div className="commentDate-btn ">
                                <div>
                                  {dateFormatDefault(comment?.hrCommentDate)}
                                </div>
                                {data?.id == comment?.member.id ? (
                                  <CommentBtnComponent
                                    code={comment?.hrCommentCode}
                                    writer={comment?.member?.id}
                                    updateCommentHandler={updateCommentHandler}
                                    deleteCommentHandler={deleteCommentHandler}
                                  />
                                ) : null}
                              </div>
                            </div>
                            {currClickBtn === comment?.hrCommentCode ? (
                              comment?.member?.id === data?.id ? (
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
                              selectedComment == comment?.hrCommentCode ? (
                                <div>
                                  <button
                                    className="commentView_btn"
                                    onClick={selectCommentHandler}
                                  >
                                    댓글 보기 닫기
                                  </button>
                                  <ul>
                                    {comments?.map((comment) =>
                                      comment?.superHrCommentCode <
                                      0 ? null : comment.superHrCommentCode !=
                                        selectedComment ? null : (
                                        <li key={comment.hrCommentCode}>
                                          <div className="recomment-desc">
                                            <ReCommentComponent
                                              member={comment.member}
                                              desc={comment.hrCommentDesc}
                                              date={comment.hrCommentDate}
                                            />
                                            {data?.id == comment.member.id ? (
                                              <CommentBtnComponent
                                                code={comment?.hrCommentCode}
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
                                          comment.hrCommentCode ? (
                                            comment?.member.id == data?.id ? (
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
                                    props={selectedComment}
                                    ref={addCommentHandler}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <button
                                    className="commentView_btn"
                                    id={`${comment.hrCommentCode}`}
                                    onClick={(e) => {
                                      setSelectedComment(comment.hrCommentCode);
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
          {boardView?.memberDTO?.id == data?.id ? (
            <div
              className="left-btn"
            >
              <button
                className="update-btn"
                onClick={onUpdateClick}
                value={boardView?.commonCode}
              >
                수정
              </button>
              <button
                className="delete-btn"
                onClick={onDeleteClick}
                value={boardView?.commonCode}
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
    </MainStlye>
  );
};
export default HospitalReviewView;
