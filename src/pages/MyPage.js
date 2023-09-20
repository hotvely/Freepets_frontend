import styled from "styled-components";
import image from "../resources/image.jpg";

const MyPageMain = styled.main`
  margin: 0;
  flex: 0 1 auto;
  padding: 0 100px;

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

      header {
        font-size: 1.3rem;
        padding: 25px 15px;
        font-weight: bold;
      }

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
`;

const MyPage = () => {
  return (
    <>
      <MyPageMain>
        <div className="profile">
          <div className="profile-photo">
            <img src={image} className="profileImg"></img>
            <label>NICKNAME</label>
          </div>
          <div className="profileInfo">
            <header>기본정보</header>
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
        <hr
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#818181",
            border: 0,
          }}
        />

        <div className="profile">
          <div className="profile-photo">
            <img src={image} className="profileImg"></img>
          </div>
          <div className="profileInfo">
            <div>
              <label>
                <label>NICKNAME</label>'s profile Card
              </label>
            </div>
            <div>
              <p>id</p>
              <div>ID</div>
            </div>
            <div>
              <p>e-mail</p>
              <div>EMAIL</div>
            </div>
            <div>
              <p>phone</p>
              <div>PHONE</div>
            </div>
            <div>
              <label>
                hi i am hotvely. this page admin. hellohellohellohellohello
                hellohellohellohellohellohellohel zlohellohellohellohellohello
                nice to meet you!! Ty!
              </label>
            </div>
          </div>
        </div>
      </MyPageMain>
    </>
  );
};

export default MyPage;
