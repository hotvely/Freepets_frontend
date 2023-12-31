import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import styled from "styled-components";
import { addSitterBoard, addImg } from "../api/sitter";
import SitterPost from "./SitterPost";
import LostPost from "./LostPost";
import HospitalPost from "./HospitalPost";
import { useNavigate } from "react-router-dom";
import { addHospitalBoard } from "../api/info";
import { addCommunity } from "../api/community";
import { addLostAPI } from "../api/community";
import CommunityPost from "./Community/CommunityPost";
import banner from "./../resources/bannerTest.png";
import NoticePost from "./NoticePost";
import { addNoticeBoard } from "../api/notice";
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
  align-items: center;
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
    
    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("token", data.token);

    let url = "../";
    if (select == 1) {
      await addCommunity(formData);
      url = "/community";
    } else if (select == 2) {
      await addLostAPI(formData);
    } else if (select == 3) {
      formData.append("sitterPrice", rank1);
      formData.append("sitterLoc", rank2);
      await addSitterBoard(formData);
    } else if (select == 4) {
      formData.append("hospitalName", rank1);
      formData.append("hospitalAddress", rank2);
      await addHospitalBoard(formData);
    } else if (select == 5) {
      await addNoticeBoard(formData);
    }
    navigate(url);
  };

  const InputDescHandler = (e) => {
    setDesc(e);
  };

  const selectChange = (e) => {
    setSelect(e.currentTarget.value);
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
                images.push(file);
                setImg(images);
                resolve(result.url);
                console.log(result);
              })
              .catch((error) => {
                reject("Upload 실패");
              });
          });
        },
      },
    }),
    []
  );
  return (
    <Main>
       <img src={banner} style={{width: "100%", height: "150px", marginBottom: "30px", objectFit: "cover"}}/>
      <MainBox>
        <div className="header-content">
          <select className="select select-category" onChange={selectChange}>
            <option>게시판을 선택해 주세요.</option>
            <option value="1">커뮤니티</option>
            <option value="2">분실</option>
            <option value="3">시터</option>
            <option value="4">병원 정보</option>
            <option> ------------ </option>
            {data?.authority == "ADMIN" ? 
              <option value="5">공지사항</option> : null
            }           
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
export default Post;
