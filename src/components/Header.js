import styled from "styled-components";
import Logo from "../assets/Logo.svg";

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
  return (
    <StyledHeader>
      <nav>
        <a href="/main">
          <img src={Logo}></img>
        </a>
        <a href="/event">공지사항</a>
        <a href="#">플리마켓</a>
        <a href="#">커뮤니티</a>
        <a href="#">정보나눔</a>
        <a href="#">고객센터</a>
        <div className="rightNav">
          <a href="/login">로그인</a>
          <p>|</p>
          <a href="/register">회원가입</a>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default Header;
