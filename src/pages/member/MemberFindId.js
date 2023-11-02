import { useDispatch, useSelector } from "react-redux";
import { asyncFindId, userLogout } from "../../components/store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../api/cookie";

const MemberFindId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findID = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
    };
    dispatch(asyncFindId(formData));
    navigate("/main");
  };

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
