import { useDispatch, useSelector } from "react-redux";
import { asyncFindPwd } from "../../components/store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberFindPwd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
  });

  const findPwd = (e) => {
    e.preventDefault();
    const formData = { id: e.target.id.value, email: e.target.email.value };
    dispatch(asyncFindPwd(formData));
    navigate("/main");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div>
        <form onSubmit={findPwd}>
          아이디 : <input type="text" name="id"></input>
          이메일 : <input type="text" name="email"></input>
          <button>비밀번호 찾기</button>
        </form>
      </div>
    </>
  );
};

export default MemberFindPwd;
