import { useDispatch, useSelector } from "react-redux";
import { asyncFindId, userLogout } from "../../components/store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../api/cookie";

const MemberFindId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (Object.keys(state.user).length !== 0) {
        return state.user;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      if (localStorage.getItem("user")) {
        console.log("로그아웃 !!!");
        dispatch(userLogout());
      }
    }
  });
  const findID = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
    };
    console.log(formData);
    dispatch(asyncFindId(formData));
    navigate("/main");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div>
        <form onSubmit={findID}>
          이름 : <input type="text" name="name"></input>
          이메일 : <input type="text" name="email"></input>
          <button>아이디 찾기</button>
        </form>
      </div>
    </>
  );
};

export default MemberFindId;
