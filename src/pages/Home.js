import { Link } from "react-router-dom";
import Banner from "../assets/image.png";
import findMe from "../assets/findMe.png";
import styled from "styled-components";
import loupe from "../assets/loupe.png";
import Logo from "../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSave } from "../components/store/userSlice";
const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding: 2.7rem 0;
    color: #68b0c9;
    font-weight: 650;
    align-items: center;
    z-index: 10;
    position: relative;
    a {
      font-size: 1.5rem;
      color: #68b0c9;
      text-decoration: none;
      img {
        width: 11rem;
      }
    }
    .rightNav {
      display: flex;
      a {
        font-size: 1.3rem;
        text-decoration: none;
        color: #68b0c9;
      }
      p {
        margin: 0 0.5rem;
        font-size: 1.3rem;
      }
    }
  }
`;
const StyledMain = styled.main`
  background-color: #68B0C9;
  width: 100%;
  height: 50vh;
  display: flex;

  .leftNav {
    display: flex;
    position: fixed;
    flex-direction: column;
    font-size: 1.3rem;
    margin-left: 3rem;
    font-weight: bold;
    
    a {
      color: #FFF1DC;
      margin: 10px 0px;
    }
  }
  .allMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-left: 4rem;
    
    .searchBar {
      background-color: #eeeeee;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #68b0c9;
      margin-top: 3rem;
      height: 15%;
      font-size: 2rem;
      font-weight: 600;
      border-radius: 10px;
      div {
        display: flex;
        margin-left: 1.5rem;
      }
      img {
        margin-right: 2rem;
      }
    }
    
    .best {
      margin-top: 2rem;
      height: 55%;
      width: 80%;
      display: flex;
      justify-content: space-between;
      .bestInner {
        background-color: #eeeeee;
        width: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        .weeklyBest {
          color: #68b0c9;
          font-size: 2rem;
          font-weight: 600;
          margin-top: 1rem;
        }
        div {
          margin-top: 2rem;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 1.7rem;
          font-weight: 500;
        }
      }
      .findMe {
        background-color: #eeeeee;
        width: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        h1 {
          color: #68b0c9;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1rem;
        }
        .findMeDiv {
          display: flex;
          width: 80%;
          justify-content: space-between;
          margin-top: 1rem;
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 95%;
              height: 50%;
              margin-top: 1rem;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
`;

const OurStoryMain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const WeeklyBestMain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: red;
`;

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const saveuser = localStorage.getItem("user");
    //Object.keys(user).length === 0 <- 얘는 현재 redux에 아무것도 들어있지 않다는 의미
    if (user !== null && Object.keys(user).length === 0 && saveuser !== null) {
      dispatch(userSave(JSON.parse(saveuser)));
    }
  }, []);

  return (
    <div>
      <StyledHeader>
        <nav>
          <a href="#">
            <img src={Logo}></img>
          </a>

          <a href="/notice">Notice</a>
          <a href="/sitter">Sitter</a>

          <a href="/community">Community</a>
          <a href="/hospital">Information</a>
          <a href="#">CS</a>
          <div className="rightNav">
            {user === null ||
              Object.keys(user).length === 0 ||
              !localStorage.getItem("token") ? (
              <>
                <Link to="/auth/login">Sign in</Link> <p>|</p>
                <Link to="/auth/register">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/mypage">Mypage</Link>
                <p>|</p>
                <Link to="/auth/logout">Logout</Link>
              </>
            )}
          </div>
        </nav>
      </StyledHeader>
      <img src={Banner} style={{ width: "100%", height: "59vh" }} />
      <StyledMain>
        <div className="leftNav">
          <a href="#">MAIN</a>
          <a href="#ourStroy">OUR STORY</a>
          <a href="#weeklyBest">WEEKLY BEST</a>
          <a href="#">EVENT</a>
        </div>
        <div className="allMain">
        <div className="searchBar">
            <div>
              <p>통합검색</p>
              <p>▽</p>
            </div>
            <a href="#">
              <img src={loupe} />
            </a>
          </div>
          <div className="best">
            <div className="bestInner">
              <p className="weeklyBest">주간 인기글</p>
              <div>
                <p>1. 광진구 테크노 햄스터</p>
                <p>2. 광진구 테크노 햄스터</p>
                <p>3. 광진구 테크노 햄스터</p>
              </div>
            </div>
            <div className="findMe">
              <h1>찾아 주세요!</h1>
              <div className="findMeDiv">
                <div>
                  <p>광진구 테크노 햄스터</p>
                  <img src={findMe} />
                </div>
                <div>
                  <p>광진구 테크노 햄스터</p>
                  <img src={findMe} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledMain>
      <OurStoryMain>
        <div id="ourStroy">

        </div>
      </OurStoryMain>
      <WeeklyBestMain>
        <div id="weeklyBest">

        </div>
      </WeeklyBestMain>
    </div>
  );
};

export default Home;
