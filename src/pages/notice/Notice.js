import styled from "styled-components";

import banner from "../../../src/resources/bannerTest.png";
import testImg from "../../../src/resources/image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteNoticeAPI,
  getSearchAPI,
  getBoardsByPageAPI,
} from "../../api/notice";
import { useSearchParams } from "react-router-dom";
import Page from "../../components/Page";
import NoticeList from "./NoticeList";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../../components/store/userSlice";

const MainStlye = styled.div`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 1;
`;

const MainBanner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 0 30px;
  flex-basis: 800px;
  .banner-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

const MainContentBox = styled.div`
  border: 1px solid #3a98b9;
  flex-basis: 800px;
  margin-top: 20px;
  /* display: flex;
  flex-direction: column; */

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

const Notice = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [sortNum, setSortNum] = useState(1);
  const [searchNum, setSearchNum] = useState(1);
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (Object.keys(state.user).length !== 0) {
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        console.log("로그아웃 !!!");
        dispatch(userLogout());
      }
    }
  });

  const getSearchBoardHandler = () => {
    const word = document.querySelector("#search").value;
    setKeyword(word);
  };

  const sortOptionHandler = (e) => {
    setSortNum(e.target.value);
  };

  const searchOptionHandler = (e) => {
    setSearchNum(e.target.value);
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
              <select onChange={sortOptionHandler}>
                <option value="1">최신순</option>
                <option value="2">추천순</option>
                <option value="3">댓글순</option>
                <option value="4">조회순</option>
              </select>
            </div>
          </div>

          <div className="search-box">
            <select onChange={searchOptionHandler}>
              <option value="1">제목+내용</option>
              <option value="2">제목</option>
              <option value="3">내용</option>
            </select>

            <input type="search" id="search" name="search" />
            <button onClick={getSearchBoardHandler}>검색</button>
          </div>
        </div>

        <NoticeList props={{ keyword, searchNum, sortNum, setKeyword }} />

        <div className="main-bottom">
          <div className="page"></div>
          <div id="write-btn">
            {user?.authority === "ADMIN" ? (
              <button
                onClick={() => {
                  navigate("/notice/create");
                }}
              >
                글쓰기
              </button>
            ) : null}
          </div>
        </div>
      </MainContentBox>
    </MainStlye>
  );
};
export default Notice;
