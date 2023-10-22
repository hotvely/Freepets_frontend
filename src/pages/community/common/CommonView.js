import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import banner from "../../../resources/bannerTest.png";
import { Link } from "react-router-dom";
import { getCommunity, deleteCommunity } from "../../../api/community";

const MainStlye = styled.div`
  padding: 20px;
  width: 100%;
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

const MainContentBox = styled.div``;

const CommonView = () => {
  const [post, setPost] = useState();
  const { code } = useParams();

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

  const onUpdateHandler = () => {};
  const DeleteCommunityAPI = async (id) => {
    console.log(id);
    await deleteCommunity(id);
  };

  const bottomBtnComponent = () => {
    const user = useSelector((state) => state.user);
    const canDelete = post && post.member && post.member.id === user.id;
    return (
      <div className="article-bottom-btn">
        <button
          className="delete-btn"
          style={{ display: canDelete ? "block" : "none" }}
          onClick={DeleteCommunityAPI}
        >
          삭제
        </button>
      </div>
    );
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
              <Link to={`/community`}>자유게시판</Link>
              <div className="title-area">
                <h2>{post?.commonTitle}</h2>
              </div>
            </div>
            <div className="writer-info">
              <div className="profile-img">{/* <Link to></Link> */}</div>
              <div className="profile-area">
                <div className="writer-info">
                  <div className="writer">{post?.member?.nickname}</div>
                  <div className="writer-contact">1:1채팅</div>
                </div>
                <div className="article-info">
                  <span>{post?.commonDate}</span>
                  <span>조회{post?.commonViewCount}</span>
                </div>
              </div>
              <div className="article-tool">
                <button>
                  [<span>{post?.commonCommentCount}</span>]
                </button>
                <button>URL복사</button>
              </div>
            </div>
          </div>
          <div className="article-container">
            <div className="article-viewer">{post?.commonDesc}</div>
            <div className="comment-box"></div>
          </div>
        </div>
        {/* {post?.memberDTO.id == data.id ? (
          <button className="update-btn" onClick={onUpdateHandler}>
          수정
          </button>
        */}
        <div className="article-bottom-btn">
          <button
            className="delete-btn"
            style={{ display: canDelete ? "block" : "none" }}
            onClick={DeleteCommunityAPI}
          >
            삭제
          </button>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};
export default CommonView;
