import { Outlet } from "react-router-dom";
import Banner from "../assets/image.png"
import findMe from "../assets/findMe.png"
import styled from "styled-components";
import loupe from "../assets/loupe.png"

const StylredMain = styled.main`
  background-color: #3A98B9; 
  height: 40vh; 
  width: 100%; 
  display: flex;
  .leftNav {
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    height: 200px; 
    margin: auto 0rem; 
    font-size: 1.7rem; 
    margin-left: 4rem; 
    font-weight: 600; 
    color: #FFF1DC; 
    margin-right: 4rem;
  }
  .allMain {
    display: flex; 
    flex-direction: column;
    width: 80%;
    .searchBar {
      background-color: #EEEEEE; 
      width: 90%; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      color: #68B0C9; 
      margin-top: 3rem; 
      height: 60px; 
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
      height: 200px; 
      width: 90%; 
      display: flex; 
      justify-content: space-between;
      .bestInner {
        background-color: #EEEEEE; 
        width: 45%; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        border-radius: 10px;
        .weeklyBest {
          color: #68B0C9; 
          font-size: 2rem; 
          font-weight: 600; 
          margin-top: 1rem;
        }
        div {
          margin-top: 2rem; 
          height: 100px; 
          display: flex; 
          flex-direction: column; 
          justify-content: space-between; 
          font-size: 1.7rem; 
          font-weight: 500;
        }
      }
      .findMe {
        background-color: #EEEEEE; 
        width: 45%; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        border-radius: 10px;
        h1 {
          color: #68B0C9; 
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
              width: 200px; height: 100px; margin-top: 1rem; border-radius: 10px;
            }
          }
        }
      }
    }
  }
`;

const Home = () => {
  return (
    <div>
      <img src={Banner} style={{width: "100%", height: "59vh"}}/>
      <StylredMain>
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
                  <img src={loupe}/>
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
                            <img src={findMe}/>
                        </div>
                        <div>
                            <p>광진구 테크노 햄스터</p>
                            <img src={findMe}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StylredMain>
    </div>
  );
};

export default Home;
