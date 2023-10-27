import { useDispatch, useSelector } from "react-redux";
import { asyncFindPwd, userLogout } from "../../components/store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../api/cookie";
import FindPageStyle from "../../components/css/FindPageStyle";

const MemberFindPwd = () => {
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
  const findPwd = async (e) => {
    e.preventDefault();
    const formData = { id: e.target.id.value, email: e.target.email.value };
    const result = await dispatch(await asyncFindPwd(formData));
    console.log(result);
    if (result.payload == "Success") {
      alert(
        "e-mail로 임시 비밀번호 발급 완료 되었습니다. 확인후 로그인 하세요."
      );
      navigate("/main");
    } else {
      alert("존재하지 않는 회원입니다.");
    }

    // navigate("/main");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <FindPageStyle>
      <div className="homeLink">
        <a href="/main">Freepets</a>
      </div>
      <div className="pagename">
        <div>비밀번호 찾기</div>
      </div>
      <div className="content">
        <form className="inputForm" onSubmit={findPwd}>
          <div className="upArea">
            <span>😄</span>
            <input type="text" name="id" placeholder="아이디"></input>
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
            비밀번호 찾기
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

export default MemberFindPwd;
