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
  const dispatch = useDispatch();
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

  useEffect(() => {}, []);

  return (
    <>
      <StyledHeader>
        <nav>
          <a href="/main">
            <img src={Logo}></img>
          </a>
          <a href="/notice">Notice</a>
          <a href="/sitter">Sitter</a>
          <a href="/community">Community</a>
          <a href="/hospital">Information</a>
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
