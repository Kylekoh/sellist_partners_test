// 기본
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Prompt, withRouter } from "react-router-dom";
//라이브러리
import { format } from "date-fns";
import styled from "styled-components";
import axios from "axios";
// 컴포넌트
import DateRangePicker from "./DateRangePicker";
import BeforeSelectDate from "./BeforeSelectDate";
import AfterSelectDate from "./AfterSelectDate";
import CheckSponsoredEventModal from "./CheckSponsoredEventModal";
import { headers, createEventAPI } from "../../../Config/urls";
import { openModal } from "../../../modules/CheckModalModule";
import Loading from "../../../Components/Loading";

function CreateEventDate(props) {
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  const username = useSelector(store => store.usernameReducer);
  const userImage = useSelector(store => store.profileimgReducer);
  const eventname = useSelector(store => store.eventnameReducer);
  const eventimg = useSelector(store => store.eventimgReducer);

  const eventUrl = useSelector(store => store.eventurlReducer);
  const shoppingUrl = useSelector(store => store.shoppingurlReducer);
  const originalPrice = useSelector(store => store.originalpriceReducer);
  const newPrice = useSelector(store => store.newpriceReducer);
  const durationStart = useSelector(store => store.durationStartReducer);
  const durationEnd = useSelector(store => store.durationEndReducer);
  const category = useSelector(store => store.eventcategoryReducer);

  const isCheckModal = useSelector(store => store.checkModalReducer);
  const notEnoughPoint = useSelector(store => store.notenoughReducer);
  const dispatch = useDispatch();

  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);

  const difference = sponsorEndDate - sponsorStartDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24) + 1);
  const totalCredits = days * 10;

  // 01.19 새로 만든 것
  const [confirm, setConfirm] = useState(false);

  // useEffect(() => {
  //   console.log("크리에이트 아이템 페이지에서 오는 것");
  //   console.log("사용자", username);
  //   console.log("사용자 사진", userImage);
  //   console.log("이벤트명", eventname);
  //   console.log("이벤트 사진", eventimg);
  //   console.log("이벤트 URL", eventUrl);
  //   console.log("쇼핑URL", shoppingUrl);
  //   console.log("원래가격", originalPrice);
  //   console.log("할인가격", newPrice);
  //   console.log("이벤트 시작", durationStart);
  //   console.log("이벤트 종료", durationEnd);
  //   console.log("카테고리", category);
  // }, []);

  useEffect(() => {
    // 각 항목을 Validation해서  confirm 버튼 활성 유무를 결정하기 위한 것
    if (notEnoughPoint) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [notEnoughPoint]);

  // useEffect(() => {
  //   console.log("크리에이트 데이트 유저 네임", username);
  //   console.log("크리에이트 데이트 이벤트 네임", eventname);
  //   console.log("체크 모달", isCheckModal);
  //   console.log(sponsorStartDate);
  //   console.log(sponsorEndDate);
  // }, []);

  // 이벤트 생성 하는 함수
  const handleCreateSponsoredEvent = async () => {
    // 로딩바 실현
    setIsLoading(true);
    if (confirm) {
      // 무료 이벤트 && 체트 통과 일 때
      const formData = new FormData();
      formData.append("email", email);
      formData.append("event_image", eventimg);
      formData.append("user_image", userImage);
      formData.append("username", username);
      formData.append("event_name", eventname);
      formData.append("event_url", eventUrl);
      formData.append("event_external_link", shoppingUrl);
      formData.append("event_original_price", originalPrice);
      formData.append("event_sale_price", newPrice);
      formData.append("event_platform", "instagram");
      formData.append(
        "event_duration",
        `${format(durationStart, `MM/d`)} - ${format(durationEnd, `MM/d`)}`
      );
      formData.append("event_category", category);
      // 광고 시작일, 종료일
      formData.append("event_start", durationStart);
      formData.append("event_end", durationEnd);
      formData.append("event_ad_start", sponsorStartDate);
      formData.append("event_ad_end", sponsorEndDate);
      // 무료기 때문에 크레딧은 '0'로
      formData.append("event_credit", totalCredits);
      // 무료일때 true 광고일때 : false
      formData.append("evnet_free", false);
      // 무료일때 : 1 , 광고일때 : 4
      formData.append("event_type", 4);

      await axios
        .post(createEventAPI, formData, {
          headers
        })
        .then(res => {
          console.log("스폰서드 이벤트 만들기 서버 응답 결과", res);
          if (res.data.success === 1) {
            window.location.href = "/Congrats";
            setIsLoading(false);
          } else {
            console.log("event not created");
            setIsLoading(false);
          }
        });
    } else if (confirm) {
      // 스폰서드 이벤트 && 체크 통과 일 때
      // window.location.href = "/CreateEvent/CreateDate";
      setIsLoading(false);
    } else {
      // 체크 통과하지 못했을 때
      dispatch(openModal(true));
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <CalendarWrap>
        <CalendarContainer>
          <TitleWrap>
            <Title>모두의 셀러에서 홍보하실 날짜를 선택해 주세요</Title>
          </TitleWrap>
          <ScheduleContainer>
            <DateRangePicker />
          </ScheduleContainer>
        </CalendarContainer>
        <DateSelectContainer>
          <TitleWrap>
            <Title>선택된 날짜</Title>
          </TitleWrap>
          {sponsorStartDate ? <AfterSelectDate /> : <BeforeSelectDate />}
        </DateSelectContainer>
      </CalendarWrap>
      <ConfirmBtnWrap>
        <ConfirmBtn
          confirm={confirm}
          onClick={() => {
            handleCreateSponsoredEvent();
          }}
        >
          확 인
        </ConfirmBtn>
      </ConfirmBtnWrap>
      {isCheckModal && <CheckSponsoredEventModal />}
      {isLoading ? <Loading /> : null}
    </Container>
  );
}

export default withRouter(CreateEventDate);

const Container = styled.main`
  /* p {
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
    color: #212121;
    height: 40px;
  } */
  @media (max-width: 500px) {
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 500px) {
    padding-left: 12px;
  }
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 21px;
  color: #212121;
  margin-bottom: 15px;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 120px;
  @media (max-width: 500px) {
    margin-right: 0px;
  }
`;

const ScheduleContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 50px;
  }
`;

const ConfirmBtnWrap = styled.div`
  margin-top: 220px;
  background: #f2f6ff;
  ${({ theme }) => theme.flex("flex-start", "center", "row-reverse")};
  width: 100%;
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
`;

const ConfirmBtn = styled.button`
  width: 208px;
  height: 36px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  background: ${({ confirm }) => (confirm ? "#212121" : "#BDBDBD")};
  cursor: ${({ confirm }) => (confirm ? "pointer" : "cursor")};
  @media (max-width: 500px) {
    width: 160px;
  }
`;
