import { useEffect, useState } from "react";
import styled from "styled-components";
import EventAddModal from "./EventAddModal";
import { getEventAPI } from "../../api/notice";
import { async } from "q";
import EventViewModal from "./EventViewModal";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../../components/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Calendar = styled.div`
  margin: 0 30px;
  flex: 0 0 1000px;
  height: 550px;
  flex-basis: 800px;
  flex-shrink: 0;
  flex-grow: 1;

  .calendar_content {
    /* flex: 1 0 70%; */
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;

    button {
      width: 90%;
      height: 50px;
      border-radius: 10px;
      color: white;
      border: 0;
      font-weight: bold;
      font-size: 1.3rem;
      background-color: skyblue;
      margin-bottom: 30px;
    }

    .calendar_header {
      width: 90%;
      background: linear-gradient(180deg, white 50%, #c2d9e3 50%);

      color: white;
      font-weight: bold;
      font-size: 2rem;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      height: 100px;
      button {
        width: 30%;

        border: 0;
        background-color: #6995b3;
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        height: 50px;
      }
      button:hover {
        cursor: pointer;
      }
      div {
        background-color: #6995b3;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 25px;
      }
    }
    .calendar_days {
      width: 90%;
      height: 90px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      font-weight: bold;
      font-size: 1.5rem;
      background-color: #c2d9e3;

      justify-content: center;
      padding-top: 50px;

      .days {
        flex: 1 0 13%;
        display: flex;
        justify-content: center;
      }
    }

    .calendar_main {
      width: 90%;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
      background-color: #c2d9e3;
      display: flex;

      grid-gap: 10px;
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        .date {
          flex: 1 0 13%;
          font-size: 1.3rem;
          display: flex;
          flex-direction: column;
          justify-content: start;
          padding-top: 15px;
          flex-shrink: 0;
          .eventInfo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            flex-wrap: nowrap;
            flex-basis: 80px;
            padding: 10px;

            .eventTitle {
              width: 80px;
              height: 18px;

              background-color: black;
              border-radius: 10px;
              padding: 0 8px;
              margin: 1px 0;

              div {
                display: flex;
                align-items: center;
                justify-content: start;
                padding: 0 5px;
                width: 100px;
                height: 100%;
                font-size: 0.85rem;
                color: white;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
`;

const EventCalendar = () => {
  const today = new Date();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpne, setViewOpen] = useState(false);
  const [selectEvent, setSelectEvent] = useState(0);
  console.log(selectEvent);
  const daysArray = ["일", "월", "화", "수", "목", "금", "토"];
  // 이번달 첫날짜
  const firstDate = new Date(year, month - 1, 1);
  // 이번달 마지막 날짜
  const lastDate = new Date(year, month, 0);

  //-----------------------캘린더 월~금 출력
  const calendar_days = () => {
    let result = [];
    for (let i = 0; i < 7; i++) {
      if (i == 0 || i == 6) {
        result.push(
          <div className="days" key={i} style={{ color: "red" }}>
            {daysArray[i]}
          </div>
        );
      } else {
        result.push(
          <div className="days" key={i}>
            {daysArray[i]}
          </div>
        );
      }
    }
    return result;
  };

  //-----------------------캘린더 1일 ~ 마지막날
  const calendar_dates = () => {
    //이번달 첫 날짜의 요일까지 채워넣기...
    const prevLastDate = new Date(year, month - 1, 0);

    //이번달 1일 이전에 표시해줘야 하는 갯수 구하기
    let prevDate = prevLastDate.getDate() - firstDate.getDay() + 1;

    //결과물 출력해 줄 코드 배열
    let result = [];

    // 회색으로 이전 달 정보 출력 할 때,,
    for (let prev = 0; prev < firstDate.getDay(); prev++) {
      const existData = data.filter(
        (item) =>
          item.month === month - 1 && prevDate === item.day && item.eventTitle
      );
      //달이 같은지, 날이 같은지, 제목이 있는지
      if (existData.length > 0) {
        result.push(
          <div
            id={`${month - 1}/${prevDate}`}
            className="date prevDate ExistData"
            key={`${month - 1}_${prevDate}`}
            style={{ color: "darkgrey" }}
            href={existData.eventURL}
          >
            <div>{prevDate}</div>
            <div className="eventInfo">
              {existData.map((data, index) => {
                return index > 1 ? null : (
                  <div key={data.eventCode} className="eventTitle">
                    <div id={`${data.eventCode}`} onClick={viewEventlHandler}>
                      {`${data.eventTitle}`}
                      {viewOpne && selectEvent == data.eventCode ? (
                        <EventViewModal props={{ data, setViewOpen }} />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        result.push(
          <div
            id={`${month - 1}/${prevDate}`}
            className="date prevDate"
            key={`${month - 1}_${prevDate}`}
            style={{ color: "darkgrey" }}
          >
            <div>{prevDate}</div>
            <div className="eventInfo"></div>
          </div>
        );
      }

      ++prevDate;
    }
    for (let day = 1; day < lastDate.getDate() + 1; day++) {
      const existData = data.filter(
        (item) => item.month == month && day == item.day && item.eventTitle
      );
      if (existData.length > 0) {
        result.push(
          <div
            id={`${month}/${day}`}
            className="date currDate ExistData"
            key={`${month}_${day}`}
          >
            <div>{day}</div>
            <div className="eventInfo">
              {existData.map((data, index) => {
                return (
                  <div key={data.eventCode} className="eventTitle">
                    <div id={`${data.eventCode}`} onClick={viewEventlHandler}>
                      {`${data.eventTitle}`}
                      {viewOpne && selectEvent == data.eventCode ? (
                        <EventViewModal props={{ data, setViewOpen }} />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        result.push(
          <div
            id={`${month}/${day}`}
            className="date currDate"
            key={`${month}_${day}`}
          >
            <div>{day}</div>
            <div className="eventInfo"></div>
          </div>
        );
      }
    }
    // 총 6줄 7칸 -> 42개 에서 내가 표현한 개수 빼주면 다음달 꺼 표현해 줘야 하는 갯수 나오네?
    for (
      let next = 1;
      next < 43 - (firstDate.getDay() + lastDate.getDate());
      next++
    ) {
      const existData = data.filter(
        (item) => item.month == month + 1 && next == item.day && item.eventTitle
      );
      if (existData.length > 0) {
        result.push(
          <div
            id={`${month + 1}/${next}`}
            className="date nextDate ExistData"
            key={`${month + 1}_${next}`}
            style={{ color: "darkgrey" }}
          >
            <div>{next + 1}</div>{" "}
            <div className="eventInfo">
              {existData.map((data, index) => {
                return index > 1 ? null : (
                  <div key={data.eventCode} className="eventTitle">
                    <div id={`${data.eventCode}`} onClick={viewEventlHandler}>
                      {`${data.eventTitle}`}
                      {viewOpne && selectEvent == data.eventCode ? (
                        <EventViewModal props={{ data, setViewOpen }} />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        result.push(
          <div
            id={`${month + 1}/${next}`}
            className="date nextDate"
            key={`${month + 1}_${next}`}
            style={{ color: "darkgrey" }}
          >
            <div>{next}</div>
            <div className="eventInfo"></div>
          </div>
        );
      }
    }

    return result;
  };

  const prevMonth = () => {
    if (month - 1 > 0) {
      setMonth(month - 1);
    } else {
      setMonth(12);
      setYear(year - 1);
    }
  };

  const nextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
  };

  const addEventHandler = () => {
    setAddOpen(true);
    document.body.style.overflow = "hidden";
  };

  const settingViewModal = (e) => {
    console.log(selectEvent);
    if (selectEvent === e.target.id) {
      setViewOpen(true);
      console.log(viewOpne);
      console.log("이벤트 정보 보러 모달염");
      document.body.style.overflow = "hidden";
    } else {
    }
  };

  const viewEventlHandler = async (e) => {
    setSelectEvent(e.target.id);

    // await settingViewModal(e);
  };

  const getEventHandler = async () => {
    const response = await getEventAPI(year);
    setData([...response.data]);
  };

  useEffect(() => {
    //이벤트 정보 부르는 API 호출
    getEventHandler();
  }, []);

  useEffect(() => {
    if (!addOpen) {
      document.body.style.overflow = "unset";
    }
  }, [addOpen]);

  useEffect(() => {
    console.log(viewOpne);
    if (!viewOpne) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [viewOpne]);

  useEffect(() => {
    if (selectEvent > 0) {
      setViewOpen(true);
      console.log(viewOpne);
      console.log("이벤트 정보 보러 모달염");
    }
  }, [selectEvent]);

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (getTokenCookie() !== undefined) {
      if (state.user.user) {
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

  return (
    <>
      <Calendar id="targetElement">
        <div className="calendar_content">
          {user?.authority === "ADMIN" ? (
            <button onClick={addEventHandler}>이벤트 행사 추가</button>
          ) : null}

          {addOpen ? <EventAddModal props={{ setAddOpen, month }} /> : null}
          <div className="calendar_header">
            <div>
              <button
                onClick={() => {
                  prevMonth();
                }}
              >
                prev
              </button>
              {year}년 {month}월
              <button
                onClick={() => {
                  nextMonth();
                }}
              >
                next
              </button>
            </div>
          </div>
          <div className="calendar_days">{calendar_days()}</div>
          <div className="calendar_main">
            <div> {calendar_dates()} </div>
          </div>
        </div>
      </Calendar>
    </>
  );
};

export default EventCalendar;
