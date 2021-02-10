import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { headers, getUserInfo } from "../../Config/urls";
import {
  setUpcoming,
  setOngoing,
  setPast,
  setDelete
} from "../../modules/EventModule";
import EditParentModal from "./Components/EditParentModal";
import DeleteParentModal from "./Components/DeleteParentModal";
import DeletedSnackBar from "./Components/DeletedSnackBar";

function Order() {
  const upcomingEvents = useSelector(store => store.upcomingReducer);
  const ongoingEvents = useSelector(store => store.ongoingReducer);
  const pastEvents = useSelector(store => store.pastReducer);
  const del = useSelector(store => store.deleteReducer);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("access_token");
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState(false);
  const [permlink, setPermlink] = useState("");

  //'자세히보기 모달에 해당 이벤트 상세 정보 props로 전달
  const [details, sendDetails] = useState({
    event_image: "",
    event_user_image: "",
    event_username: "",
    event_name: "",
    event_duration: "",
    event_category: "",
    event_order: "",
    event_credit: ""
  });

  const dispatch = useDispatch();

  //upcoming, ongoing, past 이벤트를 서버에서 가지고 오는 함수
  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get(getUserInfo, {
        headers,
        params: {
          email,
          token
        }
      });
      // 잘못된 처리시 로그아웃 처리
      if (data.success === 0) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        localStorage.removeItem("new_user");
        localStorage.removeItem("toggle");
        window.location.href = "/";
        return;
      }

      dispatch(setUpcoming(data.data.upcoming_events));
      dispatch(setOngoing(data.data.ongoing_events));
      dispatch(setPast(data.data.past_events));
      setData(true);
    };
    getEvents();
  }, []);

  useEffect(() => {
    if (data) {
      btnchange();
    }
  }, [data]);

  const btnchange = date => {
    if (date) {
      function getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      }

      let today = getToday();

      function setYesterday(date) {
        var selectDate = date.split("-");
        var changeDate = new Date();
        changeDate.setFullYear(
          selectDate[0],
          selectDate[1] - 1,
          selectDate[2] - 1
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
        return false;
      }
    }
    return true;
  };

  if (!token && !email) {
    window.location.href = "/";
  } else {
    return (
      <>
        {/* 서버에서 데이터가 정상적으로 들어 왔을때에만 렌더링 */}
        <Container>
          {/* 이벤트 상세 모달 */}
          {edit && (
            <EditParentModal setEdit={setEdit} edit={edit} details={details} />
          )}
          {/* 이벤트 삭제 모달 */}
          {del && (
            <DeleteParentModal
              del={del}
              setDeleted={setDeleted}
              permlink={permlink}
            />
          )}
          {/* 이벤트 삭제 확정 모달 */}
          {deleted && <DeletedSnackBar />}
          <Subcontainer>
            <Title> 모든 스케줄을 한 눈에 확인하세요</Title>
            <ColumnWrap>
              <GridColumnContainer>
                <GridColumn upcomingEvents={upcomingEvents[0]?.length}>
                  <SubTitle>예정된 이벤트</SubTitle>
                  <Tooltip>
                    <p>
                      예정된 스케줄이 진행되기 24시간 전에는 취소가 가능합니다.
                    </p>
                  </Tooltip>
                  {upcomingEvents[0]?.map((card, idx) => {
                    const {
                      event_image,
                      event_user_image,
                      event_username,
                      event_name,
                      event_duration,
                      event_category,
                      event_permlink,
                      event_order,
                      event_credit,
                      event_start,
                      event_original_price,
                      event_sale_price,
                      event_ext_link
                    } = card;
                    return (
                      <PreviewWrap key={event_permlink}>
                        <Preview>
                          <PreviewImg eventimg={event_image} />
                          <PreviewDes>
                            <Username>
                              <Userimg profileimg={event_user_image} />
                              {event_username}
                            </Username>
                            <Price>
                              {Math.round(
                                (1 - event_sale_price / event_original_price) *
                                  100
                              )}
                              %
                              <span>
                                &nbsp; &#8361;
                                {Number(event_sale_price).toLocaleString()}
                              </span>
                            </Price>
                            <Eventname>{event_name}</Eventname>
                            <Eventdate>{event_duration}</Eventdate>
                          </PreviewDes>
                        </Preview>
                        <BtnWrap>
                          <DetailBtn
                            onClick={() => {
                              setEdit(!edit);
                              sendDetails({
                                event_image,
                                event_user_image,
                                event_username,
                                event_name,
                                event_duration,
                                event_category,
                                event_order,
                                event_credit,
                                event_ext_link
                              });
                            }}
                          >
                            자세히 보기
                          </DetailBtn>
                          {btnchange(event_start) && (
                            <DeleteBtn
                              onClick={() => {
                                localStorage.setItem(
                                  "permlink",
                                  event_permlink
                                );
                                dispatch(setDelete(!del));
                                setPermlink(event_permlink);
                              }}
                            />
                          )}
                        </BtnWrap>
                      </PreviewWrap>
                    );
                  })}
                </GridColumn>
              </GridColumnContainer>
              <GridColumnContainer>
                <GridColumn2 ongoingEvents={ongoingEvents[0]?.length}>
                  <SubTitle>진행중인 이벤트</SubTitle>
                  {ongoingEvents[0]?.map((card, idx) => {
                    const {
                      event_image,
                      event_user_image,
                      event_username,
                      event_name,
                      event_duration,
                      event_category,
                      event_order,
                      event_credit,
                      event_original_price,
                      event_sale_price,
                      event_ext_link
                    } = card;
                    return (
                      <PreviewWrap key={idx}>
                        <Preview>
                          <PreviewImg eventimg={event_image} />
                          <PreviewDes>
                            <Username>
                              <Userimg profileimg={event_user_image} />
                              {event_username}
                            </Username>
                            <Price>
                              {Math.round(
                                (1 - event_sale_price / event_original_price) *
                                  100
                              )}
                              %
                              <span>
                                &nbsp; &#8361;
                                {Number(event_sale_price).toLocaleString()}
                              </span>
                            </Price>
                            <Eventname>{event_name}</Eventname>
                            <Eventdate>{event_duration}</Eventdate>
                          </PreviewDes>
                        </Preview>
                        <BtnWrap>
                          <DetailBtn
                            onClick={() => {
                              setEdit(!edit);
                              sendDetails({
                                event_image,
                                event_user_image,
                                event_username,
                                event_name,
                                event_duration,
                                event_category,
                                event_order,
                                event_credit,
                                event_ext_link
                              });
                            }}
                          >
                            자세히 보기
                          </DetailBtn>
                        </BtnWrap>
                      </PreviewWrap>
                    );
                  })}
                </GridColumn2>
              </GridColumnContainer>
              <GridColumnContainer>
                <GridColumn3 pastEvents={pastEvents[0]?.length}>
                  <SubTitle>종료된 이벤트</SubTitle>
                  {pastEvents[0]?.map((card, idx) => {
                    const {
                      event_image,
                      event_user_image,
                      event_username,
                      event_name,
                      event_duration,
                      event_category,
                      event_order,
                      event_credit,
                      event_original_price,
                      event_sale_price,
                      event_ext_link
                    } = card;
                    return (
                      <PreviewWrap key={idx}>
                        <Preview>
                          <PreviewImg eventimg={event_image} />
                          <PreviewDes>
                            <Username>
                              <Userimg profileimg={event_user_image} />
                              {event_username}
                            </Username>
                            <Price>
                              {Math.round(
                                (1 - event_sale_price / event_original_price) *
                                  100
                              )}
                              %
                              <span>
                                &nbsp; &#8361;
                                {Number(event_sale_price).toLocaleString()}
                              </span>
                            </Price>
                            <Eventname>{event_name}</Eventname>
                            <Eventdate>{event_duration}</Eventdate>
                          </PreviewDes>
                        </Preview>
                        <BtnWrap>
                          <DetailBtn
                            onClick={() => {
                              setEdit(!edit);
                              sendDetails({
                                event_image,
                                event_user_image,
                                event_username,
                                event_name,
                                event_duration,
                                event_category,
                                event_order,
                                event_credit,
                                event_ext_link
                              });
                            }}
                          >
                            자세히 보기
                          </DetailBtn>
                        </BtnWrap>
                      </PreviewWrap>
                    );
                  })}
                </GridColumn3>
              </GridColumnContainer>
            </ColumnWrap>
          </Subcontainer>
        </Container>
      </>
    );
  }
}

export default Order;

const Container = styled.main`
  ${({ theme }) => theme.container}
`;
const Subcontainer = styled.div`
  ${({ theme }) => theme.pageWrap}
  ${({ theme }) => theme.flex("flex-start", "flex-start", "column")};
`;

const Title = styled.p`
  margin: 0 0 50px;
  font-weight: 300;
  font-size: 34px;
  line-height: 130%;
  color: #96a9cf;
`;

const ColumnWrap = styled.div`
  height: 100%;
  margin: 0 auto;
  overflow-y: hidden;
  ${({ theme }) => theme.flex("space-between", "flex-start", "row")};
`;

const GridColumnContainer = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #dee8ff;
  margin-right: 30px;
  :last-child {
    border: 0;
  }
`;

const GridColumn = styled.div`
  width: 70%;
  height: 100%;
  min-width: 335px;
  padding-left: 33px;
  ${({ theme }) => theme.flex("flex-start", "flex-start", "column")};
  ${({ upcomingEvents }) => (upcomingEvents > 2 ? "overflow-y: scroll" : null)};

  ::-webkit-scrollbar {
    width: 8px;
    background: #ffffff;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    width: 8px;
    background: #96a9cf;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    width: 8px;
    border-radius: 4px;
  }

  :first-child {
    padding-left: 0;
  }
`;

const GridColumn2 = styled(GridColumn)`
  ${({ ongoingEvents }) => (ongoingEvents > 2 ? "overflow-y: scroll" : null)};
`;

const GridColumn3 = styled(GridColumn)`
  ${({ pastEvents }) => (pastEvents > 2 ? "overflow-y: scroll" : null)};
`;

const SubTitle = styled.p`
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  color: #212121;
  margin-bottom: 24px;
`;

const Tooltip = styled.div`
  position: relative;
  width: 85%;
  height: auto;
  padding: 11px 15px 13px 42px;
  margin-bottom: 36px;
  background: url("/images/ordertooltip.svg") no-repeat;
  background-position: center left 20px;
  background-color: #dee8ff;
  background-size: 12px;
  border-radius: 8px;
  word-break: break-word;
  white-space: initial;

  p {
    left: 48px;
    font-size: 14px;
    line-height: 120%;
  }
`;

const PreviewWrap = styled.div`
  min-width: 300px;
  margin-bottom: 16px;
  border-bottom: 1px solid #dee8ff;
  ${({ theme }) => theme.flex("flex-start", "center", "column")};
`;

const Preview = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  border-radius: 12px;
`;

const PreviewImg = styled.span`
  display: inline-block;
  width: 124px;
  height: 124px;
  margin-right: 12px;
  background: ${({ eventimg }) =>
    eventimg
      ? `url(${eventimg}) no-repeat center`
      : `url("/images/previewimage.svg") no-repeat`};
  background-size: cover;
  border-radius: 6px;
`;

const PreviewDes = styled.div`
  width: 60%;
  ${({ theme }) => theme.flex("space-evenly", "flex-start", "column")};
`;

const Username = styled.p`
  width: 100%;
  display: flex;
  font-size: 14px;
  line-height: 130%;
  color: #424242;
  ${({ theme }) => theme.flex("flex-start", "center", "row")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Userimg = styled.span`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background: ${({ profileimg }) =>
    profileimg
      ? `url(${profileimg}) no-repeat center`
      : `url("/images/previewusername.png") no-repeat`};
  background-size: cover;
  border-radius: 4px;
`;

const Price = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  line-height: 100%;
  color: #757575;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 14px;
    line-height: 130%;
    color: #212121;
  }
`;

const Eventname = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  line-height: 130%;
  color: #424242;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Eventdate = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 110%;
  padding: 2px 8px;
  background-color: #ffebe2;
  border-radius: 4px;
  line-height: 110%;
  color: #212121;
`;

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 14px 0;
  ${({ theme }) => theme.flex("space-between", "center", "row")};
`;

const DetailBtn = styled.div`
  width: 92.45px;
  padding: 10px 8px;
  border: 1px solid #757575;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #757575;

  :hover {
    background-color: #ffffff;
    border: 1px solid black;
    color: black;
  }
`;

const DeleteBtn = styled(DetailBtn)`
  width: 40px;
  height: 100%;
  padding: 10px 8px;
  background: url("/images/orderdelete.svg") no-repeat center;
`;
