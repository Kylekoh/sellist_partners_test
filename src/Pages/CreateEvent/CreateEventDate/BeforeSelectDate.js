import React from "react";
import styled from "styled-components";

function BeforeSelectDate() {
  return (
    <DatePickedContainer>
      <div>선택하신 날짜가 이곳에 표시 됩니다.</div>
    </DatePickedContainer>
  );
}

export default BeforeSelectDate;

const DatePickedContainer = styled.div`
  div {
    ${({ theme }) => theme.flex("center", "center", "null")}
    width: 550px;
    height: 180px;
    border: 1px solid #dee8ff;
    box-sizing: border-box;
    border-radius: 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 100%;
    color: #757575;
    @media (max-width: 500px) {
      width: 340px;
    }
  }
`;
