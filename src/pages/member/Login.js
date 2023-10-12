import { useEffect, useState } from "react";
import styled from "styled-components";
import { checkToken, loginAPI, saveTokenAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogin, userReset } from "../../components/store/userSlice";

const LoginPage = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .homeLink {
    font-size: 2.5rem;

    font-weight: bold;
    a {
      color: #1e7091;
    }
  }

  .loginContent {
    margin: 20px 50px;

    .loginForm {
      margin: 40px 0;
      width: 400px;

      .loginId {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-top: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        padding: 20px;
        input {
          font-size: 1.1rem;
          border: 0;
          border-radius: 25px;
          width: 100%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
      }
      .loginPwd {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-top: 1px solid lightgray;
        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        padding: 20px;

        input {
          font-size: 1.1rem;
          border: 0;
          border-radius: 25px;
          width: 100%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
      }

      .loginBtn,
      .loginBtnClicked {
        width: 100%;
        height: 40px;
        margin-top: 40px;
        background-color: #64a5c1; // #87ceeb94;
        font-weight: bold;
        font-size: 1.2rem;
        color: white;
        border: 0;
        border-radius: 25px;
      }
      .loginBtnClicked {
        background-color: #2c647c;
      }
    }
    .loginFooter {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .fALink {
        background-color: white;
        padding: 0 20px;
        font-size: 0.8rem;
      }
      span {
        font-size: 0.8rem;
      }
    }
  }
`;

const Login = () => {
  const [btnClick, setBtnClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const login = (e) => {
    e.preventDefault();

    if (localStorage.getItem("token")) {
      alert("이미 로그인 되어 있음!");
      navigate("/main");
      return false;
    }

    const formData = {
      id: e.target.userId.value,
      password: e.target.userPwd.value,
    };
    console.log("로그인 데이터 넘겼음");
    dispatch(asyncLogin(formData));
  };

  useEffect(() => {
    console.log(user);

    if (user === null && !localStorage.getItem("user")) {
      alert("존재하지 않는 유저입니다.");
      dispatch(userReset());
      return navigate("/auth/login");
    }
    if (user !== null && Object.keys(user).length !== 0) {
      if (user.deleteAccountYN === "Y" && !localStorage.getItem("user")) {
        alert("이미 탈퇴한 회원");
        return navigate("/auth/login");
      }
      if (user.deleteAccountYN === "N" && localStorage.getItem("user")) {
        alert("로그인 성공!");
        return navigate("/main");
      }
    }
  }, [user]);

  return (
    <>
      <LoginPage>
        <div className="homeLink">
          <a href="/main">Freepets</a>
        </div>
        <div className="loginContent">
          <form className="loginForm" onSubmit={login}>
            <div className="loginId">
              <span>😄</span>
              <input type="text" name="userId" placeholder="아이디"></input>
            </div>
            <div className="loginPwd">
              <span>😄</span>
              <input type="text" name="userPwd" placeholder="비밀번호"></input>
            </div>
            <button
              type="submit"
              className={`${btnClick ? "loginBtnClicked" : "loginBtn"}`}
              onMouseDown={() => setBtnClick(true)}
              onMouseUp={() => setBtnClick(false)}
            >
              로그인
            </button>
          </form>
          <div className="loginFooter">
            <a className="fALink" href="#">
              비밀번호 찾기
            </a>
            <span>|</span>
            <a className="fALink" href="#">
              아이디 찾기
            </a>
            <span>|</span>
            <a className="fALink" href="/auth/register">
              회원가입
            </a>
          </div>
        </div>
      </LoginPage>
    </>
  );
};

export default Login;
