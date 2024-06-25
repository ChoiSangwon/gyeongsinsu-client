import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import { ReactComponent as ChevronBottom } from "../../assets/chevron-bottom.svg";
import { ReactComponent as ChevronTop } from "../../assets/chevron-top.svg";
import calendarImg from "../../assets/calendar.png";

const CalendarContainer = styled.div``;

const CustomCalendar = ({ isMobile }) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [value, setValue] = useRecoilState(calendarValueState);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/board");
  };

  if (isMobile) {
    return (
      <CalendarContainer>
        <Calendar
          onClick={handleButtonClick}
          onChange={(e) => {
            setValue(e);
            navigate("/board");
          }}
          value={value}
          formatDay={(locale, date) => moment(date).format("D")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="US"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
        />
      </CalendarContainer>
    );
  }

  return (
    <>
      <CategoryButton onClick={() => setShowCalendar(!showCalendar)}>
        <img src={calendarImg} alt="calendar" />
        날짜별 경신스 {showCalendar ? <ChevronTop /> : <ChevronBottom />}
      </CategoryButton>
      {showCalendar && (
        <CalendarContainer>
          <Calendar
            onClick={handleButtonClick}
            onChange={(e) => {
              setValue(e);
              navigate("/board");
            }}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            calendarType="US"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
          />
        </CalendarContainer>
      )}
    </>
  );
};

const CategoryButton = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #c0c0c0;
  }
`;

export default CustomCalendar;
