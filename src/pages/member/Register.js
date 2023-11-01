import { useEffect, useState } from "react";
import styled from "styled-components";
import { registerAPI } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncRegister,
  userLogout,
  userReset,
} from "../../components/store/userSlice";
import { getTokenCookie } from "../../api/cookie";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import KakaoAPI from "./KakaoPostAPI";

const Explanation = styled.div`
  span {
    color: red;
    font-size: 0.7rem;
    padding: 10px 0px;
    border-left: 4px solid skyblue;
    border-right: 4px solid skyblue;
    border-bottom: 4px solid skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const RegisterPage = styled.div`
  width: 100vw;
  height: 100vh;
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
  .registerContent {
    margin: 20px 50px;

    .registerForm {
      margin: 40px 0;
      width: 400px;

      .form_item_first {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: start;

        border-top: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom: 4px solid skyblue;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        padding: 10px 15px;

        span {
          font-size: 1rem;
          font-weight: bold;
          flex-basis: 90px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }

        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          flex-basis: 200px;
          height: 30px;
          margin-left: 20px;
          outline: none;
        }
      }

      .form_item {
        font-size: 1.5rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: start;

        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        padding: 10px 15px;

        span {
          font-size: 1rem;
          font-weight: bold;
          flex-basis: 90px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }

        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          flex-basis: 200px;

          height: 30px;
          margin-left: 20px;
          outline: none;
        }

        .genderRadio {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          align-items: center;
          width: 150px;
          flex-basis: 100px;
          margin: 0 35px;

          span {
            font-size: 1rem;
            font-weight: bold;
            width: 100%;
            height: 35px;
            background: skyblue;
            border-radius: 10px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 0;

            // 체크박스하고 바로 위 span태그 둘다 스타일적용
            :checked + span {
              background-color: #1b4f65;
              color: white;
            }

            position: relative;
            :hover {
              cursor: pointer;
            }

            .radio {
              z-index: 1;
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 10px;
              margin: 0;
              appearance: none;
            }
          }
        }
      }

      .address {
        display: flex;
        flex-direction: row;
        align-items: center;

        .header {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;

          span {
            flex-basis: 150px;
          }

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            width: 100px;
            height: 25px;
            padding: 0;
            border: 0;
            color: white;
            border-radius: 5px;
            background-color: skyblue;
          }
        }

        .detailAddress {
          margin-left: 10px;
          height: 60px;
          input {
            margin: 0;
            padding-left: 10px;
          }
          span {
            margin: 0;
            padding-left: 10px;
            height: 30px;
          }
        }
      }

      .form_item_last {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: start;

        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        padding: 10px 15px;

        span {
          font-size: 1rem;
          font-weight: bold;
          flex-basis: 90px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }

        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          flex-basis: 200px;
          height: 30px;
          margin-left: 20px;
          outline: none;
        }
      }

      .registerBtn,
      .registerBtnClicked {
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
      .registerBtnClicked {
        background-color: #2c647c;
      }
    }
    .registerFooter {
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

const Register = () => {
  //-------------useState
  const genderList = ["남자", "여자"];
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [idValid, setIdValid] = useState(true);
  const [passwordVaild, setPasswordValid] = useState(true);
  const today = new Date();
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [btnClick, setBtnClick] = useState(false);
  let [address, setAddress] = useState("");
  const [newwindow, setNewWindow] = useState();
  //-------------useState
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!user) return;
    // console.log(user);
    // console.log(Object.keys(user).length);
    if (user !== null && Object.keys(user).length !== 0) {
      console.log("가입성공");
      navigate("/main");
    } else {
      if (user === null) {
        console.log("이미 가입된 회원");
        alert("가입 되어 있음");
        dispatch(userReset());
      }
      navigate("/auth/register");
    }
  }, [user]);
  // console.log(user);

  const checkId = (e) => {
    if (e.target != null) {
      const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z]){3,16}$/;
      const isValid = regExp.test(e.target.value);
      setIdValid(isValid);
    }
  };
  const checkPassword = (e) => {
    if (e.target != null) {
      const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      const isValid = regExp.test(e.target.value);
      setPasswordValid(isValid);
    }
  };

  const checkGender = () => {
    const result = [];
    for (let i = 0; i < genderList.length; i++) {
      result.push(
        <div className="genderRadio" key={i}>
          <span>
            <input
              type="radio"
              className="radio"
              name="userGender"
              value={i === 1 ? "m" : "f"}
            />
            <span>{genderList[i]}</span>
          </span>
          {/* <label>{genderList[i]}</label> */}
        </div>
      );
    }
    return result;
  };

  const checkPhoneNumber = (e) => {
    if (e.target != null) {
      const regExp = /^[0-9]{11}$/;
      const isValid = regExp.test(e.target.value);
      setPhoneValid(isValid);
    }
  };

  const checkEmail = (e) => {
    if (e.target != null) {
      const regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      const isValid = regExp.test(e.target.value);
      setEmailValid(isValid);
    }
  };

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const receiveMessage = async (e) => {
    if (e.data?.address) {
      setAddress(e.data.address);
    }
  };
  const closeWindowHandler = () => {
    newwindow.close();
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
  }, []);

  const formDataHandler = async (e) => {
    e.preventDefault();

    const formData = {
      id: e.target.userId.value,
      password: e.target.userPwd.value,
      phone: e.target.userPhone.value,
      email: e.target.userEmail.value,
      name: e.target.userName.value,
      gender: e.target.userGender.value,
      birth: e.target.userBithday.value,
      address: address + e.target.detalAddress.value,
      nickname: e.target.userNickname.value,
    };
    console.log(formData);

    if (idValid && passwordVaild && phoneValid && emailValid) {
      const response = await dispatch(await asyncRegister(formData));

      if (response.payload) {
        navigate("/main");
      }
    } else return alert("양식을 지켜주세요.");
  };

  return (
    <>
      <RegisterPage>
        <div className="homeLink">
          <a href="/main">Freepets</a>
        </div>
        <div className="registerContent">
          <form className="registerForm" onSubmit={formDataHandler}>
            <div className="form_item_first">
              <span>😄아이디</span>
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                onChange={checkId}
                required
              ></input>
            </div>
            {idValid ? null : (
              <Explanation>
                <span>
                  아이디는 '-','_' 을 제외한 특수문자 사용불가, 4~16자리 입니다
                </span>
              </Explanation>
            )}
            <div className="form_item">
              <span>😄비밀번호</span>
              <input
                type="password"
                name="userPwd"
                placeholder="비밀번호"
                onChange={checkPassword}
                required
              ></input>
            </div>
            {passwordVaild ? null : (
              <Explanation>
                <span>비밀번호는 특수문자 포함한 8~16자리 까지 입니다</span>
              </Explanation>
            )}
            <div className="form_item">
              <span>😄전화번호</span>
              <input
                type="text"
                name="userPhone"
                maxLength="11"
                onChange={checkPhoneNumber}
                placeholder="전화번호"
                required
                style={{ color: phoneValid ? "black" : "red" }}
              ></input>
            </div>
            {phoneValid ? null : (
              <Explanation>
                <span>비밀번호는 - 을 제외한 11자리 숫자 입니다</span>
              </Explanation>
            )}
            <div className="form_item">
              <span>😄이메일</span>
              <input
                type="email"
                name="userEmail"
                placeholder="e_mail"
                onChange={checkEmail}
                required
              ></input>
            </div>
            {emailValid ? null : (
              <Explanation>
                <span>@, .com을 포함한 이메일 양식을 지켜주세요</span>
              </Explanation>
            )}
            <div className="form_item">
              <span>😄이름</span>
              <input
                type="text"
                name="userName"
                placeholder="이름"
                required
              ></input>
            </div>
            <div className="form_item radio">{checkGender()}</div>
            <div className="form_item">
              <span>😄생일</span>
              <input
                type="date"
                name="userBithday"
                value={date}
                onChange={dateHandler}
                required
              ></input>
            </div>
            <div className="form_item address">
              <div className="header">
                <span>😄주소찾기</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newwindow = window.open(
                      "http://localhost:3000/auth/API",
                      "_blank",
                      "width=500, height=502"
                    );
                    setNewWindow(newwindow);
                  }}
                >
                  주소찾기
                </button>
              </div>
              {address ? closeWindowHandler() : null}
              <div className="detailAddress">
                <span>{address}</span>
                <input placeholder="상세주소" name="detalAddress"></input>
              </div>
            </div>
            <div className="form_item_last">
              <span>😄닉네임</span>
              <input
                type="text"
                name="userNickname"
                placeholder="닉네임"
                required
              ></input>
            </div>
            <button
              type="submit"
              className={`${btnClick ? "registerBtnClicked" : "registerBtn"}`}
              onMouseDown={() => setBtnClick(true)}
              onMouseUp={() => setBtnClick(false)}
            >
              회원가입
            </button>
          </form>
          <div className="registerFooter">
            <a className="fALink" href="#">
              비밀번호 찾기
            </a>
            <span>|</span>
            <a className="fALink" href="#">
              아이디 찾기
            </a>
            <span>|</span>
            <a className="fALink" href="#">
              회원가입
            </a>
          </div>
        </div>
      </RegisterPage>
    </>
  );
};

export default Register;
