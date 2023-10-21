import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getHospitalBoard } from "../../../src/api/info";
import banner from "../../resources/bannerTest.png";
import testImg from "../../resources/image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
      padding-left: 10px;

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
            #sitterTitle {
              font-weight: bold;
              margin-bottom: 10px;
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
        margin-right: 5px;

        p {
          font-size: 1.5rem;
          color: orange;
          -webkit-text-stroke: 1px orange;

          #sitterPrice {
            margin-right: 5px;
          }
        }

        button {
          width: 100px;
          padding: 5px;
          border: 1px solid #3a98b9;
          border-radius: 5px;
          background-color: white;
          color: #3a98b9;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
`;

const HospitalReview = () => {
  const navigator = useNavigate();
  const [boards, setBoard] = useState([]);
  const NavWrite = () => {
    navigator("hospital/create");
  };

  const getHospitalBoardAPI = async () => {
    const result = await getHospitalBoard(1);
    setBoard([...boards, ...result.data]);
  };

  useEffect(() => {
    getHospitalBoardAPI();
  }, []);

  return (
    <MainStyle>
      <div className="venner">
        <img src={banner}></img>
      </div>
      <MainBox>
      <MainHeader>
          <div className="header-start">
            <select>
              <option value="1">최신순</option>
              <option value="2">추천순</option>
              <option value="3">조회수</option>
            </select>
            <button className="button-write">
              글쓰기
            </button>
          </div>
          <div className="header-end">
            <div className="header-end-label">
              <label htmlFor="search">병원 조회</label>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ color: "#3a98b9" }}
              />
            </div>
            <input
              type="text"
              id="search"
              name="search"
            />
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#3a98b9" }}
              />
            </button>
          </div>
        </MainHeader>
      <MainContent>
      <section>
      <div className="main-content">
                <div
                  className="main-content-view"
                >
                  <div className="main-content_start">
                    <img
                      src={testImg}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    ></img>
                    <div className="main-content_start-desc">
                      <div>
                        <p id="sitterTitle">제목</p>
                      </div>
                      <div
                        className="main-content_start-desc-name"
                        
                      >
                        <p id="nickname">닉네임</p>
                      </div>
                    </div>
                  </div>
                  <div className="main-content_end">
                    <p>
                      <span id="sitterPrice">2023-10-22</span>
                    </p>
                    <div className="viewicon">
                      <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#1FB1D1" }} />
                      <span id="like">50</span>{" "}
                      <FontAwesomeIcon icon={faEye} style={{ color: "#1FB1D1" }} />
                      <span id="views">150</span>
                      <FontAwesomeIcon icon={faComments} style={{ color: "#1FB1D1" }} />
                      <span id="comment">30</span>
                  </div>
                  </div>
                </div>
              </div>
              </section>
      </MainContent>
      </MainBox>
      {/* <Page /> */}
    </MainStyle>
  );
};
export default HospitalReview;
