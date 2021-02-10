import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
// import "../../CreateEventItem/Components/node_modules/react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { addDays } from "date-fns";
import {
  setSalesDurationStart,
  setSalesDurationEnd
} from "../../../modules/UserInputModule";

registerLocale("ko", ko);

function DurationCalender({
  calenderOpen,
  eventStartDate,
  eventEndDate,
  setEventStartDate,
  setEventEndDate
}) {
  const dispatch = useDispatch();

  const handleDateChange = dates => {
    const [start, end] = dates;
    setEventStartDate(start);
    setEventEndDate(end);
    console.log("마지막");
  };

  useEffect(() => {
    console.log("캘린더 오픈", calenderOpen);
  }, [calenderOpen]);

  dispatch(setSalesDurationStart(eventStartDate));
  dispatch(setSalesDurationEnd(eventEndDate));

  return (
    <Container calenderOpen={calenderOpen}>
      {/* <Container> */}
      <DatePicker
        locale="ko"
        selected={eventStartDate}
        onChange={handleDateChange}
        startDate={eventStartDate}
        endDate={eventEndDate}
        minDate={new Date()}
        selectsRange
        keep
        isClearable
        inline
      />
    </Container>
  );
}

export default DurationCalender;

const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 48px;
  left: 0;
  z-index: 3;
  opacity: ${({ calenderOpen }) => (calenderOpen ? "1" : "0")};
  pointer-events: ${({ calenderOpen }) => (calenderOpen ? "auto" : "none")};

  .react-datepicker {
    width: 100%;
  }

  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
    border: none;
  }

  .react-datepicker__header {
    width: 100%;
  }

  .react-datepicker__day-names {
    width: 100%;
    ${({ theme }) => theme.flex("space-evenly", "center", "row")}
  }

  .react-datepicker__day-name {
  }

  .react-datepicker__month {
    width: 100%;
  }

  .react-datepicker__week {
    width: 100%;
    ${({ theme }) => theme.flex("space-evenly", "center", "row")}
  }

  .react-datepicker__day {
  }
`;
