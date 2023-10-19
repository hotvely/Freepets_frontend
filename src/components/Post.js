import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
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
              margin-right: 5px;
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

            #title {
              width: 80%;
              padding: 5px;
              height: 20px;
              border: 1px solid #eee;
            }
          }
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
`;
Quill.register("modules/imageUploader", ImageUploader);
const Post = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [desc, setDesc] = useState("");
  const [select, setSelect] = useState(null);
  const [img, setImg] = useState([]);
  const images = [];
  const [rank1, setRank1] = useState();
  const [rank2, setRank2] = useState();
  const [title, setTitle] = useState();

  const onClick = async () => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (select == 1) {
    } else if (select == 2) {
    } else if (select == 3) {
      formData.append("sitterPrice", rank1);
      formData.append("sitterLoc", rank2);
      await addSitterBoard(formData);
    } else if (select == 4) {
      formData.append("hospitalName", rank1);
      formData.append("hospitalAddress", rank2);
      await addHospitalBoard(formData);
    } else if (select == 5) {
    }
    navigate("../");
  };

  const InputDescHandler = (e) => {
    setDesc(e);
  };

  const selectChange = (e) => {
    setSelect(e.currentTarget.value);
  };
  /*

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

            const imageUrl = await addImg(formData);
            console.log(imageUrl.data);
            const url = "/upload/" + imageUrl.data;
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', url);
        })
    }

    */

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
      },
      clipboard: {
        matchVisual: false,
      },
      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);

            fetch("http://localhost:8080/api/img", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                images.push(file);
                setImg(images);
                console.log(images);
                resolve(result.url);
              })
              .catch((error) => {
                reject("Upload 실패");
                console.log("Error : " + error);
              });
          });
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
          <select className="select select-category" onChange={selectChange}>
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
            <CommunityPost setTitle={setTitle} />
          ) : select == 2 ? (
            <LostPost setTitle={setTitle} />
          ) : select == 3 ? (
            <SitterPost
              setRank1={setRank1}
              setRank2={setRank2}
              setTitle={setTitle}
            />
          ) : (
            <HospitalPost
              setRank1={setRank1}
              setRank2={setRank2}
              setTitle={setTitle}
            />
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
          <button onClick={onClick} className="btn btn-footer btn-submit">
            등록
          </button>
        </div>
      </MainBox>
    </Main>
  );
};

export default Post;
