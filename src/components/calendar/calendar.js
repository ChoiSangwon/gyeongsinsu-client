import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";

const CalendarContainer = styled.div``;

const CustomCalendar = () => {
  const [value, setValue] = useRecoilState(calendarValueState);

  return (
    <CalendarContainer>
      <Calendar
        onChange={setValue}
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
};

export default CustomCalendar;
