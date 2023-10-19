import React, { useState, useEffect } from "react";
import styled from "styled-components";
import banner from "../../../resources/bannerTest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

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
    /* flex-wrap: wrap; */
    margin: 10px;
    width: 100%-10px;
    gap: 10px;
    /* padding: 10px; */
    /* margin-right: 10px; */
    .media-colum {
      display: flex;
      flex-direction: row;
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

    .page {
      flex-grow: 1;
      text-align: center;
      .pagination {
        display: flex;
        justify-content: center;
        /* flex-direction: row; */
        /* text-align: center; */
        list-style: none;
        /* display: inline-block; */

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

const CMediaList = () => {
  const [mediae, setMediae] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const onClickCheckBoard = () => {
    window.location.href = "#";
    // 게시글 타입 변경
  };

  const onClickListBoard = () => {
    window.location.href = "/lost";
    // 게시글 타입 변경
  };

  const NaviViewComment = (commonCode) => {
    // commonView페이지의 댓글란으로 넘어가기
    navigate(`/commonview/${commonCode}`);
  };

  const activateComments = (commonCode) => {
    NaviViewComment(commonCode);
    const mainCommentElement = document.querySelector(".main-comment");
    if (mainCommentElement) {
      mainCommentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const MediaListAPI = async () => {
  //   // 게시글 목록 데이터
  //   const result = await getMediaList(page);
  //   setMediae([...mediae, ...result.data]);
  // };

  // useEffect(() => {
  //   MediaListAPI(); // 게시글 목록 조회 호출
  // }, []);

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
              <select>
                <option value="1">최신순</option>
                <option value="2">추천순</option>
                <option value="3">댓글순</option>
                <option value="4">조회순</option>
              </select>
            </div>

            <div className="media-sort-category">
              <select className="category">
                <option value="1">모든펫츠</option>
                <option value="2">반려펫츠</option>
                <option value="3">스트릿펫츠</option>
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

        <div className="main-content">
          <div className="media-colum">
            {mediae.map((media) => (
              // <Link to={"/commonview/" + media.commonCode}>
              <div className="media-content" key={media.commonCode}>
                <Link
                  to={"/commonview/" + media.commonCode}
                  className="media-thumbnail"
                >
                  <p>
                    <img
                      src={media.commonDesc.substring(
                        media.commonDesc.indexOf('<img src="') + 10,
                        media.commonDesc.indexOf('">')
                      )}
                      alt="미디어썸네일"
                    />
                  </p>
                </Link>

                <div className="media-info">
                  <div className="media-info-first-line">
                    <Link
                      to={"/commonview/" + media.commonCode}
                      id="media-info-title"
                    >
                      <h3>{media.commonTitle}</h3>
                    </Link>
                    <div
                      id="media-info-comment"
                      onClick={() => {
                        activateComments(media.commonCode);
                      }}
                    >
                      <p>
                        [<span>{media.commonCommentCount}</span>]
                      </p>
                    </div>
                  </div>

                  <div id="media-info-writer">
                    <p>{media.member.nickname}</p>
                  </div>

                  <div id="media-info-detail">
                    <p>
                      <span>{media.commonDate}</span>ㆍ조회수
                      <span id="viewCount">{media.commonViewCount}</span>회
                    </p>
                  </div>
                </div>
              </div>
            ))}
            ;
            {/* <div className="media-content">
              <div id="media-thumbnail">
                <a href="#">
                  <img src={chestnut} alt="미디어썸네일" />
                </a>
              </div>

              <div className="media-info">
                <div id="media-info-title">
                  <a href="#">
                    <h3>노릇노릇 군밤이</h3>
                  </a>
                  <a href="#">
                    <p>
                      [<span>7</span>]
                    </p>
                  </a>
                </div>

                <div id="media-info-writer">
                  <p>알밤이</p>
                </div>

                <div id="media-info-detail">
                  <p>
                    <span>2023.09.22</span>ㆍ조회수
                    <span id="viewCount">22</span>회
                  </p>
                </div>
              </div>
            </div>

            <div className="media-content">
              <div id="media-thumbnail">
                <a href="#">
                  <img src={pebble} alt="미디어썸네일" />
                </a>
              </div>

              <div className="media-info">
                <div id="media-info-title">
                  <a href="#">
                    <h3>나를 봐 돌맹</h3>
                  </a>
                  <a href="#">
                    <p>
                      [<span>7</span>]
                    </p>
                  </a>
                </div>

                <div id="media-info-writer">
                  <p>쭈여니</p>
                </div>

                <div id="media-info-detail">
                  <p>
                    <span>2023.09.22</span>ㆍ조회수
                    <span id="viewCount">22</span>회
                  </p>
                </div>
              </div>
            </div>

            <div className="media-content">
              <div id="media-thumbnail">
                <a href="#">
                  <img src={chestnut} alt="미디어썸네일" />
                </a>
              </div>

              <div className="media-info">
                <div id="media-info-title">
                  <a href="#">
                    <h3>노릇노릇 군밤이</h3>
                  </a>
                  <a href="#">
                    <p>
                      [<span>7</span>]
                    </p>
                  </a>
                </div>

                <div id="media-info-writer">
                  <p>알밤이</p>
                </div>

                <div id="media-info-detail">
                  <p>
                    <span>2023.09.22</span>ㆍ조회수
                    <span id="viewCount">22</span>회
                  </p>
                </div>
              </div>
            </div>

            <div className="media-content">
              <div id="media-thumbnail">
                <a href="#">
                  <img src={pebble} alt="미디어썸네일" />
                </a>
              </div>

              <div className="media-info">
                <div id="media-info-title">
                  <a href="#">
                    <h3>나를 봐 돌맹</h3>
                  </a>
                  <a href="#">
                    <p>
                      [<span>7</span>]
                    </p>
                  </a>
                </div>

                <div id="media-info-writer">
                  <p>쭈여니</p>
                </div>

                <div id="media-info-detail">
                  <p>
                    <span>2023.09.22</span>ㆍ조회수
                    <span id="viewCount">22</span>회
                  </p>
                </div>
              </div>
            </div>*/}
          </div>
        </div>

        <div className="main-bottom">
          {/* 페이지 넘기는 바 만들기
         <div id="paging"></div> */}
          <div className="page">
            <ul className="pagination">
              <li>
                <a href="#" id="first">
                  처음 페이지
                </a>
              </li>
              <li>
                <a href="#" id="arrow-left">
                  ◀
                </a>
              </li>
              <li>
                <a href="#" id="active-num">
                  1
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  2
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  3
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  4
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  5
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  6
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  7
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  8
                </a>
              </li>
              <li>
                <a href="#" id="num">
                  9
                </a>
              </li>
              <li>
                <a href="#" id="arrow-right">
                  ▶
                </a>
              </li>
              <li>
                <a href="#" id="last">
                  마지막 페이지
                </a>
              </li>
            </ul>
          </div>
          <div id="write-btn">
            <a href="information/hospital/create">
              <button>글쓰기</button>
            </a>
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};

export default CMediaList;
