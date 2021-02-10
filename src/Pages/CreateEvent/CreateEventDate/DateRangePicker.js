import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//DATEPICKER
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { setSponsorStartDate } from "../../../modules/SponsorStartDateModule";
import { setSponsorEndDate } from "../../../modules/SponsorEndDateModule";

registerLocale("ko", ko);

function DatePick() {
  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  // User가 StartDate/EndDate 선택하는 순서와 상관없이 과거일을 StartDate 최신일을 EndDate로 반영하는 Logic
  const onChange = dates => {
    const [firstDate, secondDate] = dates;

    if (!startDate || (startDate && endDate)) {
      setStartDate(firstDate);
      setEndDate(secondDate);
      dispatch(setSponsorStartDate(firstDate));
      dispatch(setSponsorEndDate(secondDate));
    } else if (dates.every(date => date)) {
      setStartDate(firstDate);
      setEndDate(secondDate);
      dispatch(setSponsorStartDate(firstDate));
      dispatch(setSponsorEndDate(secondDate));
    } else if (startDate && !secondDate) {
      if (startDate > firstDate) {
        setStartDate(firstDate);
        setEndDate(startDate);
        dispatch(setSponsorStartDate(firstDate));
        dispatch(setSponsorEndDate(startDate));
      } else {
        setStartDate(startDate);
        setEndDate(firstDate);
        dispatch(setSponsorStartDate(startDate));
        dispatch(setSponsorEndDate(firstDate));
      }
    }
  };

  // useEffect(() => {
  //   dispatch(setSponsorStartDate(startDate));
  //   dispatch(setSponsorEndDate(endDate));

  //   console.log("광고 시작일", sponsorStartDate);
  //   console.log("광고 종료일", sponsorEndDate);
  // }, [startDate, endDate]);

  return (
    <Container>
      <DatePicker
        locale="ko"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={addDays(new Date(), 1)}
        selectsRange
        inline
      />
    </Container>
  );
}

export default DatePick;

const Container = styled.div`
  width: 550px;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    width: 95%;
    justify-content: center;
  }

  .react-datepicker {
    border: 1px solid #dee8ff;
    border-radius: 12px;
  }
  .react-datepicker__month-container {
    width: 100%;
    border: none;
  }
  .react-datepicker__day {
    margin: 0.2rem;
    /* background-color: black; */
  }
  .react-datepicker__header {
    width: 100%;
    background: white;
    border: none;
    padding-top: 20px;
  }
  .react-datepicker__day-names {
    width: 100%;
    ${({ theme }) => theme.flex("space-evenly", "center", "row")}
  }
  .react-datepicker__week {
    width: 100%;
    ${({ theme }) => theme.flex("space-evenly", "center", "row")}
  }

  .react-datepicker__day--disabled {
    background-color: #f5f5f5;
  }
  .react-datepicker__day {
    height: 28px;
    width: 70px;
    @media (max-width: 500px) {
      height: 31px;
      width: 40px;
    }
  }
`;
