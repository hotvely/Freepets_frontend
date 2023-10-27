import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../../../resources/bannerTest.png";
import yange from "../../../resources/yaonge.jpg";
import { Link } from "react-router-dom";
import {
  getCommunity,
  // updateCommunity,
  deleteCommunity,
  getCommentsAPI,
  addCommunityComment,
  deleteCommunityComment,
} from "../../../api/community";
import { dateFormatDefault } from "../../../api/utils";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CommentComponent from "../../../components/comment/CommentComponent";
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

  const CommunityPostAPI = async (id) => {
    const result = await getCommunity(id);
    setPost(result.data);
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
  const user = useSelector((state) => state.user);
  const viewBtn = post && post.member && post.member.id === user.id;

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

  const getCommentHandler = async (code) => {
    const result = await getCommentsAPI(code);
    setComments([...result.data]);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
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
      const commonData = {
        token: user.token,
        postCode: formData.postCode,
        pCommentCode: addCommentResult.data.commonCommentCodeSuper,
        cCommenntCode: addCommentResult.data.commonCommentCode,
        url: `http://localhost:3000/community/commonView/${formData.postCode}`,
      };
      await addNotificationAPI(commonData);
      await getCommentHandler(code);
      e.target.commentDesc.value = null;
    } else {
      alert("댓글 작성후 등록하세요");
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

  useEffect(() => {
    const asyncHandler = async () => {
      CommunityPostAPI(code);
      getCommentHandler(code);
    };
    asyncHandler();
  }, []);

  useEffect(() => {
    const asyncHandler = async () => {
      await CommunityPostAPI(code);
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
              <button>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#FF6969" }} />
                {" 추천 "}
                {post?.commonLikeCount}
              </button>
              {console.log(post?.commonLikeCount)}
            </div>
            <div className="comment-box">
              <CommentComponent props={0} ref={addCommentHandler} />
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
