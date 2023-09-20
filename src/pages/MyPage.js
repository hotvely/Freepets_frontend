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
    }
    .profileImg {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 20px solid skyblue;
    }
    .profileInfo {
      display: flex;
      flex-direction: column;
      div {
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        width: 100%-200px;
        padding: 15px 0;
        align-items: center;
        label {
          width: 100%;
          padding: 15px 0;
          font-size: 1.3rem;
          font-weight: bold;
          white-space: normal;
        }
        p {
          font-size: 1.2rem;
          width: 30%;
        }
        div {
          font-size: 1.2rem;
          width: 70%;
        }
      }
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
