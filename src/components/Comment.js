import Modal from 'react-modal';
import { useState } from 'react';

const customStyles = {
    content:{
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)'
    }
 };
const Comment =()=>{

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const openModal = () =>{
    setModalIsOpen(true);
   };
   const closeModal = () =>{
    setModalIsOpen(false);
   }
   const handleCommentSubmit = () =>{
     closeModal();
   }

   return (
    <>
    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="예제 모달">
                      <h2>댓글 쓰기 </h2>
                      <textarea placeholder="댓글을 입력하세요"></textarea>
                      <button onClick={handleCommentSubmit}>댓글 등록</button>
                      <button onClick={closeModal}>취소</button>
                      </Modal>
    </>
   );
}
