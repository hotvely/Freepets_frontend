import React from "react";
import styled from "styled-components";
import banner from "../resources/bannerTest.png";
import pebble from "../resources/pebble.jpg";
import chestnut from "../resources/hamster.test.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

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
    align-items: center;

    .media-sort {
      margin-right: 5px;
      display: flex;
      justify-content: flex-start;
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
        button {
          background-color: tomato;
          width: 50px;
          height: 30px;
          border: none;
        }
      }
    }

    .search-box {
      display: flex;
      justify-content: end;
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
    flex-direction: row-reverse;
    #write-btn {
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
          </div>

          <div className="view-board">
            <button>
              <FontAwesomeIcon icon={faBorderAll} style={{ color: "pink" }} />
            </button>
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
