import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import styled from "styled-components";
import { updateSitterBoard } from "../api/sitter";
import SitterPost from "./SitterPost";
import LostPost from "./LostPost";
import HospitalPost from "./HospitalPost";
import { json, useNavigate, useParams } from "react-router-dom";
import { updateHospitalBoard } from "../api/info";
import CommunityPost from "./Community/CommunityPost";
import Notice from "../pages/notice/Notice";
import NoticePost from "./NoticePost";
import { addNoticeBoard, updateNoticeAPI } from "../api/notice";
import { updateCommunity, updateLostAPI } from "../api/community";
import { addLostAPI } from "../api/community";
import { useSelector, useDispatch } from "react-redux";
import { getTokenCookie } from "../api/cookie";
import { userLogout } from "./store/userSlice";

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
        #title {
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
Quill.register("modules/imageUploader", ImageUploader);
const UpdatePost = () => {
  const { boardCode, postCode } = useParams();

  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [desc, setDesc] = useState("");
  const [select, setSelect] = useState(boardCode);
  const [img, setImg] = useState([]);
  const images = [];
  const [rank1, setRank1] = useState();
  const [rank2, setRank2] = useState();
  const [title, setTitle] = useState();
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (state.user.user) {
        if(state.user.user == {})
        {
          return JSON.parse(localStorage.getItem("user")); 
        }
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        dispatch(userLogout());
      }
    }
  });

  const onClick = async () => {

    const formData = {
      title: title,
      desc: desc,
      token: data.token,
      boardCode: postCode, 
      code: boardCode, 
    };

    let url = "../";
    if (select == 1) {
      await updateCommunity(formData);
      url = "/community";
    } else if (select == 2) {
      console.log("번호 몇 번" + select);
      await updateLostAPI(formData);
    } else if (select == 3) {
      formData.sitterPrice = rank1;
      formData.sitterLoc = rank2;
      await updateSitterBoard(formData);
    } else if (select == 4) {
      formData.hospitalName = rank1;
      formData.hospitalAddress = rank2;
      await updateHospitalBoard(formData);
    } else if (select == 5) {
      await updateNoticeAPI(formData);
    }
    navigate(url);
  };

  const InputDescHandler = (e) => {
    setDesc(e);
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
          ) : select == 4 ? (
            <HospitalPost
              setRank1={setRank1}
              setRank2={setRank2}
              setTitle={setTitle}
            />
          ) : select == 5 ? (
            <NoticePost setTitle={setTitle} />
          ) : null}
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
export default UpdatePost;
