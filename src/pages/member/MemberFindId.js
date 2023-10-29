import { useDispatch, useSelector } from "react-redux";
import { asyncFindId, userLogout } from "../../components/store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../api/cookie";
import FindPageStyle from "../../components/css/FindPageStyle";

const MemberFindId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnClick, setBtnClick] = useState(false);
  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      return state.user;
    } else {
      if (localStorage.getItem("user")) {
        dispatch(userLogout());
      }
    }
  });

  const findID = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
    };
    console.log(formData);

    const result = await dispatch(await asyncFindId(formData));
    if (result.payload) {
      alert(`아이디는 ${result.payload}입니다.`);
      navigate("/main");
    } else {
      alert("존재하지 않는 유저 입니다.");
    }
    //
  };

  return (
    <FindPageStyle>
      <div className="homeLink">
        <a href="/main">Freepets</a>
      </div>
      <div className="pagename">
        <div>아이디 찾기</div>
      </div>
      <div className="content">
        <form className="inputForm" onSubmit={findID}>
          <div className="upArea">
            <span>😄</span>
            <input type="text" name="name" placeholder="이름"></input>
          </div>
          <div className="downArea">
            <span>😄</span>
            <input type="email" name="email" placeholder="이메일"></input>
          </div>
          <button
            type="submit"
            className={`${btnClick ? "submitBtnClicked" : "submitBtn"}`}
            onMouseDown={() => setBtnClick(true)}
            onMouseUp={() => setBtnClick(false)}
          >
            아이디 찾기
          </button>
        </form>
        <div className="contentFooter">
          <a className="fALink" href="/auth/findPwd">
            비밀번호 찾기
          </a>
          <span>|</span>
          <a className="fALink" href="/auth/findId">
            아이디 찾기
          </a>
          <span>|</span>
          <a className="fALink" href="/auth/register">
            회원가입
          </a>
        </div>
      </div>
    </FindPageStyle>
  );
};

export default MemberFindId;
