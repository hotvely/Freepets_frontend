// import styles from "../components/Community.module.css";
import styled from "styled-components";
import banner from "../../../resources/bannerTest.png";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { getCommunityList } from "../../../api/community";
import CommunityTableForList from "../../../components/Community/CommunityTableForList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

const MainStyle = styled.div`
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

const MainContentBox = styled.div`
  border: 1px solid #3a98b9;
  width: 100%;
  .midea-headerbox {
    border-bottom: 1px solid #3a98b9;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .media-sort {
      margin-right: 5px;
      display: flex;
      /* flex: row; */
      /* justify-content: start; */
      padding: 10px;

      select {
        width: 100%;
        height: 30px;
        border-radius: 10px;
        border: none;
        color: #3a98b9;
        font-weight: bold;
        background-color: #eeee;
      }

      .media-sort-like {
        padding-right: 10px;
      }
      .view-board {
        display: flex;
        .view-check-board {
          padding-left: 10px;
          padding-right: 10px;
        }
        button {
          background-color: #eeee;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 10px;
        }
      }
    }

    .search-box {
      display: flex;
      /* flex-direction: row; */
      /* justify-content: end; */
      align-items: center;
      width: 400px;
      height: 30px;
      padding-right: 15px;

      select {
        padding-left: 3px;
        width: 25%;
        height: 100%;
        border: none;
        background-color: #eeee;
        color: #3a98b9;
        font-weight: bold;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      input {
        width: 60%;
        height: 100%;
        border: solid 2px #eeee;
      }
      button {
        width: 15%;
        height: 100%;
        border: none;
        color: #3a98b9;
        font-weight: bold;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  div {
    display: flex;
    justify-content: space-around;
  }
`;

const onClickCheckBoard = () => {
  window.location.href = "/community/common/cmedialist";
  // 게시글 타입 변경
};

const onClickListBoard = () => {
  window.location.href = "/community/common/commonlist";
  // 게시글 타입 변경
};

// const MainStyle = styled.main`
//   /* display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin: 0 50px;
//   /* height: 100vw; */
//   align-items: center;
//   */ .select {
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .option {
//       flex: 0 1 15%;
//       margin: 20px 50px;
//       select {
//         width: 100%;
//         height: 30px;
//         font-size: 1.1rem;
//       }
//     }
//     .search {
//       display: flex;
//       flex-direction: row;
//       align-items: center;
//       justify-content: end;
//       flex: 0 1 40%;
//       margin: 20px 30px;
//       /* font-size: 1.2rem; */
//       label {
//         margin: 5px;
//         font-size: 1.57rem;
//         font-weight: bold;
//         color: black;
//       }
//       input {
//         margin: 5px;
//         width: 200px;
//         height: 30px;
//         border: 0;
//         border-radius: 25px;
//         background-color: lightblue;
//       }
//     }
//   }
// `;

// const ContentStyle = styled.div`
//   width: 100%;
//   //border: 5px solid black; //#C1F1FC;
// /*
//   section {
//     margin: 50px 50px; */

//     hr {
//       border: 0px;
//       border-top: 4px dotted lightblue;
//     }
//   }
// `;

// const PostStyle = styled.div`
//   width: 100%;
//   height: 100px;
//   display: flex;
//   /* align-items: center; */
//   margin: 20px 0;

//   flex-direction: row;
//   .memberPhoto {
//     flex: 0 1 10%;
//     margin: 0 15px;

//     img {
//       width: 50px;
//       height: 50px;
//       border-radius: 50%;
//     }
//   }
//   .postInfo {
//     flex: 0 1 75%;

//     .userInfo {
//       display: flex;
//       flex-direction: row;
//       justify-content: space-between;
//       align-items: center;

//       #nickName {
//         line-height: 200%;
//         padding: 0 10px;
//         background-color: black;
//         color: white;
//         border-radius: 15px;
//         font-size: 1.2rem;
//         font-weight: bold;
//       }
//       #date {
//         margin-right: 20px;
//         font-size: 1.2rem;
//       }
//     }
//     .postTitle {
//       font-size: 1.25rem;
//       font-weight: bold;
//       margin: 8px 0;
//       title {
//       }
//     }
//     .postIcons {
//       display: flex;
//       flex-direction: row;
//       margin-top: 10px;
//       font-size: 1.1rem;
//       div {
//         margin-right: 15px;
//       }
//     }
//   }
//   /* .postBtn {
//     display: flex;
//     flex-direction: row;
//     justify-content: end;
//     align-items: center;
//     flex: 0 0 15%;

//     button {
//       width: 50px;
//       height: 50px;
//       background-color: skyblue;
//       color: black;
//       font-size: 1rem;
//       border: 2px solid darkgray;
//       text-decoration: none;
//       font-weight: bold;
//       border-radius: 15px;
//       margin-right: 5px;
//       outline: none;
//     }
//   } */
// `;

const PagingStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  a {
    padding: 5px;
  }
`;

const CommunityList = () => {
  const [commonPost, setcommonPosts] = useState([]);
  const [page, setPage] = useState(1);
  const CommunityListAPI = async () => {
    // 게시글 목록 데이터
    const result = await getCommunityList(page);
    setcommonPosts([...commonPost, ...result.data]);
  };

  useEffect(() => {
    CommunityListAPI(); // 게시글 목록 조회 호출
  }, []);

  const columns = useMemo(
    () => [
      { accessor: "commonCode", Header: "게시글번호" },
      { accessor: "commonTitle", Header: "제목" },
      { accessor: "id", Header: "닉네임" },
      { accessor: "commonDate", Header: "작성일" },
      { accessor: "commonViewCount", Header: "조회수" },
      { accessor: "commonLikeCount", Header: "좋아요" },
    ],
    []
  );
  const data = useMemo(
    () =>
      commonPost.map((post) => ({
        commonCode: post.commonCode,
        commonTitle: post.commonTitle,
        id: post.member.id,
        commonDate: post.commonDate,
        commonViewCount: post.commonViewCount,
        commonLikeCount: post.commonLikeCount,
      })),
    []
  );
  return (
    <MainStyle>
      <MainBanner>
        <div className="banner-img">
          <img src={banner} alt="배너 이미지" />
        </div>
      </MainBanner>

      <MainContentBox>
        <div className="midea-headerbox">
          <div className="media-sort">
            <div className="media-sort-like">
              <select>
                <option value="1">최신순</option>
                <option value="2">추천순</option>
                <option value="3">댓글순</option>
                <option value="4">조회순</option>
              </select>
            </div>
            <div className="view-board">
              <div className="view-check-board">
                <button onClick={onClickCheckBoard}>
                  <FontAwesomeIcon
                    icon={faBorderAll}
                    style={{ color: "#3a98b9", height: "18px" }}
                  />
                </button>
              </div>
              <div className="view-list-board">
                <button onClick={onClickListBoard}>
                  <FontAwesomeIcon
                    icon={faList}
                    style={{ color: "3a98b9", height: "16px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="search-box">
            <select>
              <option value="1">게시글+댓글</option>
              <option value="2">게시글</option>
              <option value="3">댓글</option>
            </select>

            <input type="search" id="search" name="search" />
            <button>검색</button>
          </div>
        </div>

        <ContentStyle>
          <CommunityTableForList columns={columns} data={data} />;
          {/* <div className="postBtn">
              <button style={{ backgroundColor: "lightyellow" }}>수정</button>
              <button style={{ backgroundColor: "pink" }}>삭제</button>
            </div> */}
        </ContentStyle>
      </MainContentBox>
      <PagingStyle>
        <div>
          <a href="#"> Prev</a>
          <a href="#">Num</a>
          <a href="#">Next</a>
        </div>
      </PagingStyle>
    </MainStyle>
  );
};
export default CommunityList;
