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
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
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
    padding-top: 20px;
    /* border-top: 1px solid #3a98b9; */

    .page {
      flex-grow: 1;
      text-align: center;
      .pagination {
        display: flex;
        justify-content: center;
        flex-direction: row;
        text-align: center;
        list-style: none;
        display: inline-block;

        a {
          float: left;
          display: block;
          font-size: 14px;
          text-decoration: none;
          padding: 5px 12px;
          color: #96a0ad;
          line-height: 1.5;
        }
        a:active {
          cursor: default;
          color: #ffffff;
          outline: none;
        }
        #first:hover,
        #last:hover,
        #arrow-left:hover,
        #arrow-right:hover {
          color: #2e9cdf;
        }

        #num {
          /* margin-left: 3px; */
          -moz-border-radius: 100%;
          -webkit-border-radius: 100%;
          border-radius: 100%;
        }
        #num:hover {
          background-color: #2e9cdf;
          color: #ffffff;
        }
        #num.active {
          background-color: #2e9cdf;
          cursor: pointer;
        }
      }
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
  const navigate = useNavigate();

  const page = searchPage != null ? searchPage : 1;

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
        searchType
        // orderBy
      );
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
                {mediae.map((media) => (
                  // <Link to={"/commonview/" + media.commonCode}>
                  <div className="media-content" key={media?.lostCode}>
                    <div className="media-thumbnail">
                      <Link to={`/community/lost/lostview/${media?.lostCode}`}>
                        <p>
                          <img
                            src={media.lostDesc.substring(
                              media.lostDesc.indexOf('<img src="') + 10,
                              media.lostDesc.indexOf('">')
                            )}
                            alt="미디어썸네일"
                          />
                        </p>
                      </Link>
                    </div>
                    <div className="media-info">
                      <div className="media-info-first-line">
                        <Link
                          to={"/lostview/" + media?.lostCode}
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
                      </div>

                      <div id="media-info-detail">
                        <p>
                          <span>{dateFormatDefault(media?.lostDate)}</span>
                          ㆍ조회수
                          <span id="viewCount">{media?.lostViewCount}</span>회
                        </p>
                      </div>
                    </div>
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
          <div id="write-btn">
            <button onClick={navWrite}>글쓰기</button>
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};

export default LMediaList;
