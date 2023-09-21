import styled from "styled-components";
import banner from "../resources/bannerTest.png";
import testImg from "../resources/image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
const StyledMain = styled.main`
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
    .board_title {
      font-weight: bold;
      font-size: 2rem;
      margin: 30px 0;
    }
  }
  .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .option {
      flex: 0 1 15%;
      margin: 20px 50px;
      select {
        width: 100%;
        height: 30px;
        font-size: 1.1rem;
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

const MainContent = styled.div`
  width: 100%;
  //border: 5px solid black; //#C1F1FC;

  section {
    margin: 50px 50px;

    hr {
      border: 0px;
      border-top: 4px dotted lightblue;
    }

    .post {
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
    }
  }
`;

const Paging = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  a {
    padding: 5px;
  }
`;
const Lost = () => {
  return (
    <StyledMain>
      <div className="venner">
        <img src={banner}></img>
        <div className="board_title">커뮤니티 게시판</div>
      </div>
      <div className="select">
        <div className="option">
          <select>
            <option value="1">추천 순</option>
            <option value="2">댓글 순</option>
            <option value="3">조회 순</option>
          </select>
        </div>
        <div className="search">
          <label>검색</label>
          <input type="text" id="search" name="search" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#138CA7", margin: "0px 5px" }}
          />
        </div>
      </div>

      <MainContent>
        <section>
          <div className="post">
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
            <div className="postBtn">
              <button style={{ backgroundColor: "lightyellow" }}>수정</button>
              <button style={{ backgroundColor: "pink" }}>삭제</button>
            </div>
          </div>
          <hr className="hr-dotted" />
          <div className="post">
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
            <div className="postBtn">
              <button style={{ backgroundColor: "lightyellow" }}>수정</button>
              <button style={{ backgroundColor: "pink" }}>삭제</button>
            </div>
          </div>
          <hr className="hr-dotted" />{" "}
          <div className="post">
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
            <div className="postBtn">
              <button style={{ backgroundColor: "lightyellow" }}>수정</button>
              <button style={{ backgroundColor: "pink" }}>삭제</button>
            </div>
          </div>
          <hr className="hr-dotted" />{" "}
          <div className="post">
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
            <div className="postBtn">
              <button style={{ backgroundColor: "lightyellow" }}>수정</button>
              <button style={{ backgroundColor: "pink" }}>삭제</button>
            </div>
          </div>
          <hr className="hr-dotted" />
        </section>
      </MainContent>
      <Paging>
        <div>
          <a href="#"> Prev</a>
          <a href="#">Num</a>
          <a href="#">Next</a>
        </div>
      </Paging>
    </StyledMain>
  );
};
export default Lost;
