import styled from "styled-components";

import banner from "../../../src/resources/bannerTest.png";
import testImg from "../../../src/resources/image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faEye,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteNoticeAPI, getBoardsByPage } from "../../api/notice";
import { Link } from "react-router-dom";
import NoticePost from "../../components/NoticePost";

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 50px;
  /* height: 100vw; */
  align-items: center;

  .venner {
    width: 100%;
    img {
      width: 100%;
    }
    .board_title {
      font-weight: bold;
      font-size: 2rem;
      margin: 30px 0;
    }
  }
  .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .option {
      flex: 0 1 15%;
      margin: 20px 50px;
      select {
        width: 100%;
        height: 30px;
        font-size: 1.1rem;
      }
    }
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      flex: 0 1 40%;
      margin: 20px 30px;
      /* font-size: 1.2rem; */
      label {
        margin: 5px;
        font-size: 1.57rem;
        font-weight: bold;
        color: black;
      }
      input {
        margin: 5px;
        width: 200px;
        height: 30px;
        border: 0;
        border-radius: 25px;
        background-color: lightblue;
      }
    }
  }
`;

const ContentStyle = styled.div`
  width: 100%;
  //border: 5px solid black; //#C1F1FC;

  section {
    margin: 50px 50px;

    hr {
      border: 0px;
      border-top: 4px dotted lightblue;
    }

    button {
      background-color: black;
      width: 150px;
      color: white;
    }
  }
`;

const PostStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  /* align-items: center; */
  margin: 20px 0;

  flex-direction: row;
  .memberPhoto {
    flex: 0 1 10%;
    margin: 0 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .postInfo {
    flex: 0 1 75%;

    .userInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      #nickName {
        line-height: 200%;
        padding: 0 10px;
        background-color: black;
        color: white;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
      }
      #date {
        margin-right: 20px;
        font-size: 1.2rem;
      }
    }
    .postTitle {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 8px 0;
      title {
      }
    }
    .postIcons {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      font-size: 1.1rem;
      div {
        margin-right: 15px;
      }
    }
  }
  .postBtn {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    flex: 0 0 15%;

    button {
      width: 50px;
      height: 50px;
      background-color: skyblue;
      color: black;
      font-size: 1rem;
      border: 2px solid darkgray;
      text-decoration: none;
      font-weight: bold;
      border-radius: 15px;
      margin-right: 5px;
      outline: none;
    }
  }
`;

const PagingStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  a {
    padding: 5px;
  }
`;

const Notice = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [maxpage, setMaxPage] = useState();
  const [boards, setBoards] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });

  const getBoardHandler = async () => {
    console.log("getBoardHandler들어는 오냐???????????????????");

    const response = await getBoardsByPage(page);
    setBoards([...response.data]);
  };

  const updateHandler = (e) => {
    navigate(`/notice/update/5/${e.target.id}`);
  };

  const deleteHandler = async (e) => {
    try {
      setBoards([]);
      await deleteNoticeAPI(e.target.id);

      const response = await getBoardsByPage(page);

      setBoards([...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("화면 첨 실행될떄..");
    getBoardHandler();
  }, []);

  console.log(boards);
  return (
    <MainStyle>
      <div className="venner">
        <img src={banner}></img>
        <div className="board_title">... 게시판</div>
      </div>
      <div className="select">
        <div className="option">
          <select>
            <option value="1">추천 순</option>
            <option value="2">댓글 순</option>
            <option value="3">조회 순</option>
          </select>
        </div>
        <div className="search">
          <label>검색</label>
          <input type="text" id="search" name="search" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#138CA7", margin: "0px 5px" }}
          />
        </div>
      </div>

      <ContentStyle>
        <section>
          {boards?.map((items) => (
            <div key={items?.noticeCode}>
              {console.log(items)}
              <PostStyle>
                <div className="memberPhoto">
                  <img src={testImg}></img>
                </div>
                <div className="postInfo">
                  <Link to={`../notice/noticeView/${items?.noticeCode}`}>
                    <div className="userInfo">
                      <div id="nickName">{items?.member.nickname}</div>
                      <div id="date">7일 전</div>
                    </div>
                    <div className="postTitle">
                      <div className="title">{items?.noticeTitle}</div>
                    </div>
                    <div className="postIcons">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{ color: "#1FB1D1" }}
                      />
                      <div id="like">{items?.noticeLike}</div>
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "#1FB1D1" }}
                      />
                      <div id="views">{items?.noticeViews}</div>
                      <FontAwesomeIcon
                        icon={faComments}
                        style={{ color: "#1FB1D1" }}
                      />
                      <div id="comment">{items?.noticeCommentCount}</div>
                    </div>
                  </Link>
                </div>
                <div className="postBtn">
                  <button
                    id={items?.noticeCode}
                    style={{ backgroundColor: "lightyellow" }}
                    onClick={updateHandler}
                  >
                    수정
                  </button>
                  <button
                    id={items?.noticeCode}
                    style={{ backgroundColor: "pink" }}
                    onClick={deleteHandler}
                  >
                    삭제
                  </button>
                </div>
              </PostStyle>
              <hr className="hr-dotted" />
            </div>
          ))}
          <button
            onClick={() => {
              if (user !== null && Object.keys(user).length !== 0) {
                console.log("글쓰기 버튼 클릭눌림");
                // <Post handler={handler} />;
                navigate("/notice/create");
              } else alert("로그인이 되어 있지 않습니다.");
            }}
          >
            글쓰기
          </button>
        </section>
      </ContentStyle>
      <PagingStyle>페이지 네비게이션 도경쓰 컴포넌트 붙이기</PagingStyle>
    </MainStyle>
  );
};
export default Notice;
