import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneBoard, deleteBoard, likeAddorDelete } from "../../api/info";
import { useNavigate } from "react-router-dom";
import banner from "../../resources/bannerTest.png";
import yange from "../../resources/yaonge.jpg";
import { Link } from "react-router-dom";
import { dateFormatDefault } from "../../api/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "../notice/CommentComponent";

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

  useEffect(() => {
    boardViewAPI();
  }, [])

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
            <div className="comment-box">
              <CommentComponent />
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
    </MainStlye>
  );
};
export default HospitalReviewView;