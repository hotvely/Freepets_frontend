import React, { useState, useEffect } from "react";
import styled from "styled-components";
import banner from "../../../resources/bannerTest.png";
import hamster from "../../../resources/hamster.test.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";
import { getLostList, getSearchLostList } from "../../../api/community";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { dateFormatDefault } from "../../../api/utils";
import Page from "../../../components/Page";
import { useSelector, useDispatch } from "react-redux";
import { getTokenCookie } from "../../../api/cookie";
import { userLogout } from "../../../components/store/userSlice";

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
        flex: 1 0 15%;
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
            justify-content: space-between;
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
    padding-top: 20px;
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

const LMediaList = () => {
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const [totalPages, setTotalPages] = useState();
  const [orderBy, setOrderBy] = useState(1);
  const [searchType, setSearchType] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState();
  const [mediae, setMediae] = useState([]);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = searchPage != null ? searchPage : 1;

  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      console.log("쿠키 있!");
      if (state.user != {}) {
        return state.user;
      }
      return JSON.parse(localStorage.getItem("user"));
    } else {
      if (localStorage.getItem("user")) {
        console.log("호출..?");
        dispatch(userLogout());
      }
    }
  });

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

  const navWrite = () => {
    navigate("/community/lost/create");
  };

  const MediaListAPI = async () => {
    // 게시글 목록 데이터
    // setMediae([...mediae, ...result.data]);
    const result = await getLostList(page, orderBy);
    setMediae(result.data.lostList);
    setTotalPages(result.data.totalPages);
  };

  const MediaSearchListAPI = async () => {
    try {
      const result = await getSearchLostList(
        page,
        searchKeyword,
        searchType,
        orderBy
      );
      console.log("글이 들어와?" + result.data.lostList);
      setMediae(result.data.lostList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("검색 에러: ", error);
    }
  };

  useEffect(() => {
    if (searchKeyword != null) {
      MediaSearchListAPI();
    } else {
      MediaListAPI();
    }
  }, [page, orderBy, searchKeyword, searchType]);

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
            <select onChange={sortChangeHandler} value={orderBy}>
              <option value="1">최신순</option>
              <option value="2">추천순</option>
              <option value="3">댓글순</option>
              <option value="4">조회순</option>
            </select>
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
        <div className="main-article">
          {mediae && mediae.length > 0 ? (
            <div className="main-content">
              <div className="media-colum">
                {mediae.map((media, index) => (
                  <div className="media-content" key={index}>
                    <div className="media-thumbnail">
                      {console.log(media.lostDesc.match(/<img\s+src\s*=\s*['"]([^'"]*)['"]/)?.[1])}
                      <Link to={`/community/lost/lostview/${media?.lostCode}`}>
                        <p>
                          <img
                            src={
                              media.lostDesc.match(/<img\s+src\s*=\s*['"]([^'"]*)['"]/)?.[1] !== undefined ?
                              media.lostDesc.match(/<img\s+src\s*=\s*['"]([^'"]*)['"]/)?.[1] : hamster
                            }
                            alt="미디어썸네일"
                          />
                        </p>
                      </Link>
                    </div>
                    <div className="media-info">
                      <div className="media-info-first-line">
                        <Link
                          to={`/community/lost/lostview/${media?.lostCode}`}
                          id="media-info-title"
                        >
                          <h3>{media?.lostTitle}</h3>
                        </Link>
                        <div id="media-info-comment">
                          <p>
                            [<span>{media?.lostCommentCount}</span>]
                          </p>
                        </div>
                      </div>

                      <div id="media-info-writer">
                        <p>{media?.member?.nickname}</p>
                        <p>
                          조회
                          <span id="viewCount">{media?.lostViewCount}</span>회
                          ㆍ추천
                          <span id="LikeCount">{media?.lostLikeCount}</span>회
                        </p>
                      </div>

                      <div id="media-info-detail">
                        <p>
                          <span>{dateFormatDefault(media?.lostDate)}</span>
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
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        <div className="main-bottom">
          <div className="paging-bar">
            <Page totalPages={totalPages} page={page} />
          </div>
          {user !== undefined ?
            <div id="write-btn">
              <button onClick={navWrite}>글쓰기</button>
            </div> : null
          }
        </div>
      </MainContentBox>
    </MainStlye>
  );
};

export default LMediaList;
