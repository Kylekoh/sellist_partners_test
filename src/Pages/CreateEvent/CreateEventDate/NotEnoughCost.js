import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isCheckPoint } from "../../../modules/PointCheckModule";

function NotEnoughCost({ days, totalCredits, credits }) {
  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);
  const dispatch = useDispatch();

  // 유저보유 포인트가 토탈포인트보다 작은 상태인데, 일단 마이너스값으로 값을나타낸 이후 Math.abs는 절대값이고, parseInt는 NaN없애기로
  const creditNeeded =
    parseInt(Math.abs(credits - totalCredits)) || "ㅁㄴㅇㄹㅁㅇㄴㄹ";
  return (
    <Container>
      <NeedSection>{`${creditNeeded} 포인트가 더 필요합니다`} </NeedSection>
      <DaysSection>
        {sponsorStartDate && sponsorEndDate ? `총 ${days} 일` : ""}
      </DaysSection>
      <CostSection>{`비용: ${totalCredits} 포인트`}</CostSection>
      <BuyCreditSection
        onClick={() => {
          dispatch(isCheckPoint(true));
        }}
      >
        포인트 구매
      </BuyCreditSection>
    </Container>
  );
}

export default NotEnoughCost;

const Container = styled.div``;

const NeedSection = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
  color: #757575;
  margin-bottom: 15px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const DaysSection = styled.div`
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #424242;
`;

const CostSection = styled.div`
  margin-top: 15px;
  height: 27px;
  background: #e64a19;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  text-align: right;
  letter-spacing: 0.08em;
  ${({ theme }) => theme.flex("center", "center", "null")}
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

const BuyCreditSection = styled.div`
  margin-top: 15px;
  height: 30px;
  background: #212121;
  border-radius: 4px;
  color: #ffffff;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.flex("center", "center", "null")}
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;
