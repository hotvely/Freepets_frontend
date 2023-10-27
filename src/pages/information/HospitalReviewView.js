import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneBoard, deleteBoard, likeAddorDelete, getHrComment, addComment,deleteComment } from "../../api/info";
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
import { addNoticeNotification } from "../../components/Notification";
import ProfileComponent from "../../components/member/ProfileComponent";
import {
  MainStlye,
  MainBanner,
  MainContentBox,
} from "../../components/css/PostView";


const HospitalReviewView = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [boardView, setBoardView] = useState();
  const [like, setLike] = useState();
  const [comments, setComments] = useState([]);
  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selectedComment, setSelectedComment] = useState(0);
  
  const data = JSON.parse(localStorage.getItem('user'));

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
  }

  const onDeleteClick = async () => {
    const response = window.confirm('정말로 삭제하시겠습니까?');
    if(response) {
      await deleteBoard(code);
      navigate('../');
    }
  };

  const onLikeBtn = async () => {
    const formData = new FormData();
    formData.append('hospitalReview.hospitalReviewCode', code);
    formData.append('member.id', data.id);
    const result = await likeAddorDelete(formData);
    setLike(result.data.likeCount);
  };

  const onBookMarkBtn = async () => {
    const formData = {
      boardName: 'hospitalReview',
      postCode: code,
      token: data.token,
    };

    const result = await addBookmarkAPI(formData);
    if(!result.data) {
      alert("이미 북마크에 등록되었습니다.");
    } else alert("북마크에 등록되었습니다.");
    
  };

  const getCommentHandler = async (code) => {
    const resultComment = await getHrComment(code);
    setComments([...resultComment.data]);
  };

  const addCommentHandler = async (e) => {
    console.log(e.target.commentDesc.id)
    e.preventDefault();
    const parentCode = e.target.commentDesc.id;
    const formData = {
      token: data.token,
      boardName: 'hospitalReview',
      postCode: code,
      parentCommentCode: parentCode,
      commentDesc: e.target.commentDesc.value
    };

    if(formData.commentDesc) {
      const commentResult = await addComment(formData);

      const notiData = {
        token: data.token,
        postCode: formData.postCode,
        pCommentCode: commentResult.data.superHrCommentCode,
        cCommentCode: commentResult.data.hrCommentCode,
        url: `http://localhost:3000/hr/view/${formData.postCode}`,
      };
      await addNoticeNotification(notiData);
      await getCommentHandler(code);
      e.target.commentDesc.value = null;
    } else {
      alert('댓글 작성 후 등록 버튼을 눌러 주세요!');
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
    await deleteComment(commentCode);
    await getCommentHandler(code);
  };

  const selectCommentHandler = () => {
    setSelectedComment(0);
  };

  useEffect(() => {
    const asyncHandler = async () => {
      boardViewAPI();
      getCommentHandler(code);
    }
    asyncHandler();
  }, []);

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
              <Link to={`../`}>병원 정보 게시판▷</Link>
              <div className="title-area">
                <h2>{boardView?.title}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">
                <img src={yaonge} alt="배너 이미지" />

                <div className="profile-area">
                  <div className="writer-info">
                    <div className="writer">{boardView?.memberDTO?.nickname}</div>
                  </div>
                  <div className="article-info">
                    <span>{dateFormatDefault(boardView?.date)}</span>
                    <span>ㆍ조회 {boardView?.viewCount}</span>
                    <span>ㆍ좋아요 {boardView?.likeCount}</span>
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
                  style={{fontSize: "1.5rem",
                  color: "#ddd"}}/>
                </button>
              </div>
            </div>
          </div>
          <div className="article-container">
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
                  <img src={yaonge}></img>
                </div>
                <CommentComponent props={0} ref={addCommentHandler} />
              </div>
              <div className="commentBox2">
                <ul>
                  {comments?.map((comment) =>
                    comment?.superHrCommentCode > 0 ? null : (
                      <li key={comment.hrCommentCode}>
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
                                <p> {comment?.hrCommentDesc}</p>
                              </div>
                            </div>
                            <div className="comment-last">
                              <div className="commentDate-btn ">
                                <div>
                                  {dateFormatDefault(comment?.hrCommentDate)}
                                </div>
                                <CommentBtnComponent
                                  code={comment?.hrCommentCode}
                                  writer={comment?.member?.id}
                                  updateCommentHandler={updateCommentHandler}
                                  deleteCommentHandler={deleteCommentHandler}
                                />
                              </div>
                            </div>
                            {currClickBtn === comment?.hrCommentCode ? (
                              comment?.member?.id === data.id ? (
                                <UpdateCommentComponent
                                  code={comment?.hrCommentCode}
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
                              selectedComment == comment?.hrCommentCode ? (
                                <div>
                                  {
                                    // 댓글 작성 닫기 버튼을 누르게 되면 기존에 저장하고 있는 상태값 숫자를 리셋해 줘야함 set(0)하면 코드 컴파일 도중 실행 되니까.. handler만들어서
                                  }

                                  <button
                                    className="commentView_btn"
                                    onClick={selectCommentHandler}
                                  >
                                    댓글 보기 닫기
                                  </button>
                                  {/* 대댓글 호출 로직 */}
                                  <ul>
                                    {comments?.map((comment) =>
                                      comment?.superHrCommentCode <
                                      0 ? null : comment.superHrCommentCode !=
                                        selectedComment ? null : (
                                        <li key={comment.hrCommentCode}>
                                          <div className="recomment-desc">
                                            <ReCommentComponent
                                              props={comment}
                                            />

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
                                          </div>
                                          {currClickBtn ==
                                          comment.hrCommentCode ? (
                                            comment?.member.id == data.id ? (
                                              <UpdateCommentComponent
                                                code={
                                                  comment?.hrCommentCode
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
                                    props={selectedComment}
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
                                    id={`${comment.hrCommentCode}`}
                                    onClick={(e) => {
                                      setSelectedComment(
                                        comment.hrCommentCode
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
        {boardView?.memberDTO?.id == data.id ? 
        <div
        className="left-btn"
        // style={{ display: viewBtn ? "block" : "none" }}
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
      </div> : null
        }
          
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