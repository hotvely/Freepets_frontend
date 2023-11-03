import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getHospitalBoard, getsearchSelect, getLikeOrder, getCommentOrder } from "../../../src/api/info";
import banner from "../../resources/bannerTest.png";
import yaonge from "../../resources/yaonge.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { dateFormatTrans } from "../../api/utils";

const MainStyle = styled.div`
  margin: 0px 40px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;

  .venner {
    padding: 0px 10px;
    width: 100%;
    img {
      width: 100%;
    }
  }
  
`;
const MainBox = styled.div`
  padding: 20px 10px;
  width: 100%;
  border: 1px solid #b1deec;
  margin-top: 30px;

  .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .option {
      margin: 0px 40px;
      display: flex;
      width: 18%;
      select {
        width: 100%;
        height: 30px;
        font-size: 1.1rem;
        border-radius: 5px;
        padding: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        text-align: center;
        background-color: #ededed;
        color: #3a98b9;
        border: none;
      }

      .write-button {
        width: 100%;
        border-radius: 5px;
        border: none;
        color: #3a98b9;
        font-weight: bold;
        background-color: #ededed;
      }
    }
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      flex: 0 1 40%;
      margin: 20px 30px;
      /* font-size: 1.2rem; */
      label {
        margin: 5px;
        font-size: 1.57rem;
        font-weight: bold;
        color: black;
      }
      input {
        margin: 5px;
        width: 200px;
        height: 30px;
        border: 0;
        border-radius: 25px;
        background-color: lightblue;
      }
    }
  }
`;
const MainHeader = styled.header`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;

  .header-end {
    display: flex;
    background-color: #ededed;
    align-items: center;
    border-radius: 10px;
    height: 30px;

    .header-end-label {
      margin-right: 5px;

      label {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3a98b9;
        margin-right: 5px;
      }
    }

    #search {
      background-color: #ededed;
      border: none;
    }

    button {
      border: none;
      cursor: pointer;
    }
  }

  select {
    width: 90px;
    height: 30px;
    text-align: center;
    border: none;
    border-radius: 10px;
    color: #3a98b9;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #ededed;
  }

  .button-write {
    width: 90px;
    height: 30px;
    border: none;
    margin-left: 10px;
    border-radius: 10px;
    color: #3a98b9;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #ededed;
    cursor: pointer;
  }
`;
const MainContent = styled.main`
  width: 100%;

  section {
    margin: 10px;
  }

  .main-content {
    padding: 20px 10px;
    border-bottom: 1px solid #ededed;

    &:hover {
      background-color: #EDF5FF;
    }

    .main-content-view {
      display: flex;
      justify-content: space-between;

      .main-content_start {
        display: flex;

        .main-content_start-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;

          div {
            #hrTitle {
              margin-bottom: 10px;
              font-weight: bold;
            }
          }

          .main-content_start-hospital {
            display: flex;
            margin-bottom: 20px;

            #hospitalName {
              background-color: #98DBF2;
              padding: 5px;
              border-radius: 5px;
              font-size: 0.8rem;
            }
          }

          .main-content_start-desc-name {
            display: flex;

            #nickname {
              padding: 5px;
              border: 1px solid #dedede;
              border-radius: 5px;
              font-size: 0.8rem;
            }
          }
        }
      }

      .main-content_end {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          font-size: 1rem;
          color: #B0B0B0;
          margin-left: 60px;
        }

        .viewicon {
          color: black;
          font-weight: bold;

          #like {
            margin-left: 5px;
            margin-right: 5px;
          }

          #views {
            margin-left: 5px;
            margin-right: 5px;
          }

          #comment {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

const HospitalReview = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get('page');
  const [boards, setBoard] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [select1, setSelect1] = useState(1);
  const [select2, setSelect2] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const page = searchPage != null ? searchPage : 1;

  const NavWrite = () => {
    navigator("create");
  };

  const NavView = (e) => {
    navigator(`view/${e.currentTarget.id}`);
  }

  const getHospitalBoardAPI = async () => {
    const result = await getHospitalBoard(page);
    setBoard(result.data.hospitalReviewList);
    setTotalPages(result.data.totalPages);
  };
  
  const searchClickHandler = async () => {
    let result = null;
    if(select2 == 1) {
      result = await getsearchSelect(page, keyword, 1);
    } else {
      result = await getsearchSelect(page, keyword, 2);
    }    
    setBoard(result.data.hospitalReviewList);
    setTotalPages(result.data.totalPages);
  };

  const selectType = async () => {
    switch(eval(select1)) {
      case 1:
        getHospitalBoardAPI(page);
        break;
      case 2:
        const resultLike = await getLikeOrder(page);
        setBoard(resultLike.data.hospitalReviewList);
        setTotalPages(resultLike.data.totalPages);
        break;
      case 3:
        const resultComment = await getCommentOrder(page);
        setBoard(resultComment.data.hospitalReviewList);
        setTotalPages(resultComment.data.totalPages);
        break;
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    if(keyword != null) {
      searchClickHandler();
    } else {
      selectType();
    }
  }, [page, keyword, select1, select2]);

  return (
    <MainStyle>
      <div className="venner">
        <img src={banner}></img>
      </div>
      <MainBox>
      <MainHeader>
          <div className="header-start">
            <select onChange={(e) => setSelect1(e.target.value)}>
              <option value="1">최신순</option>
              <option value="2">추천순</option>
              <option value="3">댓글수</option>
            </select>
            <button className="button-write" onClick={NavWrite}>
              글쓰기
            </button>
          </div>
          <div className="header-end">
            <div className="header-end-label">
              <select onChange={(e) => setSelect2(e.target.value)}>
                <option value="1">병원 조회</option>
                <option value="2">지역 조회</option>
              </select>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#3a98b9" }}
                onClick={searchClickHandler}
              />
            </button>
          </div>
      </MainHeader>
      <MainContent>
        <section>
          {boards.map((item) => (
            <div className="main-content" key={item.hospitalReviewCode}>
            <div
              className="main-content-view"
              onClick={NavView}
              id={item.hospitalReviewCode}
              >
                <div className="main-content_start">
                  <img
                    src={item.member.memberImg != null ? item.member.memberImg : yaonge}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  ></img>
                  <div className="main-content_start-desc">
                    <div>
                      <p id="hrTitle">{item.hospitalReviewTitle}</p>
                    </div>
                    <div className="main-content_start-hospital">
                      <p id="hospitalName"># {item.hospitalName}</p>
                    </div>
                    <div className="main-content_start-desc-name">
                      <p id="nickname">{item.member.nickname}</p>
                    </div>
                  </div>
                </div>
                <div className="main-content_end">
                  <p>
                    <span id="hrDate">{dateFormatTrans(item.hospitalReviewDate)}</span>
                  </p>
                  <div className="viewicon">
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#98DBF2" }} />
                    <span id="like">{item.hospitalReviewLike}</span>
                    <FontAwesomeIcon icon={faEye} style={{ color: "#98DBF2" }} />
                    <span id="views">{item.hospitalReviewViews}</span>
                    <FontAwesomeIcon icon={faComments} style={{ color: "#98DBF2" }} />
                    <span id="comment">{item.hospitalReviewCommentCount}</span>
                  </div>
              </div>
            </div>
          </div>
          ))}         
          </section>
      </MainContent>
      </MainBox>
      <Page 
        page={page}
        totalPages={totalPages}
      />
    </MainStyle>
  );
};
export default HospitalReview;
