import styled from "styled-components";
import image from "../../resources/image.jpg";
import border from "../../resources/borderImg.png";
import banner from "../../resources/bannerTest.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSave } from "../../components/store/userSlice";
import ReactModal from "react-modal";
import memberUpdate from "./memberUpdate";

const MyPageMain = styled.main`
  margin: 0;
  flex: 0 1 100%-800px;
  padding: 0 100px;
  img {
    width: 100%;
  }

  header {
    font-size: 1.3rem;
    margin-top: 20px;
    justify-content: center;
    font-weight: bold;
    background-color: black;
    width: 100%;
    height: 80px;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    p {
      padding-left: 30px;
    }
    .alarm {
      display: flex;
      background-color: orange;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
    }
  }

  .profile {
    display: flex;
    flex-direction: row;

    .profile-photo {
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 280px;
        height: 280px;

        .profileImg {
          width: 200px;
          height: 200px;
          border-radius: 50%;

          position: absolute;
          z-index: -2;
        }

        .profileBorder {
          position: absolute;
          width: 280px;
          height: 280px;
          z-index: -1;
        }
      }

      label {
        font-size: 1.5rem;
        font-weight: bold;
        padding: 30px 0;
      }
    }

    .profileInfo {
      display: flex;
      flex: 0 1 100%;
      flex-direction: column;
      padding: 20px 20px;

      div {
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        width: 100%-200px;
        padding: 5px 0;
        align-items: center;

        p {
          font-size: 1.15rem;
          font-weight: bold;
          width: 30%;
          color: rgb(129, 129, 129);
        }
        div {
          font-size: 1.15rem;
          font-weight: bold;
          width: 70%;
          white-space: normal;
          line-height: 150%;
        }
      }
    }
  }

  .profile_btn {
    display: flex;
    justify-content: end;
    padding: 20px 10px;
    width: 95%;
    height: 50px;
    button {
      border-radius: 10px;
      background-color: skyblue;
      color: white;
      font-weight: bold;
      border: 0;
      font-size: 1.2rem;
      margin: 0 10px;
    }
  }

  .profile-alram {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .check-Alarm {
      display: flex;
      flex-direction: row;
      width: 90%;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      button {
        background-color: white;
        border: 0;
        font-weight: bold;
      }

      .check-Alarm-Content {
        width: 800px;
        height: 50px;
        margin-left: 20px;
        /* margin-right: 100px; */
        display: flex;
        flex-direction: column;
        justify-content: center;

        .check_Alarm-info {
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          div {
            margin-right: 40px;
          }
        }
      }
    }
  }

  .profile-Post {
    display: flex;
    flex-direction: column;
    width: 100%;
    .Post {
      display: flex;
      flex-direction: row;
      align-items: center;

      margin: 20px 50px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .postInfo_basic {
        flex: 0 1 50px;
        padding-left: 20px;
        font-weight: bold;
      }
      .postInfo_boardname {
        flex: 0 1 100px;
        padding-left: 20px;
        font-weight: bold;
      }
      .postInfo_title {
        flex: 0 1 500px;
        padding-left: 20px;
      }
      .postInfo_date {
        flex: 0 1 150px;
        padding-left: 20px;
      }
    }
  }

  .profile-myReview {
    display: flex;
    flex-direction: column;
    width: 100%;
    .myReview {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 20px 20px;

      height: 40px;
      .review_boardname {
        flex: 0 1 150px;
        font-weight: bold;
      }
      .review_title {
        flex: 0 1 250px;
        padding-left: 20px;
        font-weight: bold;
      }
      .review_content {
        flex: 0 1 400px;
      }
      .review_date {
        flex: 0 1 150px;
        padding-left: 20px;
      }
    }
  }
`;

const MyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const saveuser = localStorage.getItem("user");
    //Object.keys(user).length === 0 <- 얘는 현재 redux에 아무것도 들어있지 않다는 의미
    if (Object.keys(user).length === 0 && saveuser !== null) {
      dispatch(userSave(JSON.parse(saveuser)));
    } else if (Object.keys(user).length === 0 && saveuser === null) {
      navigate("/");
    }
  }, []);

  const phoneFormatter = (data) => {
    if (data) {
      const phoneNumber = `${data}`;
      const result =
        phoneNumber.slice(0, 3) +
        "-" +
        phoneNumber.slice(3, 7) +
        "-" +
        phoneNumber.slice(7, 11);

      return result;
    }
  };

  const dateFormatter = (data) => {
    if (data) {
      const date = new Date(`${data}`);

      const result =
        date.getFullYear() +
        "-" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        date.getDate();
      return result;
    }
  };

  const openModalHandler = (e) => {
    setIsOpen(!isOpen);
  };
  const sendData = (formData) => {
    return null;
  };

  return (
    <>
      <MyPageMain>
        <img src={banner}></img>
        <header>
          <p>기본정보</p>
        </header>
        <div className="profile">
          <div className="profile-photo">
            <div>
              <img src={border} className="profileBorder"></img>
              <img
                src={user.memberImg == null ? image : user.memberImg}
                className="profileImg"
              ></img>
            </div>
            <label>{user.nickname}</label>
          </div>
          <div className="profileInfo">
            <div>
              <p>Id</p>
              <div>{user.id}</div>
            </div>
            <div>
              <p>E-mail</p>
              <div>{user.email}</div>
            </div>
            <div>
              <p>Phone</p>
              <div>{phoneFormatter(user.phone)}</div>
            </div>
            <div>
              <p>Address</p>
              <div>{user.address}</div>
            </div>
            <div>
              <p>생일</p>
              <div>{dateFormatter(user.birth)}</div>
            </div>
            <div>
              <p>가입일</p>
              <div>{dateFormatter(user.createAccountDate)}</div>
            </div>
            <div>
              <p>Grade</p>
              <div>{user.authority}</div>
            </div>
            <div>
              <p>Info</p>
              <div>
                {user.memberInfo == null ? "유저의 정보 입력" : user.memberInfo}
              </div>
            </div>
          </div>
        </div>

        <div className="profile_btn">
          <button onClick={openModalHandler}>회원 정보수정</button>
          {memberUpdate(isOpen, setIsOpen)}
          {/* {isOpen ?  : null} */}
          <button style={{ backgroundColor: "pink" }}>회원 탈퇴</button>
        </div>

        <div className="profile-alram">
          <header>
            <p>알림 확인하기</p>
            <div className="alarm">
              <div>1</div>
            </div>
          </header>
          <div className="check-Alarm">
            <img src={image}></img>
            <a href="#">
              <div className="check-Alarm-Content">
                <div className="check_Alarm-info">
                  XXXXX게시판에 작성하신 XXXXXX... 글에 댓글이 달렸습니다.
                </div>
                <div className="check_Alarm-info">
                  <div>2시간전...</div>
                  <div>hotvely</div>
                </div>
              </div>
            </a>
            <button>X</button>
          </div>
          <div className="check-Alarm">
            <img src={image}></img>
            <a href="#">
              <div className="check-Alarm-Content">
                <div className="check_Alarm-info">
                  XXXXX게시판에 작성하신 XXXXXX... 글에 댓글이 달렸습니다.
                </div>
                <div className="check_Alarm-info">
                  <div>2시간전...</div>
                  <div>hotvely</div>
                </div>
              </div>
            </a>
            <button>X</button>
          </div>
          <div className="check-Alarm">
            <img src={image}></img>
            <a href="#">
              <div className="check-Alarm-Content">
                <div className="check_Alarm-info">
                  XXXXX게시판에 작성하신 XXXXXX... 글에 댓글이 달렸습니다.
                </div>
                <div className="check_Alarm-info">
                  <div>2시간전...</div>
                  <div>hotvely</div>
                </div>
              </div>
            </a>
            <button>X</button>
          </div>{" "}
          <div className="check-Alarm">
            <img src={image}></img>
            <a href="#">
              <div className="check-Alarm-Content">
                <div className="check_Alarm-info">
                  XXXXX게시판에 작성하신 XXXXXX... 글에 댓글이 달렸습니다.
                </div>
                <div className="check_Alarm-info">
                  <div>2시간전...</div>
                  <div>hotvely</div>
                </div>
              </div>
            </a>
            <button>X</button>
          </div>
        </div>

        <div className="profile-Post">
          <header>
            <p>내가 쓴 게시글 확인하기</p>
          </header>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>
                게시글 제as dasdasd모 dasdasd구람sadas das뉴ㅜdsfsdfㅎ마ㅓasds
                ad규히ㅏ휴김하sadasdsad asfasfasf sfdadasdadㅓ
              </a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>

          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
        </div>

        <div className="profile-myReview">
          <header>
            <p>내가 쓴 댓글 확인하기</p>
          </header>
          <div className="myReview">
            <div className="review_boardname">게시판이름</div>
            <div className="review_title">
              <a>게시글 제모오오옥as dasdasd모 da</a>
            </div>
            <div className="review_content">
              리뷰내용....아아아아돌겠따 짜증난다 미치겠따 화가난다
            </div>
            <div className="review_date">2023-09-21</div>
          </div>
          <div className="myReview">
            <div className="review_boardname">게시판이름</div>
            <div className="review_title">
              <a>게시글 제모오오옥as dasdasd모 da</a>
            </div>
            <div className="review_content">
              리뷰내용....아아아아돌겠따 짜증난다 미치겠따 화가난다
            </div>
            <div className="review_date">2023-09-21</div>
          </div>
          <div className="myReview">
            <div className="review_boardname">게시판이름</div>
            <div className="review_title">
              <a>게시글 제모오오옥as dasdasd모 da</a>
            </div>
            <div className="review_content">
              리뷰내용....아아아아돌겠따 짜증난다 미치겠따 화가난다
            </div>
            <div className="review_date">2023-09-21</div>
          </div>
          <div className="myReview">
            <div className="review_boardname">게시판이름</div>
            <div className="review_title">
              <a>게시글 제모오오옥as dasdasd모 da</a>
            </div>
            <div className="review_content">
              리뷰내용....아아아아돌겠따 짜증난다 미치겠따 화가난다
            </div>
            <div className="review_date">2023-09-21</div>
          </div>
        </div>

        <div className="profile-Post">
          <header>
            <p>내가 좋아요 한 게시글 확인하기</p>
          </header>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
        </div>
      </MyPageMain>
    </>
  );
};

export default MyPage;
