import { useParams } from "react-router-dom";
import MyPageMain from "../../components/css/MyPageMain";
import { useEffect, useState } from "react";
import { getMemberByIdAPI } from "../../api/auth";
import banner from "../../resources/bannerTest.png";
import border from "../../resources/borderImg.png";
import defaultUserImg from "../../resources/image.jpg";
const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  const getUserById = async () => {
    const response = await getMemberByIdAPI(id);
    console.log(response);
    setUser(response.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

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

  return (
    <MyPageMain>
      {user ? (
        <>
          <img src={banner}></img>
          <header>
            <p>기본정보</p>
          </header>
          <div className="profile">
            <div className="profile-photo">
              <div>
                <img src={border} className="profileBorder"></img>
                <img
                  src={user.memberImg == null ? defaultUserImg : user.memberImg}
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
                <p>생일</p>
                <div>{dateFormatter(user.birth)}</div>
              </div>
              <div>
                <p>가입일</p>
                <div>{dateFormatter(user.createAccountDate)}</div>
              </div>

              <div>
                <p>Info</p>
                <div>
                  {user.memberInfo == null
                    ? "유저의 정보 입력"
                    : user.memberInfo}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </MyPageMain>
  );
};

export default UserPage;
