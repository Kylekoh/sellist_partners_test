import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import styled from "styled-components";
import EnoughCost from "./EnoughCost";
import NotEnoughCost from "./NotEnoughCost";
import axios from "axios";
import { headers, getUserInfo } from "../../../Config/urls";
import ko from "date-fns/locale/ko";
import { setNotEnough } from "../../../modules/UserInputModule";

function AfterSelectDate() {
  const [data, setData] = useState("");
  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);
  const difference = sponsorEndDate - sponsorStartDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24) + 1);
  const totalCredits = days * 10;

  const notEnoughPoint = useSelector(store => store.notenoughReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sponsorStartDate && sponsorEndDate) {
      if (totalCredits <= Number(data.memb_credit)) {
        dispatch(setNotEnough(true));
      }
      if (totalCredits > Number(data.memb_credit)) {
        dispatch(setNotEnough(false));
      }
    }
  }, [sponsorStartDate, sponsorEndDate]);

  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(getUserInfo, {
        headers,
        params: {
          email,
          token: accessToken
        }
      });
      setData(data.data.user_data);
    };
    getUserData();
  }, [accessToken, email]);

  return (
    <DatePickedContainer NotEnough={totalCredits > data.memb_credit}>
      <DatePickSection>
        <StartDateSection>
          <h2>시작 날짜</h2>
          <SubStartDate>
            <div>
              {sponsorStartDate ? (
                <img src="/images/Select.svg" alt="select" />
              ) : (
                ""
              )}
            </div>
            <StartFormat>
              {sponsorStartDate
                ? format(sponsorStartDate, `EEEE MMMM dd일, yyyy년`, {
                    locale: ko
                  })
                : ""}
            </StartFormat>
          </SubStartDate>
        </StartDateSection>
        <EndDateSection>
          <h2>종료 날짜</h2>
          <SubEndDate>
            <div>
              {sponsorEndDate ? (
                <img src="/images/Select.svg" alt="select" />
              ) : (
                <span>종료 날짜를 설정해 주세요 :) </span>
              )}
            </div>
            <EndFormat>
              {sponsorEndDate
                ? format(sponsorEndDate, `EEEE MMMM dd일, yyyy년`, {
                    locale: ko
                  })
                : ""}
            </EndFormat>
          </SubEndDate>
        </EndDateSection>
      </DatePickSection>
      <CostSection NotEnough={totalCredits > data.memb_credit}>
        <CostDisplay>
          {sponsorStartDate && sponsorEndDate ? (
            totalCredits <= data.memb_credit ? (
              <EnoughCost days={days} totalCredits={totalCredits} />
            ) : (
              <NotEnoughCost
                days={days}
                totalCredits={totalCredits}
                credits={data.memb_credit}
              />
            )
          ) : (
            <WaitingCost>비용</WaitingCost>
          )}
        </CostDisplay>
      </CostSection>
    </DatePickedContainer>
  );
}

/* 유저가 캘린더에서 sponsorStartDate 값만 넣고 sponsorEndDate 값을 않넣었을때는 웨이팅코스트에 비용이 뜨게 한다 */
/* sponsorStartDate와 sponsorEndDate값이 있고, 그리고 멤버포인트와 토탈 포인트을 비교했을때, 토탈 포인트이 멤버 포인트보다 적을경우 enough 코스트 컴포넌트로 실행된다 */
/* 반대로 토탈포인트가 멤버포인트보다 클때는 NotEnougCost 컴포넌트로 넘어간다 */

export default AfterSelectDate;

const DatePickedContainer = styled.div`
  width: 550px;
  height: 180px;
  border: ${({ NotEnough }) =>
    NotEnough ? "1px solid red" : "1px solid #dee8ff"};
  box-sizing: border-box;
  border-radius: 12px;
  background: #ffffff;
  ${({ theme }) => theme.flex("null", "center", "null")}
  @media (max-width: 500px) {
    width: 340px;
  }
`;

const DatePickSection = styled.div`
  width: 65%;
  height: 100%;
  ${({ theme }) => theme.flex("space-evenly", "null", "column")}
  @media (max-width: 500px) {
    width: 60%;
  }
`;

const StartDateSection = styled.div`
  padding-left: 20px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #757575;
  }
`;

const SubStartDate = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const StartFormat = styled.div`
  margin-left: 15px;
`;

const EndDateSection = styled.div`
  padding-left: 20px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #757575;
  }
`;

const SubEndDate = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 500px) {
    font-size: 12px;
  }

  span {
    font-weight: bold;
    font-size: 13px;
    line-height: 100%;
    @media (max-width: 500px) {
      font-size: 11px;
    }
  }
`;

const EndFormat = styled.div`
  margin-left: 15px;
`;

const CostSection = styled.div`
  width: 40%;
  height: 100%;
  border-left: ${({ NotEnough }) =>
    NotEnough ? "1px solid red" : "1px solid #dee8ff"};
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const CostDisplay = styled.div`
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const WaitingCost = styled.div`
  width: 64px;
  height: 27px;
  color: #ffffff;
  background: #757575;
  border-radius: 4px;
  line-height: 19px;
  letter-spacing: 0.08em;
  font-weight: bold;
  font-size: 16px;

  ${({ theme }) => theme.flex("center", "center", "null")}
`;
