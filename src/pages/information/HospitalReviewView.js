import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneBoard, deleteBoard, likeAddorDelete, getHrComment, addComment,deleteComment } from "../../api/info";
import { useNavigate } from "react-router-dom";
import banner from "../../resources/bannerTest.png";
import yange from "../../resources/yaonge.jpg";
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
import StyledMain from "../../components/css/StyledMain";

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
  border: 1px solid #3A98B9;
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
      border-bottom: 1px solid #3A98B9;
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

        .writer-info_start {
          display: flex;

          .profile-img {
            img {
              width: 50px;
              height: 50px;
              border-radius: 50px;
            }
          }
          .profile-area {
            margin-left: 10px;
            font-size: 0.9rem;
            padding-top: 5px;
            .writer-info {
              .writer {
                margin-bottom: 5px;
              }
            }
            .article-info {
              color: #999;
            }
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
            color: #3A98B9;
          }
          .bookmark-btn {
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .bookmark-btn.active {
            color: #FF5733;
          }
        }
      }
    }
    .article-container {
      .ql-editor {
        font-size: 0.9rem;
        margin-bottom: 20px;
      }
      .like-btn {
        display: flex;
        justify-content: center;
        padding-bottom: 10px;

        button {
          padding: 5px;
          border: none;
          border-radius: 5px;
          background-color: #98DBF2;
          color: white;
          margin-bottom: 20px;
        }

        button:hover {
          background-color: #3a98b9;
          cursor: pointer;
        }
      }
      .comment-box {
        border-top: 1px solid #3A98B9;
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
      background-color: #98DBF2;
      color: white;
    }
    button:hover {
      cursor: pointer;
      background-color: #3a98b9;
    }
  }
`;

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

  const onClick = () => {
    
  }

  const moveTheTop = () => {
    window.scrollTo(0, 0);
  }

  const boardViewAPI = async () => {
    const resultBoard = await getOneBoard(code);
    setBoardView(resultBoard.data);
    setLike(resultBoard.data.likeCount);
  }

  const onDeleteClick = async () => {
    const response = window.confirm('정말로 삭제하시겠습니까?');
    if(response) {
      await deleteBoard(code);
      navigate('../');
    }
  }

  const onLikeBtn = async () => {
    const formData = new FormData();
    formData.append('hospitalReview.hospitalReviewCode', code);
    formData.append('member.id', data.id);
    const result = await likeAddorDelete(formData);
    setLike(result.data.likeCount);
  }

  const getCommentHandler = async (code) => {
    const resultComment = await getHrComment(code);
    setComments([...resultComment.data]);
  }

  const addCommentHandler = async (e) => {
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
  }

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
  }, [])

  useEffect(() => {
    if (succUpdate) {
      setSuccUpdate(false);
      setCurrClickBtn(-1);
      getCommentHandler(code);
    }
  }, [succUpdate]);

  return (
    <StyledMain>
      <MainBanner>
        <div className="banner-img">
          <img src={banner} alt="배너 이미지" />
        </div>
      </MainBanner>
      <MainContentBox>
        <div className="article-content-box">
          <div className="article-header">
            <div className="article-title">
              <Link to={`../`}>Information ▷ 병원 정보 게시판</Link>
              <div className="title-area">
                <h2>{boardView?.title}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="writer-info_start">
                <div className="profile-img">
                  <img src={yange} alt="배너 이미지" />
                </div>
                <div className="profile-area">
                  <div className="writer-info">
                    <div className="writer">{boardView?.memberDTO.nickname}</div>
                  </div>
                  <div className="article-info">
                    <span>{dateFormatDefault(boardView?.commonDate)}</span>
                    <span>ㆍ조회 {boardView?.viewCount}</span>
                    <span>ㆍ좋아요 {boardView?.likeCount}</span>
                  </div>
                </div>
              </div>              
              <div className="article-tool">
                <button className="comment-count-btn">
                  [ <span>{boardView?.commentCount}</span> ]
                </button>
                <button className={"bookmark-btn"} onClick={onClick}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{
                      fontSize: "1rem",
                      color: "#eee",
                      marginRight: "10px",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="article-container">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: boardView?.desc }}
            />
            <div className="like-btn">
              <button onClick={onLikeBtn}>
                <FontAwesomeIcon icon={faThumbsUp} style={{ color: "white", marginRight: "5px" }} />
                {like}
              </button>
            </div>
            <div className="commentBox">
        <div className="commentProfile">
          <img src={yange}></img>
        </div>
        <CommentComponent props={0} ref={addCommentHandler} />
      </div>

      <div className="commentBox2">
        <ul className="comment">
          {console.log(comments)}
          {comments?.map((comment) =>
            comment?.superHrCommentCode > 0 ? null : (
              <li className="userProfile" key={comment.hrCommentCode}>
                <div>
                  {
                    // 유저 정보
                  }
                  <div className="comment">
                    <ProfileComponent props={comment?.member} />
                    {
                      // 댓글 정보
                    }
                    <div className="comment-desc">
                      <div className="commentTextBox">
                        {comment?.hrCommentDesc}
                      </div>
                      <div className="commentDate-btn ">
                        <div>{dateFormatDefault(comment?.hrCommentDate)}</div>
                        <CommentBtnComponent
                          code={comment?.hrCommentCode}
                          writer={comment?.member?.id}
                          updateCommentHandler={onClick}
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
                  <div className="reCommentContent">
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
                            onClick={selectedComment}
                          >
                            댓글 보기 닫기
                          </button>
                          {/* 대댓글 호출 로직 */}
                          <ul>
                            {comments?.map((comment) =>
                              comment?.superHrCommentCode <
                              0 ? null : comment.superHrCommentCode !==
                                selectedComment ? null : (
                                <li key={comment}>
                                  <div className="recomment-desc">
                                    <ReCommentComponent props={comment} />

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
                                  {currClickBtn == comment.hrCommentCode ? (
                                    comment?.member.id === data.id ? (
                                      <UpdateCommentComponent
                                        code={comment?.hrCommentCode}
                                        updateCommentHandler={
                                          updateCommentHandler
                                        }
                                        updateSuccHandler={updateSuccHandler}
                                      />
                                    ) : null
                                  ) : null}
                                </li>
                              )
                            )}
                          </ul>

                          <CommentComponent
                            // props={{ num1: currClickComment, num2: 10, num3: 100 }}    //<- 여러개 던질때
                            props={selectCommentHandler}
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
        <div className="article-bottom-btn">
          <div className="left-btn">
            <button className="list-btn" onClick={() => navigate('../')}>
              목록
            </button>
            <button className="top-btn" onClick={moveTheTop}>
              △
            </button>
          </div>
          {boardView?.memberDTO.id == data.id ? 
            <div>
            <button
              className="update-btn"
              onClick={onClick}
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
          </div> : null}
        </div>        
      </MainContentBox>
    </StyledMain>
  );
};
export default HospitalReviewView;