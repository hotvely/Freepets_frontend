import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { addSitterBoard, addImg } from "../api/sitter";
import SitterPost from "./SitterPost";
import CommunityPost from "./CommunityPost";
import LostPost from "./LostPost";
import HospitalPost from "./HospitalPost";
import NoticePost from "./NoticePost";
import { Link, useNavigate } from "react-router-dom";
import { addHospitalBoard } from "../api/info";
import { addNoticeBoard } from "../api/notice";

const Main = styled.div`
  margin: 0px 40px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;
const MainBox = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  border: 1px solid #b1deec;

  .header-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .select-category {
      width: 81%;
      height: 30px;
      margin-bottom: 10px;
      border: solid 1px #eee;
    }

    .input-rank {
      width: 100%;

      .input-center {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;

        #rank1 {
          width: 39%;
          height: 20px;
          padding: 5px;
          border: 1px solid #eee;
          margin-right: 13px;
        }

        #rank2 {
          width: 39%;
          padding: 5px;
          border: 1px solid #eee;
        }
      }

      .input-end {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;

        #rank3 {
          width: 80%;
          padding: 5px;
          height: 20px;
          border: 1px solid #eee;
        }
      }
    }
  }

  .main-content {
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .btn-font {
      background-color: white;
      border: none;
      width: 55px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    .input-desc {
      width: 100%;
      height: 500px;
      padding: 10px;
      border: 1px solid #eee;
      font-size: 0.8rem;
      line-height: 20px;
    }
  }

  .footer-content {
    margin-top: 20px;

    .btn-footer {
      width: 100px;
      height: 30px;
      margin: 5px;
      border: none;
      border-radius: 5px;
      color: #237a8e;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const Post = () => {
  const navigate = useNavigate();
  const quillRef = useRef();
  const [desc, setDesc] = useState("");
  const [select, setSelect] = useState(null);
  const [rank1, setRank1] = useState();
  const [rank2, setRank2] = useState();
  const [rank3, setRank3] = useState();

  let url = "";
  const onClick = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", rank3);
    formData.append("desc", desc);
    formData.append("token", token);

    console.log(formData);

    if (select == 1) {
    } else if (select == 2) {
      // addLostBoard(formData);
      url = "/lostList";
    } else if (select == 3) {
      formData.append("sitterPrice", rank1);
      formData.append("sitterLoc", rank2);
      addSitterBoard(formData);
      url = "/";
    } else if (select == 4) {
      formData.append("hospitalName", rank1);
      formData.append("hospitalAddress", rank2);
      addHospitalBoard(formData);
      url = "/";
    } else if (select == 5) {
      const response = await addNoticeBoard(formData);
      console.log(response);
      url = "/";
    }
    navigate(`..${url}`);
  };

  const InputDescHandler = (e) => {
    setDesc(e);
  };

  const selectChange = (e) => {
    setSelect(e.currentTarget.value);
  };

  const imageHandler = () => {
    console.log("이미지 버튼 누를 때 작동되는 핸들러임");

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      console.log("파일 바뀌는 이벤트");
      const file = input.files[0];
      console.log(file);

      const formData = new FormData();
      formData.append("file", file);

      const imageUrl = await addImg(formData);
      console.log(imageUrl.data);
      const url = "/upload/" + imageUrl.data;
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", url);
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { size: ["small", "false", "large", "huge"] },
            { color: [], background: [] },
          ],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Main>
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "black",
          marginBottom: "50px",
          padding: "0px 10px",
        }}
      ></div>
      <MainBox>
        <div className="header-content">
          <select
            className="select select-category"
            onChange={selectChange}
            defaultValue={null}
          >
            <option>게시판을 선택해 주세요.</option>
            <option value="1">커뮤니티</option>
            <option value="2">분실</option>
            <option value="3">시터</option>
            <option value="4">병원 정보</option>
            <option> ------------ </option>
            <option value="5">공지사항</option>
          </select>
          {select == null ? (
            <div></div>
          ) : select == 1 ? (
            <CommunityPost setRank3={setRank3} />
          ) : select == 2 ? (
            <LostPost setRank3={setRank3} />
          ) : select == 3 ? (
            <SitterPost
              setRank1={setRank1}
              setRank2={setRank2}
              setRank3={setRank3}
            />
          ) : select == 4 ? (
            <></>
          ) : select == 5 ? (
            <NoticePost setTitle={setRank3} />
          ) : (
            <HospitalPost rank1={setRank1} rank2={setRank2} rank3={setRank3} />
          )}
        </div>
        <div className="main-content">
          <ReactQuill
            ref={quillRef}
            style={{ width: "100%", height: "500px" }}
            modules={modules}
            theme="snow"
            onChange={InputDescHandler}
            placeholder="내용을 입력해 주세요."
          />
        </div>
        <div className="footer-content">
          <button
            onClick={onClick}
            type="submit"
            className="btn btn-footer btn-submit"
          >
            등록
          </button>
        </div>
      </MainBox>
    </Main>
  );
};

export default Post;