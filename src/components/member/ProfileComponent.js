import styled from "styled-components";
import testImg from "../../../src/resources/image.jpg";

const StyledProfileView = styled.div`
  margin-right: 20px;
  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    .user {
      a {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }
      }
    }
  }
`;

const ProfileComponent = (props) => {
  const memberData = props.props;
  console.log(memberData);
  return (
    <StyledProfileView>
      {props ? (
        <div className="profile">
          <div className="user">
            <a href={`/userpage/${memberData.id}`}>
              {memberData?.memberImg ? (
                <img src={memberData.memberImg} alt="작성자 프로필" />
              ) : (
                <img src={testImg} alt="작성자 프로필" />
              )}
            </a>
          </div>

          <div className="usertTitle">
            <p style={{ fontSize: "18px", fontWeight: "border" }}>
              <a href={`/userpage/${memberData.id}`}>{memberData.nickname}</a>
            </p>
          </div>
        </div>
      ) : null}
    </StyledProfileView>
  );
};

export default ProfileComponent;
