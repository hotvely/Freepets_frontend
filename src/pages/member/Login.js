import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLogin,
  userLogout,
  userReset,
} from "../../components/store/userSlice";
import { getTokenCookie } from "../../api/cookie";
import FindPageStyle from "../../components/css/FindPageStyle";

const Login = () => {
  const [btnClick, setBtnClick] = useState(false);
  const navigate = useNavigate();
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
    if (!user) {
      return;
    }
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
    <FindPageStyle>
      <div className="homeLink">
        <a href="/main">Freepets</a>
      </div>
      <div className="pagename">
        <div>로그인</div>
      </div>
      <div className="content">
        <form className="inputForm" onSubmit={login}>
          <div className="upArea">
            <span>😄</span>
            <input type="text" name="userId" placeholder="아이디"></input>
          </div>
          <div className="downArea">
            <span>😄</span>
            <input
              type="password"
              name="userPwd"
              placeholder="비밀번호"
            ></input>
          </div>
          <button
            type="submit"
            className={`${btnClick ? "submitBtnClicked" : "submitBtn"}`}
            onMouseDown={() => setBtnClick(true)}
            onMouseUp={() => setBtnClick(false)}
          >
            로그인
          </button>
        </form>
        <div className="contentFooter">
          <a className="fALink" href="/auth/findPwd">
            비밀번호 찾기
          </a>
          <span>|</span>
          <a className="fALink" href="/auth/findId">
            아이디 찾기
          </a>
          <span>|</span>
          <a className="fALink" href="/auth/register">
            회원가입
          </a>
        </div>
      </div>
    </FindPageStyle>
  );
};

export default Login;
