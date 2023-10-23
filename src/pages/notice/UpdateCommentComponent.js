import { useState } from "react";
import { updateCommentAPI } from "../../api/notice";
import { useSelector } from "react-redux";

const UpdateCommentComponent = (props) => {
  // const [content, setContent] = useState();
  let content = "";
  const code = props.code;
  const writerId = props.writer;

  const user = useSelector((state) => {
    return state.user;
  });

  const contentHandler = (e) => {
    content = e.target.value;
  };

  const updateComment = async () => {
    console.log(content);
    const formData = {
      commentCode: code,
      commentDesc: content,
    };
    console.log(formData);
    const result = await updateCommentAPI(formData);
    console.log("updateCommentComponent updateCommet 내부 함수");
    console.log(result.data);
    if (result.data) {
      // 결과 반환해주면.. 버튼 눌림 처리 둘다 꺼버리기.
      props.updateSuccHandler();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="댓글 변경.."
        onChange={contentHandler}
      ></input>
      <button type="submit" onClick={updateComment}>
        전송
      </button>
    </div>
  );
};

export default UpdateCommentComponent;
