import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { addEvent } from "../../api/notice";
import { async } from "q";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  .inputForm {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: normal;
    width: 100%;
    margin-bottom: 20px;
    span {
      width: 100px;
      display: flex;
      padding: 5px;
      margin-left: 10px;
    }
    label {
      padding: 5px;
    }
    input {
      width: 200px;
      height: 30px;
      border-radius: 10px;
      padding: 0 10px;
      font-size: 1rem;
    }
    textarea {
      height: 100px;
      line-height: normal;
      top: 1px;
      left: 1px;
      width: 200px;
      border-radius: 10px;
      padding: 10px;
      resize: none;
      font-size: 1rem;
    }
  }

  .btn {
    width: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 50px;
      height: 40px;
      border-radius: 15px;
      background-color: skyblue;
      border: 0;
      color: white;
      margin: 0 10px;
    }
  }
`;

const EventAddModal = (props) => {
  const [modalIsOpne, setModalIsOpen] = useState(true);
  const customModalStyled = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "450px",
      height: "500px",
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

  const formDataHandler = async (e) => {
    e.preventDefault();

    const dates = e.target.date.value.split("-");
    console.log(e.target.title.value);
    if (dates.length > 0) {
      const formData = {
        eventTitle: e.target.title.value,
        eventAddress: e.target.address.value,
        eventURL: e.target.url.value,
        eventPrice: e.target.price.value,
        eventDesc: e.target.desc.value,
        year: parseInt(dates[0]),
        month: parseInt(dates[1]),
        day: parseInt(dates[2]),
      };
      console.log(formData);
      const response = await addEvent(formData);
      console.log(response);
      if (response.data) return true;
      else return false;
    } else {
      alert("날짜는 정확하게 입력해야 함..");
      return false;
    }
  };

  const targetRef = useRef(null);

  return (
    <Modal
      isOpen={modalIsOpne}
      style={customModalStyled}
      ariaHideApp={false}
      ref={targetRef}
      onRequestClose={() => {
        setModalIsOpen(false);
        props.props.setAddOpen(false);
      }}
    >
      <FormStyle className="form" onSubmit={formDataHandler}>
        <div className="inputForm">
          <span>행사 제목</span>
          <label>:</label>
          <input type="text" name="title"></input>
        </div>
        <div className="inputForm">
          <span>행사 장소</span>
          <label>:</label> <input type="text" name="address"></input>
        </div>
        <div className="inputForm">
          <span>행사 날짜</span>
          <label>:</label> <input type="date" name="date"></input>
        </div>
        <div className="inputForm">
          <span>행사 url</span>
          <label>:</label> <input type="text" name="url"></input>
        </div>
        <div className="inputForm">
          <span>비용</span>
          <label>: </label>
          <input type="number" name="price"></input>
        </div>
        <div className="inputForm">
          <span> 간략한 소개 </span>
          <label>:</label>
          <textarea type="text" name="desc"></textarea>
        </div>

        <div className="btn">
          <button type="submit">작성</button>
          <button
            onClick={() => {
              setModalIsOpen(false);
              props.props.setIsOpen(false);
            }}
          >
            닫기
          </button>
        </div>
      </FormStyle>
    </Modal>
  );
};

export default EventAddModal;
