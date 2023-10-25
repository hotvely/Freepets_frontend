import styled from "styled-components";
import image from "../../resources/image.jpg";
import border from "../../resources/borderImg.png";
import banner from "../../resources/bannerTest.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDelete, userSave } from "../../components/store/userSlice";
import ReactModal from "react-modal";
import MemberUpdate from "./MemberUpdate";
import Logout from "./Logout";
import { deleteNotificationAPI, getNotificationAPI } from "../../api/auth";
import {
  deleteNoticeNotification,
  getNoticeNotification,
} from "../../components/Notification";
import MyPageMain from "../../components/css/MyPageMain";

const MyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const saveuser = localStorage.getItem("user");

    //Object.keys(user).length === 0 <- 얘는 현재 redux에 아무것도 들어있지 않다는 의미
    if (Object.keys(user).length === 0 && saveuser !== null) {
      dispatch(userSave(JSON.parse(saveuser)));
    } else if (Object.keys(user).length === 0 && saveuser === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/main");
      setNotifications([]);
    } else {
      getNotiHandler();
    }
  }, [user]);

  const phoneFormatter = (data) => {
    if (data) {
      const phoneNumber = `${data}`;
      const result =
        phoneNumber.slice(0, 3) +
        "-" +
        phoneNumber.slice(3, 7) +
        "-" +
        phoneNumber.slice(7, 11);

      return result;
    }
  };

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

  const openModalHandler = (e) => {
    setIsOpen(!isOpen);
  };

  const deleteUser = () => {
    dispatch(asyncDelete({ token: user.token }));
  };

  const getNotiHandler = async () => {
    const result = await getNoticeNotification(user.token);

    console.log(result.data);
    setNotifications([...result.data]);
  };

  const deleteNotiHandler = async (e) => {
    e.preventDefault();
    const code = e.target
      .closest(".check-Alarm")
      .className.split("check-Alarm notification")[1];

    const result = await deleteNoticeNotification(code);
    console.log(result.data);

    setNotifications([]);
  };

  return (
    <>
      <MyPageMain>
        <img src={banner}></img>
        <header>
          <p>기본정보</p>
        </header>
        <div className="profile">
          <div className="profile-photo">
            <div>
              <img src={border} className="profileBorder"></img>
              <img
                src={user.memberImg == null ? image : user.memberImg}
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
              <p>Phone</p>
              <div>{phoneFormatter(user.phone)}</div>
            </div>
            <div>
              <p>Address</p>
              <div>{user.address}</div>
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
              <p>Grade</p>
              <div>{user.authority}</div>
            </div>
            <div>
              <p>Info</p>
              <div>
                {user.memberInfo == null ? "유저의 정보 입력" : user.memberInfo}
              </div>
            </div>
          </div>
        </div>

        <div className="profile_btn">
          <button onClick={openModalHandler}>회원 정보수정</button>
          {MemberUpdate(isOpen, setIsOpen, user, dispatch)}

          <button onClick={deleteUser} style={{ backgroundColor: "pink" }}>
            회원 탈퇴
          </button>
        </div>

        <div className="profile-alram">
          <header>
            <p>알림 확인하기</p>
            <div className="alarm">
              <div>{notifications?.length}</div>
            </div>
          </header>
          {notifications?.map((noti) => (
            <div
              className={`check-Alarm notification${noti.code}`}
              key={noti.code}
              onClick={deleteNotiHandler}
            >
              <img src={image}></img>
              <div>
                <Link to={noti.url}>
                  <div className="check-Alarm-Content">
                    <div className="check_Alarm-info">
                      {console.log(noti)}
                      {noti.boardCode == 1
                        ? "커뮤니티 게시판 "
                        : noti.boardCode == 2
                        ? "분실 신고 게시판 "
                        : noti.boardCode == 3
                        ? "시터 게시판 "
                        : noti.boardCode == 4
                        ? "병원 정보 게시판 "
                        : noti.boardCode == 5
                        ? "공지사항 게시판 "
                        : "게시판정보?"}
                      {noti.childComment.parentCommentCode > 0
                        ? `'${noti.boardDTO.title}' 게시글에 작성한 '${noti.parentComment?.commentDesc}' 댓글에 대댓글이 달렸습니다. `
                        : `'${noti.boardDTO.title}' 게시글에 댓글이 달렸습니다. `}
                    </div>
                    <div className="check_Alarm-info">
                      <div>2시간전...</div>
                      <div>hotvely</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="profile-Post">
          <header>
            <p>북마크 게시글</p>
          </header>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
          <div className="Post">
            <img src={image}></img>
            <div className="postInfo_basic">닉네임</div>
            <div className="postInfo_boardname">게시판이름</div>
            <div className="postInfo_title">
              <a>게시글 제모구람뉴ㅜㅎ마ㅓ규히ㅏ휴김하ㅓ</a>
            </div>
            <div className="postInfo_date">2023-09-21</div>
          </div>
        </div>
      </MyPageMain>
    </>
  );
};

export default MyPage;
