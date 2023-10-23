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
import {
  deleteNoticeAPI,
  getBoardsByPage,
  getSearchAPI,
  getSortedBoardAPI,
} from "../../api/notice";
import { Link, useSearchParams } from "react-router-dom";
import Page from "../../components/Page";

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
        padding: 0 10px;
        margin: 5px;
        width: 170px;
        height: 30px;
        border: 0;
        border-radius: 25px;
        background-color: lightblue;
      }
      button {
        border: 0;
        background-color: white;
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
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const [totalPages, setTotalPages] = useState();
  const page = 1;
  const [boards, setBoards] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortNum, setSortNum] = useState(0);

  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  const user = useSelector((state) => {
    return state.user;
  });

  const getBoardHandler = async () => {
    const response = await getBoardsByPage(page, sortNum);
    setBoards(response.data.noticeList);
    setTotalPages(response.data.totalPages);
  };

  const getSearchBoardHandler = async () => {
    // 검색기능..
    const response = await getSearchAPI(keyword);
    console.log(response.data);
    if (response.data.length > 0) {
      setBoards([...response.data]);
    } else {
      await getBoardHandler(page);
    }
  };

  const updateHandler = (e, id) => {
    if (user.id == id) navigate(`/notice/update/5/${e.target.id}`);
    else console.log("작성자와 사용자가 다름");
  };

  const deleteHandler = async (e, id) => {
    if (user.id == id) {
      setBoards([]);
      await deleteNoticeAPI(e.target.id);

      const response = await getBoardsByPage(page, sortNum);

      setBoards([...response.data]);
    } else {
      console.log("작성자와 사용자가 다름");
    }
  };

  const sortHandler = (e) => {
    setSortNum(e.target.value);
  };

  useEffect(() => {
    console.log("화면 첨 실행될떄..");
    getBoardHandler();
  }, []);

  useEffect(() => {
    if (sortNum > 0) {
      console.log("selector 변화 됬을 떄 들어옴???");
      getBoardHandler();
    }
  }, [sortNum]);

  return (
    <MainStyle>
      <div className="venner">
        <img src={banner}></img>
        <div className="board_title">... 게시판</div>
      </div>
      <div className="select">
        <div className="option" onChange={sortHandler}>
          <select defaultValue={0}>
            <option value="0">------</option>
            <option value="1">추천 순</option>
            <option value="2">댓글 순</option>
            <option value="3">조회 순</option>
          </select>
        </div>
        <div className="search">
          <label>검색</label>
          <input
            type="text"
            id="search"
            name="search"
            onChange={keywordHandler}
          />
          <button onClick={getSearchBoardHandler}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#138CA7", margin: "0px 5px" }}
            />
          </button>
        </div>
      </div>

      <ContentStyle>
        <section>
          {boards?.map((items) => (
            <div key={items?.noticeCode}>
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
                    onClick={(e) => {
                      updateHandler(e, items.member.id);
                    }}
                  >
                    수정
                  </button>
                  <button
                    id={items?.noticeCode}
                    style={{ backgroundColor: "pink" }}
                    onClick={(e) => {
                      deleteHandler(e, items.member.id);
                    }}
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
      {/* <PagingStyle> */}
      <Page totalPages={totalPages} page={page}></Page>
      {/* </PagingStyle> */}
    </MainStyle>
  );
};
export default Notice;
