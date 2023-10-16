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
  background-color: #3a98b9;
  height: 40vh;
  width: 100%;
  display: flex;
  .leftNav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 45%;
    margin: auto 0rem;
    font-size: 1.7rem;
    margin-left: 4rem;
    font-weight: 600;
    color: #fff1dc;
    margin-right: 4rem;
  }
  .allMain {
    display: flex;
    flex-direction: column;
    width: 80%;
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
      width: 90%;
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

          <a href="/event">공지사항</a>
          <a href="/sitter">플리마켓</a>

          <a href="/community">커뮤니티</a>
          <a href="/information">정보나눔</a>
          <a href="#">고객센터</a>
          <div className="rightNav">
            {user === null ||
            Object.keys(user).length === 0 ||
            !localStorage.getItem("token") ? (
              <>
                <Link to="/auth/login">로그인</Link> <p>|</p>
                <Link to="/auth/register">회원가입</Link>
              </>
            ) : (
              <>
                <Link to="/mypage">마이페이지</Link>
                <p>|</p>
                <Link to="/auth/logout">로그아웃</Link>
              </>
            )}
          </div>
        </nav>
      </StyledHeader>
      <img src={Banner} style={{ width: "100%", height: "59vh" }} />
      <StyledMain>
        <div className="leftNav">
          <p>MAIN</p>
          <p>OUR STORY</p>
          <p>WEEKLY BEST</p>
          <p>EVENT</p>
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
    </div>
  );
};

export default Home;
