import styled from "styled-components";
import image from "../../resources/image.jpg";
import border from "../../resources/borderImg.png";
import banner from "../../resources/bannerTest.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDelete,
  userLogout,
  userSave,
} from "../../components/store/userSlice";
import ReactModal from "react-modal";
import MemberUpdate from "./MemberUpdate";
import Logout from "./Logout";
import { deleteNotificationAPI, getNotificationAPI } from "../../api/auth";
import {
  deleteNoticeNotification,
  getNoticeNotification,
} from "../../components/Notification";
import MyPageMain from "../../components/css/MyPageMain";
import { deleteBookmarkAPI, getBookmarkAPI } from "../../api/bookmark";
import { dateFormatDefault } from "../../api/utils";
import { getTokenCookie } from "../../api/cookie";

const MyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [bookmark, setBookmark] = useState([]);

  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      console.log("쿠키 있!");
      return state.user;
    } else {
      if (localStorage.getItem("user")) {
        console.log("호출..?");
        dispatch(userLogout());
      }
    }
  });

  useEffect(() => {
    getNotiHandler();
    getBookmarkHandler();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(false);
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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
    setIsOpen(true);
    console.log(isOpen);
    document.body.style.overflow = "hidden";
  };

  const deleteUser = () => {
    dispatch(asyncDelete({ token: user.token }));
  };

  const getNotiHandler = async () => {
    const result = await getNoticeNotification(user.token);

    console.log(result.data);
    setNotifications([...result.data]);
  };

  const getBookmarkHandler = async () => {
    const result = await getBookmarkAPI(user.token);
    console.log(result);
    setBookmark([...result.data]);
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

  const deleteBookmarkHandler = async (e) => {
    await deleteBookmarkAPI(e.target.id);
    await getBookmarkHandler();
  };

  return (
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
        <MemberUpdate props={{ isOpen, setIsOpen, user, dispatch }} />

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
                    {noti.boardCode == 1 ? (
                      <div>커뮤니티게시판</div>
                    ) : noti.boardCode == 2 ? (
                      <div>분실 신고게시판</div>
                    ) : noti.boardCode == 3 ? (
                      <div>시터게시판</div>
                    ) : noti.boardCode == 4 ? (
                      <div>병원 정보게시판</div>
                    ) : noti.boardCode == 5 ? (
                      <div>공지사항게시판</div>
                    ) : (
                      <div>"게시판정보?"</div>
                    )}
                    {console.log(noti)}
                    {noti?.childComment?.parentCommentCode > 0 ? (
                      <>
                        <div className="commentTitle">
                          {noti.boardDTO.title}
                        </div>
                        <div>게시글에 작성한</div>
                        <div className="commentDesc">
                          {console.log(noti.parentComment.commentDesc)}
                          {noti.parentComment.commentDesc}
                        </div>
                        <div>댓글에 대댓글이 달렸습니다.</div>
                      </>
                    ) : (
                      `'${noti.boardDTO.title}' 게시글에 댓글이 달렸습니다. `
                    )}
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

        {bookmark?.map((bookmark) => (
          <div className="Post" key={bookmark.bookmarkCode}>
            {console.log(bookmark)}
            <img src={image}></img>
            <div className="postInfo_basic">{bookmark.nickname}</div>
            <div className="postInfo_boardname">
              {bookmark.boardName == "community"
                ? "커뮤니티"
                : bookmark.boardName == "lost"
                ? "분실신고"
                : bookmark.boardName == "sitter"
                ? "시터"
                : bookmark.boardName == "hospitalReview"
                ? "병원정보"
                : bookmark.boardName == "notice"
                ? "공지사항"
                : "게시판정보 없음.."}
            </div>
            <div className="postInfo_title">
              <a href={`${bookmark.boardDTO.postPath}`}>
                {bookmark.boardDTO.title}
              </a>
            </div>
            <div className="postInfo_date">
              {dateFormatDefault(bookmark.boardDTO.date)}
            </div>
            <div className="bookmarkDeletBtn">
              <button
                id={`${bookmark.bookmarkCode}`}
                onClick={deleteBookmarkHandler}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </MyPageMain>
  );
};

export default MyPage;
