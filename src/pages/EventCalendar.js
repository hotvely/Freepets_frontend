import { useState } from "react";
import styled from "styled-components";

const Calendar = styled.div`
  width: 100%;
  margin: 0 30px;

  .calendar_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;

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
        flex: 1 1 13%;
        display: flex;
        justify-content: center;
      }
    }

    .calendar_main {
      width: 90%;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
      background-color: #c2d9e3;
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        .date {
          font-size: 1.3rem;
          display: flex;
          justify-content: center;
          padding-top: 15px;
          flex: 1 1 13%;

          height: 150px;
        }
      }
    }
  }
`;

const EventCalendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysArray = ["일", "월", "화", "수", "목", "금", "토"];
  // 이번달 첫날짜
  const firstDate = new Date(year, month, 1);
  // 이번달 마지막 날짜
  const lastDate = new Date(year, month + 1, 0);
  // console.log("마지막날.." + lastDate.getDate());

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
    const prevLastDate = new Date(year, month, 0);
    //이번달 1일 이전에 표시해줘야 하는 갯수 구하기
    let prevDate = prevLastDate.getDate() - firstDate.getDay() + 1;

    //결과물 출력해 줄 코드 배열
    let result = [];
    for (let prev = 0; prev < firstDate.getDay(); prev++) {
      result.push(
        <div
          className="date prevDate"
          key={`${month}_${prevDate}`}
          style={{ color: "darkgrey" }}
        >
          {prevDate}
        </div>
      );
      prevDate += 1;
    }
    for (let day = 0; day < lastDate.getDate(); day++) {
      result.push(
        <div className="date currDate" key={`${month + 1}_${day + 1}`}>
          {day + 1}
        </div>
      );
    }
    // 총 6줄 7칸 -> 42개 에서 내가 표현한 개수 빼주면 다음달 꺼 표현해 줘야 하는 갯수 나오네?
    for (
      let next = 0;
      next < 42 - (firstDate.getDay() + lastDate.getDate());
      next++
    ) {
      result.push(
        <div
          className="date nextDate"
          key={`${month + 2}_${next + 1}`}
          style={{ color: "darkgrey" }}
        >
          {next + 1}
        </div>
      );
    }

    return result;
  };

  const prevMonth = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const nextMonth = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
  };

  return (
    <>
      <Calendar>
        <div className="calendar_content">
          <div className="calendar_header">
            <div>
              <button onClick={() => prevMonth()}>prev</button>
              {year}년 {month + 1}월
              <button onClick={() => nextMonth()}>next</button>
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
