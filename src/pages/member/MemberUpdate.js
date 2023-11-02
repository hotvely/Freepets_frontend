import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { outside } from "semver";
import styled from "styled-components";
import { updateAPI } from "../../api/auth";
import { useDispatch } from "react-redux";
import { asyncUpdate, userSave } from "../../components/store/userSlice";

const FormInput = styled.div`
  .inputForm_title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: black;
    height: 50px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  .inputForm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    input {
      /* display: block; */
      border-radius: 5px;
      border: 1px solid lightgray;
      width: 180px;
      box-shadow: 0;
      padding: 5px;
    }

    textarea {
      width: 170px;
      height: 100px;
      resize: none;
      border: 1px solid lightgray;
      border-radius: 10px;
      border: 1;
      padding: 10px;
    }
  }
  .phoneNumberInfo {
    font-size: 0.8rem;
    color: tomato;
  }

  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 80px;
      height: 35px;
      border: 0;
      background-color: #7c91ad;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
      border-radius: 10px;
      margin: 20px 10px;
    }
  }
`;
// isOpen, setIsOpen, user, dispatch
const MemberUpdate = (props) => {
  const customModalStyled = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "350px",
      height: "450px",
      zIndex: "150",
      position: "absolute",
      padding: "30px 30px 10px 30px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };
  const [img, setImg] = useState();
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const [passwordVaild, setPasswordValid] = useState(true);

  const setIsOpen = () => {
    props.props.setIsOpen();
  };
  const isOpen = props.props.isOpen;
  const user = props.props.user;

  const formDataHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();

    formData.append("token", user.token);
    formData.append("password", e.target.password.value);
    formData.append("nickname", e.target.password.value);
    formData.append("email", e.target.password.value);
    formData.append("phone", e.target.password.value);
    formData.append("memberInfo", e.target.userInfo.value);

    for (let key in formData) {
      let file = null;
      if (e.target.img.files[0] != undefined) {
        file = e.target.img.files[0];
      }

      if (key != "token" && (formData[key].length > 0 || file != {})) {
        formData.append("file", file);

        const result = await updateAPI(formData);

        alert("정보 수정 완료!");

        userSave(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));

        setIsOpen(false);
        return true;
      }
    }
    alert("모든 입력값이 비어 있습니다.");
    return false;
  };

  const checkPassword = (e) => {
    if (e.target != null) {
      const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      const isValid = regExp.test(e.target.value);
      setPasswordValid(isValid);
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
  const checkPhoneNumber = (e) => {
    if (e.target != null) {
      const regExp = /^[0-9]{11}$/;
      const isValid = regExp.test(e.target.value);
      setPhoneValid(isValid);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      style={customModalStyled}
      onRequestClose={() => {
        setIsOpen(true);
      }}
      ariaHideApp={false}
    >
      <FormInput>
        <form className="form" onSubmit={formDataHandler}>
          <div className="inputForm_title">정보 수정</div>
          <div className="inputForm">
            변경할 비밀번호
            <input
              type="password"
              name="password"
              onChange={checkPassword}
            ></input>
          </div>
          {passwordVaild ? null : (
            <span className="error">
              비밀번호는 특수문자 포함한 8~16자리 까지 입니다
            </span>
          )}
          <div className="inputForm">
            변경할 닉네임 <input type="text" name="nickname"></input>
          </div>
          <div className="inputForm">
            변경할 이미지 <input type="file" name="img"></input>
          </div>
          <div className="inputForm">
            변경할 E-mail
            <input type="text" name="email" onChange={checkEmail}></input>
          </div>
          {emailValid ? null : (
            <span className="error">
              @, .com을 포함한 이메일 양식을 지켜주세요
            </span>
          )}
          <div className="inputForm">
            변경할 전화번호
            <input type="text" name="phone" onChange={checkPhoneNumber}></input>
          </div>
          {phoneValid ? null : (
            <span className="error">
              비밀번호는 - 을 제외한 11자리 숫자 입니다
            </span>
          )}
          <div className="inputForm">
            자기소개 <textarea name="userInfo"></textarea>
          </div>
          <div className="btn">
            <button type="submit">submit</button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              exit
            </button>
          </div>
        </form>
      </FormInput>
    </Modal>
  );
};

export default MemberUpdate;
