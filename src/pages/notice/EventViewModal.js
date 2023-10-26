import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 40px;
  .header {
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    height: 40px;
  }
  .info {
    font-size: 1rem;
    margin: 10px 0;
    display: flex;
    align-items: start;
    span {
      flex: 0 0 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const EventViewModal = (props) => {
  const [modalIsOpne, setModalIsOpen] = useState(true);

  const data = props.props.data;

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
  return (
    <Modal
      isOpen={modalIsOpne}
      style={customModalStyled}
      ariaHideApp={false}
      onRequestClose={() => {
        setModalIsOpen(false);
        props.props.setViewOpen(false);
      }}
    >
      <Content>
        <div className="header">이벤트 및 행사 정보</div>

        <div className="info">
          <span>행사 제목 : </span>
          {data.eventTitle}
        </div>

        <div className="info">
          <span>행사 장소 : </span>
          {data.eventAddress}
        </div>

        <div className="info">
          <span> 행사 설명 : </span>
          <label>{data.eventDesc}</label>
        </div>

        <div className="info">
          <span> 참여 비용 :</span>
          {data.eventPrice}원
        </div>
        <div className="info">
          <span>관련 URL :</span>
          <a target="blank" href={data.eventURL}>
            {data.eventURL}
          </a>
        </div>
      </Content>
    </Modal>
  );
};

export default EventViewModal;
