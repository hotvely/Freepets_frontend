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

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 50px;
  /* height: 100vw; */
  align-items: center;

  .venner {
    width: 100%;
    img {
      width: 100%;
    }
  }
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
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

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

const ContentStyle = styled.div`
  width: 100%;
  //border: 5px solid black; //#C1F1FC;

  section {
    margin: 20px 20px;

    hr {
      border: 0px;
      border-top: 4px dotted lightblue;
    }
  }
`;

const PostStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  /* align-items: center; */
  margin: 20px 0;

  flex-direction: row;
  .memberPhoto {
    flex: 0 1 10%;
    margin: 0 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .postInfo {
    flex: 0 1 75%;

    .userInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      #nickName {
        line-height: 200%;
        padding: 0 10px;
        background-color: black;
        color: white;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
      }
      #date {
        margin-right: 20px;
        font-size: 1.2rem;
      }
    }
    .postTitle {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 8px 0;
      title {
      }
    }
    .postIcons {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      font-size: 1.1rem;
      div {
        margin-right: 15px;
      }
    }
  }
  .postBtn {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    flex: 0 0 15%;

    button {
      width: 50px;
      height: 50px;
      background-color: skyblue;
      color: black;
      font-size: 1rem;
      border: 2px solid darkgray;
      text-decoration: none;
      font-weight: bold;
      border-radius: 15px;
      margin-right: 5px;
      outline: none;
    }
  }
`;

const PagingStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  a {
    padding: 5px;
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
      <MainHeader>
        <div className="header-start">
          <select>
            <option value="1">추천순</option>
            <option value="2">리뷰순</option>
            <option value="3">낮은 비용</option>
          </select>
          {}
          <button className="button-write" onClick={NavWrite}>
            글쓰기
          </button>
        </div>
        <div className="header-end">
          <div className="header-end-label">
            <label htmlFor="search">시터 조회</label>
            <FontAwesomeIcon icon={faCaretDown} style={{ color: "#3a98b9" }} />
          </div>
          <input type="search" id="search" name="search" />
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#3a98b9" }}
            />
          </button>
        </div>
      </MainHeader>
      <ContentStyle>
        <section>
          <PostStyle>
            <div className="memberPhoto">
              <img src={testImg}></img>
            </div>
            <div className="postInfo">
              <a href="#">
                <div className="userInfo">
                  <div id="nickName">hotvely</div>
                  <div id="date">7일 전</div>
                </div>
                <div className="postTitle">
                  <div className="title">우리집 흰둥이를 찾아주세요~ㅠㅠㅠ</div>
                </div>
                <div className="postIcons">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: "#1FB1D1" }}
                  />
                  <div id="like">50</div>
                  <FontAwesomeIcon icon={faEye} style={{ color: "#1FB1D1" }} />
                  <div id="views">150</div>
                  <FontAwesomeIcon
                    icon={faComments}
                    style={{ color: "#1FB1D1" }}
                  />
                  <div id="comment">30</div>
                </div>
              </a>
            </div>
          </PostStyle>
        </section>
      </ContentStyle>
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
export default HospitalReview;
