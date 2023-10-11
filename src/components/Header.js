import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogout, userSave } from "./store/userSlice";

const StyledHeader = styled.header`
  background-color: white;
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

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const saveuser = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && saveuser !== null) {
      dispatch(userSave(JSON.parse(saveuser)));
    }
  }, []);

  return (
    <>
      <StyledHeader>
        <nav>
          <a href="/main">
            <img src={Logo}></img>
          </a>
          <a href="/event">공지사항</a>
          <a href="/sitter">플리마켓</a>
          <a href="#">커뮤니티</a>
          <a href="/information">정보나눔</a>
          <a href="#">고객센터</a>
          <div className="rightNav">
            {Object.keys(user).length === 0 ? (
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
    </>
  );
};

export default Header;
