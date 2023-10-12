import { useEffect, useState } from "react";
import styled from "styled-components";
import { registerAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegister, userReset } from "../../components/store/userSlice";

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
        justify-content: space-between;

        border-top: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom: 4px solid skyblue;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        padding: 10px 15px;
        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          width: 70%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
      }
      .form_item {
        font-size: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        padding: 10px 15px;

        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          width: 70%;
          height: 30px;
          margin-left: 30px;
          outline: none;
        }
        .genderRadio {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 150px;

          span {
            font-size: 1rem;
            font-weight: bold;
            width: 110px;
            height: 35px;
            background: skyblue;
            border-radius: 10px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;

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
      .form_item_last {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 4px solid skyblue;
        border-left: 4px solid skyblue;
        border-right: 4px solid skyblue;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        padding: 10px 15px;

        input {
          font-size: 1rem;
          border: 0;
          border-radius: 25px;
          width: 70%;
          height: 30px;
          margin-left: 30px;
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
  const [passwordValid, setPasswordValid] = useState(true);
  const today = new Date();
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [btnClick, setBtnClick] = useState(false);

  //-------------useState
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    console.log(user);
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
      setPasswordValid(isValid);
    }
  };

  const dateHandler = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const formDataHandler = (e) => {
    e.preventDefault();

    const formData = {
      id: e.target.userId.value,
      password: e.target.userPwd.value,
      phone: e.target.userPhone.value,
      email: e.target.userEmail.value,
      name: e.target.userName.value,
      gender: e.target.userGender.value,
      birth: e.target.userBithday.value,
      address: e.target.userAddr.value,
      nickname: e.target.userNickname.value,
    };

    dispatch(asyncRegister(formData));
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
              <span>😄</span>
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                required
              ></input>
            </div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="text"
                name="userPwd"
                placeholder="비밀번호"
                required
              ></input>
            </div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="text"
                name="userPhone"
                maxLength="11"
                onChange={checkPhoneNumber}
                placeholder="전화번호"
                required
                style={{ color: passwordValid ? "black" : "red" }}
              ></input>
              {passwordValid ? null : (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    paddingTop: "10px",
                  }}
                >
                  비밀번호는 - 을 제외한 11자리 숫자로 입력해 주세요.
                </div>
              )}
            </div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="text"
                name="userEmail"
                placeholder="e_mail"
                required
              ></input>
            </div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="text"
                name="userName"
                placeholder="이름"
                required
              ></input>
            </div>

            <div className="form_item">{checkGender()}</div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="date"
                name="userBithday"
                value={date}
                onChange={dateHandler}
                required
              ></input>
            </div>

            <div className="form_item">
              <span>😄</span>
              <input
                type="text"
                name="userAddr"
                placeholder="주소"
                required
              ></input>
            </div>

            <div className="form_item_last">
              <span>😄</span>
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
