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
  updateCommunity,
  deleteCommunity,
} from "../../../api/community";
import { dateFormatDefault } from "../../../api/utils";
import CommentComponent from "../../notice/CommentComponent";

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
          }
          button:hover {
            color: #3a98b9;
          }
        }
      }
    }
    .article-container {
      .article-viewer {
        min-height: 300px;
        margin-bottom: 20px;
      }
      .comment-box {
        border-top: 1px solid #3a98b9;
      }
    }
  }
  .article-bottom-btn {
    display: flex;
    justify-content: space-between;
  }
`;

const CommonView = () => {
  const [post, setPost] = useState();
  const { code } = useParams();
  const navigate = useNavigate();

  const CommunityPostAPI = async (id) => {
    const result = await getCommunity(id);
    setPost(result.data);
  };

  useEffect(() => {
    const asyncHandler = async () => {
      await CommunityPostAPI(code);
    };

    if (code) {
      asyncHandler();
    }
  }, [code]);

  const UpdateCommunityAPI = (e) => {
    const id = e.target.value;
    console.log(id);
    navigate(`../${id}/update/1`);
  };

  const DeleteCommunityAPI = async (event) => {
    const id = event.target.value;
    console.log(id);
    await deleteCommunity(id);
  };
  const user = useSelector((state) => state.user);
  const viewBtn = post && post.member && post.member.id === user.id;

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
              <Link to={`/community`}>자유게시판▷</Link>
              <div className="title-area">
                <h2>{post?.commonTitle}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">
                <img src={yange} alt="배너 이미지" />
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
                <button className="url-copy-btn">URL복사</button>
              </div>
            </div>
          </div>
          <div className="article-container">
            <div
              className="article-viewer"
              dangerouslySetInnerHTML={{ __html: String(post?.commonDesc) }}
            />
            <div className="comment-box">
              <CommentComponent />
            </div>
          </div>
        </div>
        <div className="article-bottom-btn">
          <div
            className="left-btn"
            style={{ display: viewBtn ? "block" : "none" }}
          >
            <button
              className="update-btn"
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
          <div className="right-btn">
            <button className="list-btn">
              <Link to={`/community`}>목록</Link>
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
export default CommonView;
