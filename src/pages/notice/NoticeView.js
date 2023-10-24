import styled from "styled-components";
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
  getBoardViewAPI,
  getCommentsAPI,
  updateLikeNoticeAPI,
  updateNoticeAPI,
} from "../../api/notice";
import CommentComponent from "../../components/comment/CommentComponent";
import ReCommentComponent from "../../components/comment/ReCommentComponent";
import { addBookmarkAPI } from "../../api/bookmark";
import { useSelector } from "react-redux";
import UpdateCommentComponent from "../../components/comment/UpdateCommentComponent";
import {
  addNoticeNotification,
  addNotification,
} from "../../components/Notification";
import CommentBtnComponent from "../../components/comment/CommentBtnComponent";
import StyledMain from "../../components/css/StyledMain";
import ProfileComponent from "../../components/member/ProfileComponent";

const NoticeView = () => {
  const { code } = useParams();
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);

  const [likeCount, setLikeCount] = useState();

  const [currClickBtn, setCurrClickBtn] = useState(-1);
  const [succUpdate, setSuccUpdate] = useState(false);
  const [selected_Comment, setSelected_Comment] = useState(0);

  const user = useSelector((state) => {
    return state.user;
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

        // 댓글 작성 비동기 함수가 돌기 때문에.. 여기서 알림 DB 추가 해주면 됨
        const notiData = {
          token: user.token,

          postCode: formData.postCode,
          pCommentCode: addCommentResult.data.noticeCommentCodeSuper,
          cCommentCode: addCommentResult.data.noticeCommentCode,
          url: `http://localhost:3000/notice/noticeView/${formData.postCode}`,
        };
        await addNoticeNotification(notiData);

        // const postData = {};
        // await updateNoticeAPI(postData);

        await getCommentHandler(code);
        e.target.commentDesc.value = null;
      } else {
        alert("댓글 작성후 등록하세요");
      }
    } else {
      alert("로그인이 필요합니다");
    }
  };

  const addBookmarkHandler = async () => {
    if (postData.noticeCode) {
      const formData = {
        boardName: "notice",
        postCode: postData.noticeCode,
        token: user.token,
      };

      addBookmarkAPI(formData);
    }
  };
  const likeBtnHandler = async () => {
    if (user.token) {
      const formData = {
        postCode: code,
        token: user.token,
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

  useEffect(() => {
    const handler = async () => {
      await getPostHandler(code);
      await getCommentHandler(code);
    };
    handler();
  }, []);

  useEffect(() => {
    if (succUpdate) {
      setSuccUpdate(false);
      setCurrClickBtn(-1);
      getCommentHandler(code);
    }
  }, [succUpdate]);

  const dateFormatter = (data) => {
    if (data) {
      const date = new Date(`${data}`);

      const result =
        date.getFullYear() +
        "-" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        date.getDate();
      return result;
    }
  };

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
          {postData ? <ProfileComponent props={postData.member} /> : null}

          <div className="viewicon">
            <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#1FB1D1" }} />
            <span id="like">{likeCount}</span>{" "}
            <FontAwesomeIcon icon={faEye} style={{ color: "#1FB1D1" }} />
            <span id="views">{postData?.noticeViews}</span>
            <FontAwesomeIcon icon={faComments} style={{ color: "#1FB1D1" }} />
            <span id="comment">{postData?.noticeCommentCount}</span>
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
            onClick={addBookmarkHandler}
          />
        </div>
      </div>
      <div className="descHeader">
        <h1>{postData?.noticeTitle}</h1>
      </div>
      <div className="desc">
        <div
          id="noticeDesc"
          dangerouslySetInnerHTML={{ __html: String(postData?.noticeDesc) }}
        />
      </div>
      <div className="likeBtn">
        <button onClick={likeBtnHandler}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{
              color: "#1FB1D1",
              margin: "0px 5px",
              fontSize: "20px",
            }}
          />
          좋아요 + 1
        </button>
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
            comment?.noticeCommentCodeSuper > 0 ? null : (
              <li className="userProfile" key={comment.noticeCommentCode}>
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
                        {comment?.noticeCommentDesc}
                      </div>
                      <div className="commentDate-btn ">
                        <div>{dateFormatter(comment?.noticeCommentDate)}</div>
                        <CommentBtnComponent
                          code={comment?.noticeCommentCode}
                          writer={comment?.member?.id}
                          updateCommentHandler={updateCommentHandler}
                          deleteCommentHandler={deleteCommentHandler}
                        />
                      </div>
                    </div>
                    {currClickBtn === comment?.noticeCommentCode ? (
                      comment?.member?.id === user.id ? (
                        <UpdateCommentComponent
                          code={comment?.noticeCommentCode}
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
                                <li key={comment}>
                                  <div className="recomment-desc">
                                    <ReCommentComponent props={comment} />

                                    <CommentBtnComponent
                                      code={comment?.noticeCommentCode}
                                      writer={comment?.member.id}
                                      updateCommentHandler={
                                        updateCommentHandler
                                      }
                                      deleteCommentHandler={
                                        deleteCommentHandler
                                      }
                                    />
                                  </div>
                                  {currClickBtn == comment.noticeCommentCode ? (
                                    comment?.member.id === user.id ? (
                                      <UpdateCommentComponent
                                        code={comment?.noticeCommentCode}
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
