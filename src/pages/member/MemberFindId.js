import { useDispatch, useSelector } from "react-redux";
import { asyncFindId } from "../../components/store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberFindId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
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
