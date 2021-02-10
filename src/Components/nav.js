import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Moment from "react-moment";
import { withRouter, NavLink, useHistory } from "react-router-dom";
import {
  setUpcoming,
  setOngoing,
  setDelete,
  setPerm
} from "../modules/EventModule";
import { NAV_MENU } from "./data/navMock";
import { headers, getUserInfo, getCart } from "../Config/urls";
import NavModal from "./NavModal";
import DeletedSnackBar from "../Pages/Order/Components/DeletedSnackBar";
import DeleteParentModal from "../Pages/Order/Components/DeleteParentModal";
import { addDataCart } from "../modules/CartDataModule";
import { FaBars } from "react-icons/fa";
import { center } from "../Config/commonStyles";

function Nav() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [upcomingPermlink, setUpcomingPermlink] = useState("");
  const upcomingEvents = useSelector(store => store.upcomingReducer);
  const ongoingEvents = useSelector(store => store.ongoingReducer);
  const cartDataItems = useSelector(store => store.cartDataReducer);
  const del = useSelector(store => store.deleteReducer);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [schedule, setSchedule] = useState({
    upcoming: true,
    ongoing: false
  });

  const [data, setData] = useState("");
  const [deletebtn, setdeletebtn] = useState(true);
  const [date, setDate] = useState("");
  const [navToggle, setNavToggle] = useState(true);

  //이벤트 정보와 유저 정보를 서버에서 받아오는 함수
  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get(getUserInfo, {
        headers,
        params: {
          email,
          token
        }
      });
      console.log("겟유저데이터 네비게이션", data);
      // 잘못된 처리시 로그아웃 처리
      if (data.success === 0) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        localStorage.removeItem("new_user");
        localStorage.removeItem("toggle");
        window.location.href = "/";
        return;
      }
      console.log("여기여기");
      dispatch(setUpcoming(data.data.upcoming_events));
      dispatch(setOngoing(data.data.ongoing_events));
      setUpcomingPermlink(data.data.upcoming_events[0]?.event_permlink);
      setData(data.data.user_data);
      setDate(data.data.upcoming_events[0]?.event_start);
      if (data.data.upcoming_events[0]) {
        dispatch(setPerm(data.data.upcoming_events[0].event_permlink));
      }
    };
    getEvents();
    //새로 업데이트 한 부분(02.05)
    // console.log("여기다 여기");
  }, []);

  //date 값이 변경 될 때, 값이 있으면 btnchange 함수 실행
  useEffect(() => {
    if (date !== "") {
      btnchange();
    }
  }, [date]);

  //오늘 날짜를 기준으로 선택된 날짜가 24시간 미만 남았을 경우 deletebtn false 로 반환하는 함수
  const btnchange = () => {
    if (date !== "") {
      function getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      }

      let today = getToday();

      function setYesterday(date) {
        var selectDate = date?.split("-");
        var changeDate = new Date();
        changeDate.setFullYear(
          selectDate && selectDate[0],
          selectDate && selectDate[1] - 1,
          selectDate && selectDate[2] - 1
        );

        var y = changeDate.getFullYear();
        var m = changeDate.getMonth() + 1;
        var d = changeDate.getDate();
        if (m < 10) {
          m = "0" + m;
        }
        if (d < 10) {
          d = "0" + d;
        }
        var resultDate = y + "-" + m + "-" + d;
        return resultDate;
      }

      let newdate = setYesterday(date);

      if (today === newdate) {
        setdeletebtn(!deletebtn);
      }
    }
    return;
  };

  //페이지가 업데이트 될 때, cart 의 정보를 호출하는 함수
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(getCart, {
        headers,
        params: {
          email,
          token
        }
      });
      dispatch(addDataCart(data.data.carts));
    };

    getData();
  }, []);

  const handleToggle = () => {
    setNavToggle(prevState => !prevState);
    console.log(navToggle);
  };

  return (
    <>
      {del && (
        <DeleteParentModal
          del={del}
          setDeleted={setDeleted}
          permlink={localStorage.getItem("permlink")}
        />
      )}
      {deleted && <DeletedSnackBar />}
      <NavContainer>
        <LogoContainer>
          <Logo />
          <ToggleContainer onClick={() => handleToggle()}>
            <FaBars />
          </ToggleContainer>
        </LogoContainer>
        {navToggle ? (
          <NavWrap>
            {open ? <NavModal open={open} setOpen={setOpen} /> : ""}
            <UpperWrap>
              <UserInfo>
                <UserName>{data.name}</UserName>

                <Credit>보유중인 포인트: {data.memb_credit}</Credit>
              </UserInfo>
              <MenuWrap>
                {/* NavLink 스타일은 별도의 navMock 이라는 파일에서 관리 */}
                {/* Create Event 페이지를 벗어나기 전에 뜨는 경고 모달창 구현시, 아래 코드를 component화 해야 할 것. */}
                {NAV_MENU?.map((menu, idx) => {
                  const { name, url } = menu;
                  return (
                    <NavLink
                      id={idx + 1}
                      to={url}
                      activeClassName={"active"}
                      style={NAV_MENU[idx].styleOff}
                      activeStyle={NAV_MENU[idx].styleOn}
                    >
                      {name}
                    </NavLink>
                  );
                })}
                <KakaoLink
                  href="http://pf.kakao.com/_HQVVK/chat"
                  target="_blank"
                >
                  문의하기
                </KakaoLink>
              </MenuWrap>
            </UpperWrap>
            <BottomWrap>
              <TapWrap>
                <UpcomingTap
                  onClick={() => {
                    setSchedule({ upcoming: true, ongoing: false });
                  }}
                  selected={schedule.upcoming}
                >
                  예정
                </UpcomingTap>
                <OngoingTap
                  onClick={() => {
                    setSchedule({ upcoming: false, ongoing: true });
                  }}
                  selected={schedule.ongoing}
                >
                  진행
                </OngoingTap>
              </TapWrap>
              {data && (
                <ScheduleWrap>
                  {/* 네비 하단 upcoming & ongoing 토글 코드 */}
                  {upcomingEvents[0]?.length && schedule.upcoming ? (
                    <PreviewWrap>
                      <Preview>
                        <EventTitle>
                          {upcomingEvents[0][0]?.event_name}
                        </EventTitle>
                        <PreviewDes>
                          <EventImg
                            eventimg={upcomingEvents[0][0]?.event_image}
                          />
                          <DesWrap>
                            <EventDuration>
                              {upcomingEvents[0][0]?.event_duration}
                            </EventDuration>
                            <div
                              style={{ display: "flex", padding: "2px 8px" }}
                            >
                              업데이트:&nbsp;
                              <Moment format="MM/DD">
                                {upcomingEvents[0][0]?.event_updated1}
                              </Moment>
                            </div>
                          </DesWrap>
                        </PreviewDes>
                        <BtnWrap>
                          {deletebtn && (
                            <DeleteBtn
                              onClick={() => {
                                dispatch(setDelete(!del));
                                localStorage.setItem(
                                  "permlink",
                                  upcomingPermlink
                                );
                              }}
                            />
                          )}
                        </BtnWrap>
                      </Preview>
                      <SeeMore onClick={() => history.push("/Order")}>
                        더 보기
                      </SeeMore>
                    </PreviewWrap>
                  ) : !upcomingEvents[0]?.length && schedule.upcoming ? (
                    <EmptySchedule>
                      <img src="/images/events.svg" alt="events" />
                      <Schedules>예정된 일정이 보여집니다.</Schedules>
                    </EmptySchedule>
                  ) : null}
                  {ongoingEvents[0]?.length && schedule.ongoing ? (
                    <PreviewWrap>
                      <Preview>
                        <EventTitle>
                          {ongoingEvents[0][0]?.event_name}
                        </EventTitle>
                        <PreviewDes>
                          <EventImg
                            eventimg={ongoingEvents[0][0]?.event_image}
                          />
                          <DesWrap>
                            <EventDuration>
                              {ongoingEvents[0][0]?.event_duration}
                            </EventDuration>
                            <div
                              style={{ display: "flex", padding: "2px 8px" }}
                            >
                              업데이트:&nbsp;
                              <Moment format="MM/DD">
                                {ongoingEvents[0][0]?.event_updated1}
                              </Moment>
                            </div>
                          </DesWrap>
                        </PreviewDes>
                      </Preview>
                      <SeeMore onClick={history.push("/Order")}>
                        더 보기
                      </SeeMore>
                    </PreviewWrap>
                  ) : !ongoingEvents[0]?.length && schedule.ongoing ? (
                    <EmptySchedule>
                      <img src="/images/events.svg" alt="events" />
                      <Schedules>진행중인 일정이 보여집니다.</Schedules>
                    </EmptySchedule>
                  ) : null}
                </ScheduleWrap>
              )}
              <InfoContainer>
                <p>서울특별시 강남구 신사동 525-1 이룸빌딩 1층</p>
                <p> 머치스퀘어(주) 사업자등록번호:168-81-00659</p>
                <p>대표자: 송상우, 구교빈 전화번호: 070-4229-6120 </p>
                <p> Email:info@moduseller.com</p>
                <p>Copyright © Merchsquare,Inc.2020 All Rights Reserved</p>
                <BtnContainer>
                  <ServiceBtn>
                    <a
                      href="https://www.moduseller.com/terms-of-service"
                      target="_blank"
                    >
                      서비스 이용약관
                    </a>
                  </ServiceBtn>
                  <PersonalInfoBtn>
                    <a
                      href="https://www.moduseller.com/privacy-policy"
                      target="_blank"
                    >
                      개인 정보 정책
                    </a>
                  </PersonalInfoBtn>
                </BtnContainer>
              </InfoContainer>
            </BottomWrap>
          </NavWrap>
        ) : null}
      </NavContainer>
    </>
  );
}
export default Nav;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NavWrap = styled.nav`
  /* left: 16px;
  top: 16px; */
  /* height: 97%; */
  width: 248px;

  min-height: 830px;
  background-color: #3c66ba;
  /* border-radius: 8px; */
  border-left: 1px solid #6e9dfd;
  border-right: 1px solid #6e9dfd;
  border-bottom: 1px solid #6e9dfd;
  /* border: 1px solid #6e9dfd; */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  /* padding: 32px 0; */

  /* ${({ theme }) => theme.flex("center", "space-evenly", "column")} */
`;

const UpperWrap = styled.div`
  padding: 32px 24px 0px 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  /* ${({ theme }) => theme.flex("space-evenly", "flex-start", "column")} */
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  padding: 20px 24px 20px 24px;
  width: 248px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #3c66ba;
`;

const Logo = styled.div`
  background: url("/images/Logo.svg") center no-repeat;
  background-size: contain;
  width: 120px;
  height: 31px;
  min-height: 31px;
  margin-right: 60px;
`;

const ToggleContainer = styled.button`
  font-size: 18px;
  color: white;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  margin: 0px 0px 50px 0px;
`;

const UserName = styled.div`
  width: 200px;
  font-size: 25px;
  color: #ffffff;
  font: Roboto;
  font-weight: 700;
  line-height: 29.3px;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Credit = styled.p`
  width: 165px;
  background-color: #ffebe2;
  border-radius: 4px;
  padding: 4px 8px;
  font: Roboto;
  font-weight: bold;
  font-size: 13px;
  color: #212121;
  text-transform: uppercase;
`;

const KakaoLink = styled.a`
  display: flex;
  width: 100%;
  padding: 10px 15px 10px 45px;
  font-family: "Roboto Condensed", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 16px;
  letter-spacing: 0.1em;
  cursor: pointer;
  border-radius: 12px;
  color: rgb(255, 255, 255);
  background: url(/images/kakaoTalkOff.svg) left 20px center no-repeat
    transparent;
`;

const MenuWrap = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flex("center", "flex-start", "column")}
`;

const BottomWrap = styled.div`
  height: 37%;
  background-color: transparent;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  border-top: 1px solid #6e9dfd;
  color: #ffffff;
  padding: 0 24px;
`;

const TapWrap = styled.div`
  padding-top: 25px;
  margin-bottom: 6px;
  ${({ theme }) => theme.flex("space-between;", "center", "row")}
`;

const UpcomingTap = styled.span`
  display: inline-block;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  padding: 0 35px 15px;
  cursor: pointer;
  border-bottom: ${({ selected }) => (selected ? "1px solid #ffffff" : null)};
  color: ${({ selected }) => (selected ? "#ffffff" : "#96A9CF")};
`;

const OngoingTap = styled(UpcomingTap)`
  border-bottom: ${({ selected }) => (selected ? "1px solid #ffffff" : null)};
  color: ${({ selected }) => (selected ? "#ffffff" : "#96A9CF")};
`;

const ScheduleWrap = styled.div`
  height: 65%;
  ${({ theme }) => theme.flex("center", "center", "row")}
  img {
    margin-bottom: 24px;
  }
`;

const EmptySchedule = styled.div`
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const Schedules = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #dee8ff;
`;

const PreviewWrap = styled.div`
  width: 100%;
`;

const Preview = styled.div`
  width: 100%;
  padding: 16px 12px;
  background: #4670c3;
  border: 0.5px solid #6e9dfd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.p`
  width: 100%;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 13px;
  line-height: 100%;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PreviewDes = styled.div`
  width: 100%;
  margin-bottom: 12px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")};
`;

const EventImg = styled.span`
  display: inline-block;
  width: 48px;
  height: 40px;
  background: ${({ eventimg }) => `url(${eventimg}) no-repeat center`};
  background-size: cover;
  border-radius: 4px;
`;

const DesWrap = styled.div`
  width: 100%;
  font-size: 11px;
  line-height: 110%;
  padding: 2px 8px;
  color: #ffffff;
  ${({ theme }) => theme.flex("flex-start", "flex-start", "column")};
`;

const EventDuration = styled.p`
  font-size: 11px;
  line-height: 110%;
  padding: 2px 8px;
  color: #ffffff;
`;

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  ${({ theme }) => theme.flex("flex-end", "center", "row")};
`;

const DeleteBtn = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px 8px;
  margin-left: auto;
  border: 1px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  background: url("/images/navdeletebtn.svg") no-repeat center;
`;

const SeeMore = styled(DeleteBtn)`
  width: 128px;
  height: 36px;
  margin: 5% auto 0;
  font-weight: bold;
  font-size: 11px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: none;
  :hover {
    border: 1.2px solid #ffffff;
  }
`;

const InfoContainer = styled.div`
  font-size: 6px;
  line-height: 120%;
  text-align: center;
  margin-top: 12px;
  color: #96a9cf;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;

const ServiceBtn = styled.button`
  color: #212121;
  font-weight: bold;
  font-size: 7px;
  color: #96a9cf;
`;

const PersonalInfoBtn = styled.button`
  color: #212121;
  font-weight: bold;
  color: #96a9cf;
  font-size: 7px;
`;
