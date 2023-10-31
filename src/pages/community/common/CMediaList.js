import React, { useState, useEffect } from "react";
import styled from "styled-components";
import banner from "../../../resources/bannerTest.png";
import hamster from "../../../resources/hamster.test.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";
import {
  getCommunityList,
  getSearchCommunityList,
} from "../../../api/community";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { dateFormatDefault } from "../../../api/utils";
import CommunityList from "./CommonList";
import Page from "../../../components/Page";

const MainStlye = styled.div`
  padding: 10px;
  width: 100%;
  margin-left: 20px;
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
  /* display: flex;
  flex-direction: column; */
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

  .main-content {
    /* width:70vw; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    margin: 10px;
    width: 100%-10px;
    gap: 10px;
    /* padding: 10px; */
    /* margin-right: 10px; */
    .media-colum {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      flex-wrap: wrap;
      grid-gap: 10px;
      .media-content {
        /* width: 100%; */
        flex: 1 0 15%;
        /* width: 20%; */
        /* padding-top: 10px;
      padding-left: 10px; */
        /* border: solid 2px #eeee; */
        background-color: #eeee;
        height: 300px;

        .media-thumbnail {
          height: 240px;

          img {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
        }

        .media-info {
          width: 250px;
          height: 70px;

          .media-info-first-line {
            display: flex;
            align-items: center;
            height: 25px;
            h3 {
              padding-right: 3px;
              font-size: 1rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 200px; /* 원하는 최대 너비 설정 */
            }
            p {
              color: tomato;
              font-size: 1rem;
            }
          }
          #media-info-writer {
            display: flex;
            align-items: center;
            padding: 2px;
            p {
              padding-top: 2px;
              font-size: 0.8rem;
            }
          }

          #media-info-detail {
            padding-top: 2px;
            padding-left: 2px;
            p {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }

  .main-bottom {
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding-top: 20px; */
    /* border-top: 1px solid #3a98b9; */

    .paging-bar {
      flex-grow: 1;
      text-align: center;
    }
    #write-btn {
      /* display: flex;
      justify-content: end; */
      button {
        font-weight: bold;
        color: #3a98b9;
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;

const CMediaList = () => {
  const param = useParams();
  console.log(param);

  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const [totalPages, setTotalPages] = useState();
  const [orderBy, setOrderBy] = useState(1);
  const [searchType, setSearchType] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState();
  const [mediae, setMediae] = useState([]);
  const [ListBtn, setListBtn] = useState();
  const navigate = useNavigate();
  // const [selectBoard, setSelectBoard] = useState(1);
  console.log(param.ListBtn);
  const page = searchPage != null ? searchPage : 1;

  const onClickList = (e) => {
    // 게시글 타입 변경
    console.log(e.currentTarget.id);
    setListBtn(e.currentTarget.id);
  };

  const sortChangeHandler = (event) => {
    const selectedOrderBy = event.currentTarget.value;
    setOrderBy(selectedOrderBy);
    console.log(selectedOrderBy);
    if (searchKeyword != null) {
      MediaSearchListAPI();
    } else {
      MediaListAPI();
    }
  };

  const searchSortChangeHandler = (event) => {
    const selectedSearchOrderBy = event.currentTarget.value;
    console.log(selectedSearchOrderBy);
    setSearchType(selectedSearchOrderBy);
  };

  // const navRowClick = (row) => {
  //   //ViewPage로 이동
  //   navigate(`/community/common/commonview/${row.original.commonCode}`);
  // };

  const navWrite = () => {
    navigate("/community/common/create");
  };

  const naviViewComment = (commonCode) => {
    // commonView페이지의 댓글란으로 넘어가기
    navigate(`/commonview/${commonCode}`);
  };

  const activateComments = (commonCode) => {
    naviViewComment(commonCode);
    const mainCommentElement = document.querySelector(".main-comment");
    if (mainCommentElement) {
      mainCommentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const MediaListAPI = async () => {
    // 게시글 목록 데이터
    // setMediae([...mediae, ...result.data]);
    const result = await getCommunityList(page, orderBy);
    setMediae(result.data.communityList);
    setTotalPages(result.data.totalPages);
  };

  const MediaSearchListAPI = async () => {
    try {
      const result = await getSearchCommunityList(
        page,
        searchKeyword,
        searchType
        // orderBy
      );
      setMediae(result.data.communityList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("검색 에러: ", error);
    }
  };

  useEffect(() => {
    if (param.ListBtn) setListBtn(param.ListBtn);
    MediaListAPI();
  }, []);

  useEffect(() => {
    if (searchKeyword != null) {
      MediaSearchListAPI();
    } else {
      MediaListAPI();
    }
  }, [page, orderBy, searchKeyword, searchType]);

  const boardTypeForMedia = () => {
    if (mediae && mediae.length > 0) {
      return (
        <div className="main-content">
          <div className="media-colum">
            {mediae.map((media, index) => (
              <div className="media-content" key={index}>
                <div className="media-thumbnail">
                  <Link
                    to={`/community/common/commonview/${media?.commonCode}/${ListBtn}`}
                  >
                    <p>
                      <img
                        src={
                          hamster
                          // media.commonDesc.substring(
                          // media.commonDesc.indexOf('<img src="') + 10,
                          // media.commonDesc.indexOf('">'))
                        }
                        alt="미디어썸네일"
                      />
                    </p>
                  </Link>
                </div>
                <div className="media-info">
                  <div className="media-info-first-line">
                    <Link
                      to={`/community/common/commonview/${media?.commonCode}/${ListBtn}`}
                      id="media-info-title"
                    >
                      <h3>{media?.commonTitle}</h3>
                    </Link>
                    <div
                      id="media-info-comment"
                      onClick={() => {
                        activateComments(media?.commonCode);
                      }}
                    >
                      <p>
                        [<span>{media?.commonCommentCount}</span>]
                      </p>
                    </div>
                  </div>

                  <div id="media-info-writer">
                    <p>{media?.member?.nickname}</p>
                  </div>

                  <div id="media-info-detail">
                    <p>
                      <span>{dateFormatDefault(media?.commonDate)}</span>
                      ㆍ조회수
                      <span id="viewCount">{media?.commonViewCount}</span>회
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {Array(3 - (mediae.length % 3))
              .fill(null)
              .map((_, index) => (
                <div className="empty-space" key={mediae.length + index}>
                  &nbsp;
                </div>
              ))}
          </div>
          <div className="main-bottom">
            <div className="paging-bar">
              <Page totalPages={totalPages} page={page} />
            </div>
            <div id="write-btn">
              <button onClick={navWrite}>글쓰기</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          검색 결과가 없습니다.
        </div>
      );
    }
  };

  return (
    <MainStlye>
      <MainBanner>
        <div className="banner-img">
          <img src={banner} alt="배너 이미지" />
        </div>
      </MainBanner>

      <MainContentBox>
        <div className="midea-headerbox">
          <div className="media-sort">
            <div className="media-sort-like">
              <select onChange={sortChangeHandler} value={orderBy}>
                <option value="1">최신순</option>
                <option value="2">추천순</option>
                <option value="3">댓글순</option>
                <option value="4">조회순</option>
              </select>
            </div>

            <div className="view-board">
              <div className="view-check-board">
                <button onClick={onClickList} id="1">
                  <FontAwesomeIcon
                    icon={faBorderAll}
                    style={{ color: "#3a98b9", height: "18px" }}
                  />
                </button>
              </div>
              <div className="view-list-board">
                <button onClick={onClickList} id="2">
                  <FontAwesomeIcon
                    icon={faList}
                    style={{ color: "3a98b9", height: "16px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="search-box">
            <select onChange={searchSortChangeHandler}>
              <option value="1">제목+내용</option>
              <option value="2">제목</option>
              <option value="3">내용</option>
            </select>

            <input
              type="search"
              id="search"
              name="search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={MediaSearchListAPI}>검색</button>
          </div>
        </div>

        {ListBtn == 1 ? (
          boardTypeForMedia()
        ) : (
          <CommunityList
            props={{ orderBy, searchType, searchKeyword, ListBtn }}
          />
        )}
      </MainContentBox>
    </MainStlye>
  );
};

export default CMediaList;
