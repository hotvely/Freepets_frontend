import { Link } from "react-router-dom";
import Banner from "../assets/image.png";
import findMe from "../assets/findMe.png";
import styled from "styled-components";
import loupe from "../assets/loupe.png";
import Logo from "../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userLogout, userSave } from "../components/store/userSlice";
import axios from "axios";
import { getTokenCookie } from "../api/cookie";
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
  height: 100vh;
  display: flex;
  flex-direction: column;

  .allMain {
    display: flex;
    width: 100%;
    height: 45vh;

    .leftNav {
      display: flex;
      position: fixed;
      flex-direction: column;
      font-size: 1.3rem;
      margin-left: 1rem;
      margin-top: 3rem;
      
      a {
        color: #FFF1DC;
        margin: 10px 0px;
      }
    }
    .rightNav {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;

      .searchBar {
        width: 65%;
        margin-top: 1.5rem;
        background-color: #eeeeee;
        display: flex;
        align-items: center;
        color: #68b0c9;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 10px;
  
        div {
          display: flex;
          width: 100%;
          margin-left: 1rem;
  
          label {
            width: 18%;
          }
  
          #totalSearch {
            width: 100%;
            background-color: #eee;
            border: none;
          }
        }
        img {
          margin-right: 1rem;
        }
      }
      
      .best {
        margin-top: 2rem;
        width: 65%;
        height: 25vh;
        display: flex;
        justify-content: space-between;

        .bestInner {
          background-color: #eee;
          width: 45%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 10px;

          .weeklyBest {
            width: 70%;
            display: flex;
            flex-direction: column;
            align-items: center;
          
            .weeklyBestTitle {
              color: #68b0c9;
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 1rem;
            }

            div {
              width: 100%;
              background-color: white;
              margin-top: 2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 1rem;
              font-weight: bold;
              padding: 10px;
              border-radius: 10px;
            }
          }
        }

        .findMe {
          background-color: #eeeeee;
          width: 45%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 10px;

          .findBest {
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
  }
`;

const OurStoryMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  .ourStroy {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .mainBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      
      .header {
        width: 60%;
        display: flex;
        justify-content: center;
        background-color: #8FCCDF;
        padding: 1rem;
        margin-bottom: 5rem;
        align-items: center;
        animation: textAni 1s forwards;
  
        #freepetsLogo {
          margin-right: 2rem;
          font-size: 3rem;
          font-weight: bold;
          color: #1A454F;
        }

        .freepetsDesc {
          font-weight: bold;
          font-size: 1.1rem;
        }
      }

      .center {
        display: flex;
        flex-direction: column;
        width: 70%;

        .center-start {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 5rem;
          font-size: 2rem;
          font-weight: bold;
        }

        .center-end {
          display: flex;
          width: 100%;
          display: flex;
          justify-content: space-between;

          .center-end_container {
            display: flex;
            width: 300px;
            flex-direction: column;
            align-items: center;
            border: 1px solid #eee;
            padding: 20px;
            border-radius: 10px;
            margin: 5px;

            .center-end_container-title {
              color: #68B0C9;
              font-size: 1.5rem;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .center-end_container-name {
              color: #999;
              font-size: 1.2rem;
              margin-bottom: 1.5rem;
            }

            .center-end_container-desc {
              font-size: 1.1rem;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  @keyframes textAni {
    from {
        opacity: 0;
        transform: translateX(700px);
    } to {
        opacity: 1;
        transform: translateX(0px);
    }
  }
  
`;

const WeeklyBestMain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: red;
`;

const EventMain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: green;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();

  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      console.log("쿠키 있!");
      return state.user;
    } else {
      if (localStorage.getItem("user")) {
        console.log("호출..?");
        dispatch(userLogout());
      }
    }
  });

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const saveuser = localStorage.getItem("user");
    //Object.keys(user).length === 0 <- 얘는 현재 redux에 아무것도 들어있지 않다는 의미
    if (user !== null && Object.keys(user).length === 0 && saveuser !== null) {
      dispatch(userSave(JSON.parse(saveuser)));
    }
  }, []);

  return (
    <div style={{width: "100%"}}>
     
      {/* <StyledHeader>
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
            {!user ? (
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
      </StyledHeader> */}
      <StyledMain>
        <img src={Banner} style={{ width: "100%", height: "59vh" }} />
        <div className="allMain">
          <div className="leftNav">
            <a href="#">MAIN</a>
            <a href="#ourStroy">OUR STORY</a>
            <a href="#weeklyBest">WEEKLY BEST</a>
            <a href="#event">EVENT</a>
          </div>
          <div className="rightNav">
            <div className="searchBar">
              <div>
                <label htmlFor="totalSearch">통합검색 ▽</label>
                <input type="text" id="totalSearch" onChange={onSearchChange}/>
              </div>
              <Link to={`/totalSearch?search=${search}`}>
                <img src={loupe} />
              </Link>
            </div>
            <div className="best">
              <div className="bestInner">
                <div className="weeklyBest">
                  <p className="weeklyBestTitle">주간 인기글</p>
                  <div className="WeeklyList">
                    <p>1. 광진구 테크노 햄스터</p>
                    <p>2. 광진구 테크노 햄스터</p>
                    <p>3. 광진구 테크노 햄스터</p>
                  </div>
                </div>               
              </div>
              <div className="findMe">
              <p className="findBest">찾아 주세요!</p>
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
        </div>
      </StyledMain>
      <OurStoryMain>
        <div className="ourStroy" id="ourStroy">
          <div className="mainBox">
            <div className="header">
              <p id="freepetsLogo">FREEPET'S</p>
              <p className="freepetsDesc">반려동물과 함께하는 Free한 공간</p>
            </div>
            <div className="center">
              <p className="center-start">반려동물을 위해,</p>
              <div className="center-end">
                <div className="center-end_container">
                  <p className="center-end_container-title">PETSITTER</p>
                  <p className="center-end_container-name">케어 서비스</p>
                  <p className="center-end_container-desc">도움을 요청해 보세요</p>
                </div>
                <div className="center-end_container">
                  <p className="center-end_container-title">FIND</p>
                  <p className="center-end_container-name">분실</p>
                  <p className="center-end_container-desc">주인을 찾아 주세요</p>
                </div>
                <div className="center-end_container">
                  <p className="center-end_container-title">INFORMATION</p>
                  <p className="center-end_container-name">정보</p>
                  <p className="center-end_container-desc">정보를 나눠 보세요</p>
                </div>
                <div className="center-end_container">
                  <p className="center-end_container-title">SOCIAL</p>
                  <p className="center-end_container-name">소통</p>
                  <p className="center-end_container-desc">자유롭게 대화하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OurStoryMain>
      <WeeklyBestMain>
        <div id="weeklyBest">

        </div>
      </WeeklyBestMain>
      <EventMain>
        <div id="event">
        </div>
      </EventMain>
    </div>
  );
};

export default Home;
