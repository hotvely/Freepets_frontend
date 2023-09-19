import styled from "styled-components";
import Logo from "../assets/Logo.svg"

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 2.7rem;
    color: #68B0C9;
    font-weight: 650;
    align-items: center;
    z-index: 10;
    position: relative;
    a {
      font-size: 1.5rem;
      color: #68B0C9;
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
        color: #68B0C9;
      }
      p {
        margin: 0 0.5rem;
        font-size: 1.3rem;
      }
    }
  }
`

const Header = () => {
  return (<StyledHeader>
  <nav>
      <a href="#"><img src={Logo}></img></a>
      <a href="#">공지사항</a>
      <a href="#">플리마켓</a>
      <a href="#">커뮤니티</a>
      <a href="#">정보나눔</a>
      <a href="#">고객센터</a>
      <div className="rightNav">
          <a href="#">로그인</a>
          <p>|</p>
          <a href="#">회원가입</a>
      </div>
  </nav>
</StyledHeader>)
};

export default Header;
