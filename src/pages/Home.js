import { Link } from "react-router-dom";
import Banner from "../assets/Freepets main.png";
import findMe from "../assets/findMe.png";
import styled from "styled-components";
import loupe from "../assets/loupe.png";
import Logo from "../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userLogout, userSave } from "../components/store/userSlice";
import axios from "axios";
import { getTokenCookie } from "../api/cookie";

const StyledMain = styled.main`
  background-color: #68B0C9;
  width: 100%;
  display: flex;
  flex-direction: column;

  .allMain {
    display: flex;
    width: 100%;

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
      .ourStroy {
        margin-top: 2.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    
        .mainBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
    
          .center {
            display: flex;
            flex-direction: column;
            width: 70%;
            font-family: 'Noto Sans KR', sans-serif;
    
            .center-start {
              width: 100%;
              display: flex;
              justify-content: center;
              font-size: 1.5rem;
              color: #2E6578;
              font-weight: bold;
              margin-bottom: 2.5rem;
            }
    
            .center-end {
              display: flex;
              width: 100%;
              display: flex;
              justify-content: space-between;
              padding-bottom: 4rem;
    
              .center-end_container {
                display: flex;
                width: 300px;
                flex-direction: column;
                align-items: center;
                background-color: #eee;
                padding: 20px;
                border-radius: 10px;
                margin: 5px;
    
                .center-end_container-title {
                  color: #68B0C9;
                  font-size: 1.5rem;
                  font-weight: bold;
                  margin-bottom: 5px;
                  font-family: 'Archivo', sans-serif
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
    }
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();

  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (state.user) {
        if(state.user == {})
        {
          return JSON.parse(localStorage.getItem("user")); 
        }
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        dispatch(userLogout());
      }
    }
  });

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div style={{width: "100%"}}>
      <StyledMain>
        <img src={Banner} style={{ width: "100%", height: "59vh" }} />
        <div className="allMain">
          <div className="rightNav">
            <div className="searchBar">
              <div>
                <label htmlFor="totalSearch">통합검색 ▽</label>
                <input type="text" id="totalSearch" onChange={onSearchChange} placeholder="검색어를 입력해 주세요."/>
              </div>
              <Link to={`/totalSearch?search=${search}`}>
                <img src={loupe} />
              </Link>
            </div>
            <div className="ourStroy">
              <div className="mainBox">
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
          </div>
        </div>
      </StyledMain>
    </div>
  );
};

export default Home;
