import styled from "styled-components";
import image from "../resources/image.jpg";
import banner from "../resources/bannerTest.png";

const MyPageMain = styled.main`
  margin: 0;
  flex: 0 1 auto;
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
      flex: 0 1 250px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .profileImg {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 20px solid skyblue;
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

  .check-Alarm {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 10px 50px;
    img {
      width: 50px;
      height: 50px;
    }

    .check-Alarm-Content {
      width: 100%;
      height: 50px;
      margin-left: 20px;
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
`;

const MyPage = () => {
  return (
    <>
      <MyPageMain>
        <img src={banner}></img>
        <header>
          <p>기본정보</p>
        </header>
        <div className="profile">
          <div className="profile-photo">
            <img src={image} className="profileImg"></img>
            <label>NICKNAME</label>
          </div>
          <div className="profileInfo">
            <div>
              <p>Id</p>
              <div>hotvely</div>
            </div>
            <div>
              <p>E-mail</p>
              <div>MAIL@naver.com</div>
            </div>
            <div>
              <p>Phone</p>
              <div>010-0000-0000</div>
            </div>
            <div>
              <p>Address</p>
              <div>서울시 양천구 한강변 판자집</div>
            </div>
            <div>
              <p>가입일</p>
              <div>2023-12-19</div>
            </div>
            <div>
              <p>Grade</p>
              <div>ADMIN</div>
            </div>
            <div>
              <p>Info</p>
              <div>
                hi i am hotvely. this page admin. hellohellohello
                hellohelloasddddddddddddddddddddd hellohellohello hellohellohell
                ohel zlohellohelldasdddddddddd ohellohellohello nice to meet
                you!! Ty!
              </div>
            </div>
          </div>
        </div>

        <div className="profile_btn">
          <button>회원 정보수정</button>
          <button style={{ backgroundColor: "pink" }}>회원 탈퇴</button>
        </div>
        {/* <hr
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#818181",
            border: 0,
          }}
        /> */}
        <header>
          <p>알림 확인하기</p>
          <div className="alarm">
            <div>1</div>
          </div>
        </header>
        <div className="check-Alarm">
          <img src={image}></img>
          <div className="check-Alarm-Content">
            <div className="check_Alarm-info">
              XXXXX게시판에 작성하신 XXXXXX... 글에 댓글이 달렸습니다.
            </div>
            <div className="check_Alarm-info">
              <div>2시간전...</div>
              <div>hotvely</div>
            </div>
          </div>
          <button>X</button>
        </div>
        <header>
          <p>내가 쓴 게시글 확인하기</p>
        </header>
        <div className=""></div>

        <header>
          <p>내가 쓴 댓글 확인하기</p>
        </header>
        <div className=""></div>

        <header>
          <p>내가 좋아요 한 게시글 확인하기</p>
        </header>
        <div className=""></div>

        <header>
          <p>최근 방문한 게시글 확인하기</p>
        </header>
        <div className=""></div>
      </MyPageMain>
    </>
  );
};

export default MyPage;
