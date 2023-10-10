import React from "react";
import styled from "styled-components";
import banner from "../../resources/bannerTest.png";
import pebble from "../../resources/pebble.jpg";
import chestnut from "../../resources/hamster.test.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

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

        #media-thumbnail {
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

          #media-info-title {
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

const Media = () => {
  const onClickCheckBoard = () => {
    window.location.href = "#";
    // 게시글 타입 변경
  };

  const onClickListBoard = () => {
    window.location.href = "#";
    // 게시글 타입 변경
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
              <select>
                <option value="1" selected>
                  최신순
                </option>
                <option value="2">추천순</option>
                <option value="3">댓글순</option>
                <option value="4">조회순</option>
              </select>
            </div>

            <div className="media-sort-category">
              <select className="category">
                <option value="1" selected>
                  모든펫츠
                </option>
                <option value="2">반려펫츠</option>
                <option value="3">스트릿펫츠</option>
                <option value="4">찾아줘요펫츠</option>
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
            </div>
          </div>
          <div className="media-colum">
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
            </div>
          </div>
          <div className="media-colum">
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
                  <img src={null} alt="미디어썸네일" />
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
                  <img src={null} alt="미디어썸네일" />
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
                  <img src={null} alt="미디어썸네일" />
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
            <a href="#">
              <button>글쓰기</button>
            </a>
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};

export default Media;
