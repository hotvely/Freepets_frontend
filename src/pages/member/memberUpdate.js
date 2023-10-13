import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { outside } from "semver";
import styled from "styled-components";
import { updateAPI } from "../../api/auth";
import { useDispatch } from "react-redux";
import { asyncUpdate } from "../../components/store/userSlice";

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

const MemberUpdate = (isOpen, setIsOpen, user, dispatch) => {
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

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const formDataHandler = (e) => {
    e.preventDefault();

    const formData = {
      token: user.token,
      password: e.target.password.value,
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      memberInfo: e.target.userInfo.value,
    };

    for (let key in formData) {
      if (key != "token" && formData[key].length > 0) {
        dispatch(asyncUpdate(formData));

        console.log("데이터 전송 후 수정 완료");
        alert("정보 수정 완료!");
        setIsOpen(!isOpen);
        return true;
      }
    }
    alert("모든 입력값이 비어 있습니다.");
    return false;
  };

  return (
    <>
      {console.log(isOpen)}

      <div
        onClick={(e) => {
          if (e.target.className.includes("Overlay")) openModalHandler();
        }}
      >
        <Modal isOpen={isOpen} style={customModalStyled} ariaHideApp={false}>
          <FormInput>
            <form className="form" onSubmit={formDataHandler}>
              <div className="inputForm_title">정보 수정</div>
              <div className="inputForm">
                변경할 비밀번호 <input type="text" name="password"></input>
              </div>
              <div className="inputForm">
                변경할 닉네임 <input type="text" name="nickname"></input>
              </div>
              <div className="inputForm">
                변경할 E-mail <input type="text" name="email"></input>
              </div>
              <div className="inputForm">
                변경할 전화번호 <input type="text" name="phone"></input>
              </div>
              <div className="inputForm phoneNumberInfo">
                하이픈('-')을 제외한 숫자만 입력하세요.
              </div>
              <div className="inputForm">
                변경할 주소 <input type="text" name="address"></input>
              </div>
              <div className="inputForm">
                자기소개 <textarea name="userInfo"></textarea>
              </div>
              <div className="btn">
                <button type="submit">submit</button>
                <button onClick={openModalHandler}>exit</button>
              </div>
            </form>
          </FormInput>
        </Modal>
      </div>
    </>
  );
};

export default MemberUpdate;
