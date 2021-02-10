import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function EnoughCost({ days, totalCredits }) {
  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);
  return (
    <Container>
      <DaysSection>
        {sponsorStartDate && sponsorEndDate ? `총 ${days} 일` : ""}
      </DaysSection>
      <CostSection>{`비용: ${totalCredits} 포인트`}</CostSection>
    </Container>
  );
}

export default EnoughCost;

const Container = styled.div``;

const DaysSection = styled.div`
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #424242;
`;

const CostSection = styled.div`
  margin-top: 15px;
  width: 164px;
  height: 27px;
  background: #00897b;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  text-align: right;
  letter-spacing: 0.08em;
  ${({ theme }) => theme.flex("center", "center", "null")}
  @media (max-width: 500px) {
    width: 102px;
    font-size: 11px;
  }
`;
