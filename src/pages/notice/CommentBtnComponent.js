import { useSelector } from "react-redux";

const CommentBtnComponent = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });

  const writer = props.writer;

  return (
    <>
      <div className="comment-btn">
        <button
          id={props.code}
          onClick={() => {
            props.updateCommentHandler(props.code);
          }}
          className={props.className}
        >
          수정
        </button>
        <button
          onClick={() => {
            if (user.id == writer) {
              props.deleteCommentHandler(props.code);
            }
            console.log("사용자와 작성자가 달라서 삭제 불가");
          }}
        >
          삭제
        </button>
      </div>
    </>
  );
};

export default CommentBtnComponent;
