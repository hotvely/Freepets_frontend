import { useState } from "react";
import Modal from "react-modal";

const EventViewModal = (props) => {
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
      <div>Hello!</div>
    </Modal>
  );
};

export default EventViewModal;
