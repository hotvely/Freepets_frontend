import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faCaretDown,
  faStar,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import Img from "../../resources/kero.jpeg";
import Chatting from "../Chatting";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import {
  getBoardsBasic,
  getSitterSearch,
  getSitterPriceOrder,
} from "../../api/sitter";

const Main = styled.div`
  margin: 0px 40px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;

  .page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    display: flex;
    align-items: center;

    .page-btn {
      margin: 0px 10px;

      button {
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 5px;
        margin: 0px 5px;
      }
    }
  }
`;

const MainBox = styled.div`
  padding: 20px 10px;
  width: 100%;
  border: 1px solid #b1deec;
`;

const MainHeader = styled.header`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;

  .header-end {
    display: flex;
    background-color: #ededed;
    align-items: center;
    border-radius: 10px;
    height: 30px;

    .header-end-label {
      margin-right: 5px;
      padding-left: 10px;

      label {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3a98b9;
        margin-right: 5px;
      }
    }

    #search {
      background-color: #ededed;
      border: none;
    }

    button {
      border: none;
      cursor: pointer;
    }
  }

  select {
    width: 90px;
    height: 30px;
    text-align: center;
    border: none;
    border-radius: 10px;
    color: #3a98b9;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #ededed;
  }

  .button-write {
    width: 90px;
    height: 30px;
    border: none;
    margin-left: 10px;
    border-radius: 10px;
    color: #3a98b9;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #ededed;
    cursor: pointer;
  }
`;

const MainContent = styled.main`
  section {
    margin: 10px;
  }

  .main-content {
    padding: 20px 10px;
    border-bottom: 1px solid #ededed;

    .main-content-view {
      display: flex;
      justify-content: space-between;

      .main-content_start {
        display: flex;

        .main-content_start-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;

          div {
            #sitterTitle {
              font-weight: bold;
              margin-bottom: 10px;
            }
          }

          .main-content_start-desc-name {
            display: flex;

            #nickname {
              padding: 5px;
              border: 1px solid #dedede;
              border-radius: 5px;
              font-size: 0.8rem;
            }
          }
        }
      }

      .main-content_end {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 5px;

        p {
          font-size: 1.5rem;
          color: orange;
          -webkit-text-stroke: 1px orange;

          #sitterPrice {
            margin-right: 5px;
          }
        }

        button {
          width: 100px;
          padding: 5px;
          border: 1px solid #3a98b9;
          border-radius: 5px;
          background-color: white;
          color: #3a98b9;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
`;

const Sitter = () => {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState();
  const navigator = useNavigate();
  const [page, setPage] = useState(1);
  const [modalCheck, setModalCheck] = useState(false);

  const NaviView = (e) => {
    e.preventDefault();
    navigator("view", {
      state: {
        code: e.currentTarget.id,
        id: e.currentTarget.querySelector(".main-content_start-desc-name").id,
      },
    });
  };

  const handleModalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const chattingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalCheck(true);
  };

  const handleModalClose = () => {
    setModalCheck(false);
  };

  const NavCreate = () => {
    navigator("create");
  };

  const userSearch = (e) => {
    setSearch(e.target.value);
  };

  const userSearchClick = async () => {
    const result = await getSitterSearch(1, search);
    setBoards(result.data);
  };

  const ModalStyle = {
    content: {
      top: "20vh",
      left: "15vw",
      bottom: "15vh",
      right: "15vw",
    },
  };

  const selectChange = async (e) => {
    let selectValue = e.target.value;
    console.log(selectValue);
    switch (eval(selectValue)) {
      case 1:
        boardAPI();
        break;
      case 2:
        const resultDesc = await getSitterPriceOrder("desc");
        setBoards(resultDesc.data);
        break;
      case 3:
        const resultAsc = await getSitterPriceOrder("asc");
        setBoards(resultAsc.data);
    }
  };

  const boardAPI = async () => {
    const boardResult = await getBoardsBasic(page);
    setBoards(boardResult.data);
  };

  useEffect(() => {
    boardAPI();
  }, []);

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
        <MainHeader>
          <div className="header-start">
            <select onChange={selectChange}>
              <option value="1">최신순</option>
              <option value="2">높은 비용</option>
              <option value="3">낮은 비용</option>
            </select>
            <button onClick={NavCreate} className="button-write">
              글쓰기
            </button>
          </div>
          <div className="header-end">
            <div className="header-end-label">
              <label htmlFor="search">시터 조회</label>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ color: "#3a98b9" }}
              />
            </div>
            <input
              type="text"
              id="search"
              name="search"
              onChange={userSearch}
            />
            <button onClick={userSearchClick}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#3a98b9" }}
              />
            </button>
          </div>
        </MainHeader>
        <MainContent>
          <section>
            {boards.map((items) => (
              <div className="main-content" key={items.sitterCode}>
                <div
                  className="main-content-view"
                  onClick={NaviView}
                  id={items.sitterCode}
                >
                  <div className="main-content_start">
                    <img
                      src={Img}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    ></img>
                    <div className="main-content_start-desc">
                      <div>
                        <p id="sitterTitle">{items.sitterTitle}</p>
                        <p>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "orange" }}
                          />{" "}
                          <span>{items.sitterRatings}</span>
                        </p>
                      </div>
                      <div
                        className="main-content_start-desc-name"
                        id={items.member.id}
                      >
                        <p id="nickname">{items.member.nickname}</p>
                      </div>
                    </div>
                  </div>
                  <div className="main-content_end">
                    <p>
                      <span id="sitterPrice">{items.sitterPrice}</span>₩
                    </p>
                    <div onClick={handleModalClick}>
                      <button onClick={chattingClick}>1:1 대화</button>
                      <Modal
                        isOpen={modalCheck}
                        ariaHideApp={false}
                        onRequestClose={handleModalClose}
                        style={ModalStyle}
                      >
                        <Chatting />
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </MainContent>
      </MainBox>
      <Page />
    </Main>
  );
};

export default Sitter;
