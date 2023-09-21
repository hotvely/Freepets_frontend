import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import selectArrow from "../assets/SelectArrow.svg";

const MyCalendar = ({ onChange, value }) => {
  const [nowDate, setNowDate] = useState("날짜");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
    setIsOpen(false);
    // setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
  };
  const CalendarContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
  `;

  const DropdownButton = styled.button`
    width: 200px;
    height: 48px;
    border: 0.8px solid var(--festie-gray-600, #949494);
    border-radius: 10px;
    padding: 0px 12px;
    color: var(--festie-gray-800, #3a3a3a);
    font-family: SUIT Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    text-align: start;
    appearance: none;
    background-color: white;
    background-image: black;
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px;
  `;

  const CalendarWrapper = styled.div`
    z-index: -1;
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 100%;
    left: 0;
    /* display: "${(props) => (props.isOpen ? "block" : "none")}"; */
    display: "block";
  `;

  return (
    <CalendarContainer>
      {/* <DropdownButton onClick={handleToggleCalendar}>{nowDate}</DropdownButton> */}
      <CalendarWrapper>
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default MyCalendar;
