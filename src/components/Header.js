import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogout, userSave } from "./store/userSlice";
import { getTokenCookie } from "../api/cookie";

const StyledHeader = styled.header`
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 10;
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
  console.log("헤더 호출!");
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
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <StyledHeader>
        <nav>
          <Link to="/main">
            <img src={Logo}></img>
          </Link>
          <Link to="/notice">Notice</Link>
          <Link to="/sitter">Sitter</Link>
          <Link to="/community">Community</Link>
          <Link to="/hospital">Information</Link>

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
      </StyledHeader>
    </>
  );
};

export default Header;
