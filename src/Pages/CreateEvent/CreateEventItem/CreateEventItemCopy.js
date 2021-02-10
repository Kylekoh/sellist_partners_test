import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setEventName,
  setEventUrl,
  setShoppingUrl,
  setOriginalPrice,
  setNewPrice,
  setUserImage,
  setEventImg,
  setEventCategory,
  setSalesDurationStart,
  setSalesDurationEnd,
  deleteProfileImg,
  deleteEventImg
} from "../../../modules/UserInputModule";
import { CATEGORY } from "../../../Config/STATIC";
import DurationCalender from "./DurationCalendar";
import CreateEventFreePreview from "./CreateEventFreePreview";
import CreateEventSponPreview from "./CreateEventSponPreview";
import { headers, createEventAPI, getUserInfo } from "../../../Config/urls";
import CheckFreeEventModal from "./CheckFreeEventModal";
import { openModal } from "../../../modules/CheckModalModule";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Loading from "../../../Components/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    background: "none",
    boxShadow: "none"
  },
  exP: {
    fontStyle: "nomal",
    fontWeight: 500,
    fontSize: "21px",
    color: "#212121",
    lineHeight: "25px",
    height: "40px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  exPTwo: {
    fontStyle: "nomal",
    fontWeight: 500,
    fontSize: "21px",
    color: "#212121",
    lineHeight: "25px",
    height: "40px",
    marginTop: theme.spacing(-40),
    marginBottom: theme.spacing(1)
  },
  inputCd: {
    width: "100%",
    minHeight: 1100,
    marginTop: theme.spacing(2),
    border: "none",
    boxShadow: "none",
    borderRadius: 12,
    background: "none"
  },
  expCd: {
    width: "100%",
    border: "none",
    boxShadow: "none",
    borderRadius: 12,
    background: "none",
    marginBottom: theme.spacing(5)
  },
  expCdTwo: {
    width: "100%",
    border: "none",
    boxShadow: "none",
    borderRadius: 12,
    background: "none",
    marginTop: theme.spacing(-15),
    marginBottom: theme.spacing(5)
  },
  imgUp: {
    display: "inline",
    background: "red"
  },
  input: {
    display: "none"
  },
  styP: {
    marginBottom: theme.spacing(1)
  },
  btnCol: {
    marginTop: theme.spacing(3)
  },
  radioCd: {
    minWidth: 160,
    margin: theme.spacing(1),
    boxShadow: "none",
    borderRadius: 8,
    border: "1px solid #dee8ff",
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(-5)
  },
  radio: {
    "&$checked": {
      color: "#4B8DF8"
    }
  },
  spaceCd: {
    minWidth: 350,
    margin: theme.spacing(1),
    boxShadow: "none",
    borderRadius: 8,
    border: "1px solid #dee8ff",
    marginBottom: theme.spacing(15)
  },
  radi: {
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 14,
    background: "rgba(184, 184, 184, 0.45)"
  },
  radioCdOne: {
    minWidth: 160,
    margin: theme.spacing(1),
    marginTop: theme.spacing(-12),
    boxShadow: "none",
    borderRadius: 8,
    border: "1px solid #dee8ff",
    paddingLeft: theme.spacing(1),
    backgroundColor: "#F2F6FF"
  },
  mb: {
    marginBottom: theme.spacing(15)
  },
  bmkBtn: {
    backgroundColor: "white",
    width: "50px",
    height: "50px",
    display: "fixed",
    zIndex: 1,
    top: "35px",
    left: "120px"
  },
  insta: {
    display: "fixed",
    zIndex: 1,
    top: "90px",
    left: "75px"
  },
  shop: {
    display: "fixed",
    zIndex: 1,
    bottom: "24px",
    left: "95px"
  }
}));

const override = css`
  display: block;
  margin: 0 auto;
  background-color: gray;
`;

function CreateEventItem(props) {
  const classes = useStyles();
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  const username = useSelector(store => store.usernameReducer);
  const userImage = useSelector(store => store.profileimgReducer);
  const eventname = useSelector(store => store.eventnameReducer);
  const eventimg = useSelector(store => store.eventimgReducer);
  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);
  const eventUrl = useSelector(store => store.eventurlReducer);
  const shoppingUrl = useSelector(store => store.shoppingurlReducer);
  const originalPrice = useSelector(store => store.originalpriceReducer);
  const newPrice = useSelector(store => store.newpriceReducer);
  const durationStart = useSelector(store => store.durationStartReducer);
  const durationEnd = useSelector(store => store.durationEndReducer);
  const category = useSelector(store => store.eventcategoryReducer);
  const isCheckModal = useSelector(store => store.checkModalReducer);
  const dispatch = useDispatch();

  //02.01
  const [eventURL, setEventURL] = useState("");
  const [shopURL, setShopURL] = useState("");

  const [toggle, setToggle] = useState(false);
  const [categoryIdx, setCategory] = useState("");
  const [categoryfocus, onCategory] = useState(false);

  //input 창에 focus 되었는지 여부를 검증
  const [focus, focused] = useState({
    username: false,
    salesevent: false,
    eventurl: false,
    shoppingurl: false,
    originalprice: false,
    newprice: false,
    duration: false,
    category: false
  });

  const [profileimgcancel, cancelProfile] = useState(false);
  const [eventimgcancel, cancelEvent] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [profileBase64, setProfileBase64] = useState("");
  const [eventBase64, setEventBase64] = useState("");
  const [credit, getCredit] = useState("");
  const [isValidEventUrl, setIsValidEventUrl] = useState([false, true]);
  const [isValidShopUrl, setIsValidShopUrl] = useState([false, true]);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [sponsored, setSponsored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const eventUrlChk = isValidEventUrl.every(el => el);
  const shopUrlChk = isValidShopUrl.every(el => el);

  const difference = sponsorEndDate - sponsorStartDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24) + 1);
  const totalCredits = days * 10;

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get(getUserInfo, {
        headers,
        params: {
          email,
          token: accessToken
        }
      });

      getCredit(data.data.user_data);
    };
    getEvents();
  }, [accessToken, email]);

  useEffect(() => {
    console.log(eventURL);
  }, [eventURL]);

  const uploadProfileImg = e => {
    setProfileBase64("");
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      base64 ? setProfileBase64(base64.toString()) : setProfileBase64("");
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      dispatch(setUserImage(e.target.files[0]));
    }
  };

  const uploadEventImg = e => {
    setEventBase64("");
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      base64 ? setEventBase64(base64.toString()) : setEventBase64("");
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      dispatch(setEventImg(e.target.files[0]));
    }
  };

  // 이벤트 생성 하는 함수
  const handleCreateFreeEvent = async () => {
    console.log("무료 이벤트 생성 테스트 콜드 ");
    setIsLoading(true);
    if (!sponsored && confirm) {
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
      // 무료기 때문에 크레딧은 '0'로
      formData.append("event_credit", 0);
      // 무료일때 true 광고일때 : false
      formData.append("event_free", true);
      // 무료일때 : 1 , 광고일때 : 4
      formData.append("event_type", 1);

      await axios
        .post(createEventAPI, formData, {
          headers
        })
        .then(res => {
          console.log("이벤트 생성 서버 응답", res);
          if (res.data.success === 1) {
            window.location.href = "/Congrats";
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log("event not created");
          }
        });
    } else if (sponsored && confirm) {
      // 스폰서드 이벤트 && 체크 통과 일 때
      props.history.push({
        pathname: "/CreateEvent/CreateDate"
      });
      setIsLoading(false);
      // window.location.href = "/CreateEvent/CreateDate";
    } else {
      // 체크 통과하지 못했을 때
      dispatch(openModal(true));
      setIsLoading(false);
    }
  };

  const inputChageHandler = () => {
    console.log("hahahaha");
  };

  //Eventurl validation 함수(검증을 모두 통과했을 때만 value값을 전달한다.)
  const verifyEventUrl = e => {
    const { value } = e.target;
    const urlRegex = require("url-regex");
    const httpChk = value.includes("http://") || value.includes("https://");
    const comChk = value.includes("co.kr") || value.includes(".com");

    if (urlRegex({ exact: true }).test(value) && comChk) {
      setIsValidEventUrl([true, true]);
      dispatch(setEventUrl(value));
    } else if (httpChk && !comChk) {
      setIsValidEventUrl([true, false]);
      dispatch(setEventUrl(null));
    } else if ((!httpChk && !comChk) || (!httpChk && comChk)) {
      setIsValidEventUrl([false, true]);
      dispatch(setEventUrl(null));
    }
  };

  //Shoppingurl validation 함수(검증을 모두 통과했을 때만 value값을 전달한다.)
  const verifyShopUrl = e => {
    const { value } = e.target;
    const urlRegex = require("url-regex");
    const httpChk = value.includes("http://") || value.includes("https://");
    const comChk = value.includes("co.kr") || value.includes(".com");

    if (urlRegex({ exact: true }).test(value) && comChk) {
      setIsValidShopUrl([true, true]);
      dispatch(setShoppingUrl(value));
    } else if (httpChk && !comChk) {
      setIsValidShopUrl([true, false]);
      dispatch(setShoppingUrl(null));
    } else if ((!httpChk && !comChk) || (!httpChk && comChk)) {
      setIsValidShopUrl([false, true]);
      dispatch(setShoppingUrl(null));
    }
  };

  const cancelFunc1 = () => {
    cancelProfile(true);
    setTimeout(function () {
      cancelProfile(false);
    }, 500);
  };

  const cancelFunc2 = () => {
    cancelEvent(true);
    setTimeout(function () {
      cancelEvent(false);
    }, 500);
  };

  const clearProfile = e => {
    cancelProfile && (e.target.value = null);
  };

  const clearEvent = e => {
    cancelEvent && (e.target.value = null);
  };

  const handleSponsorBtn = eventTarget => {
    console.log(eventTarget);
    if (eventTarget === "free") {
      setSponsored(false);
    } else {
      setSponsored(true);
    }
  };

  useEffect(() => {
    // 유저이미지 없애기 눌렀을 때
    dispatch(setUserImage(null));
  }, [profileimgcancel]);

  useEffect(() => {
    // 이벤트 이미지 없애기 눌렀을 때
    dispatch(setEventImg(null));
  }, [eventimgcancel]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(setUsername(null));
  //     dispatch(setEventName(null));
  //     dispatch(setEventUrl(null));
  //     dispatch(setShoppingUrl(null));
  //     dispatch(setOriginalPrice(null));
  //     dispatch(setNewPrice(null));
  //     dispatch(setEventCategory(null));
  //     dispatch(setSalesDurationStart(null));
  //     dispatch(setSalesDurationEnd(null));
  //   };
  // }, [dispatch]);

  //모든 데이터가 제대로 입력되었을시 '확인' 버튼 활성화
  useEffect(() => {
    if (
      username &&
      eventname &&
      userImage &&
      eventimg &&
      eventUrl &&
      shoppingUrl &&
      originalPrice &&
      newPrice &&
      durationStart &&
      durationEnd &&
      category &&
      eventUrlChk &&
      shopUrlChk
    ) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [
    username,
    eventname,
    userImage,
    eventimg,
    eventUrl,
    shoppingUrl,
    originalPrice,
    newPrice,
    durationStart,
    durationEnd,
    category,
    eventUrlChk,
    shopUrlChk,
    credit.memb_credit,
    totalCredits
  ]);

  return (
    <>
      <InputBoxWrap>
        <InputContainer>
          <InputTitle> 진행하시는 이벤트 정보를 입력해 주세요.</InputTitle>
          <InputBox>
            <InputContentContainer>
              <ImageuploadWrap>
                <ProfilImageContainer>
                  <p>프로필 이미지</p>
                  <label htmlFor="icon-button-fileO">
                    <ProfileThumbnail
                      userImage={userImage}
                      profileBase64={profileBase64}
                    >
                      {!userImage && (
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className={classes.input}
                          id="icon-button-fileO"
                          onChange={e => {
                            uploadProfileImg(e);
                            clearProfile(e);
                          }}
                        />
                      )}
                      {userImage && (
                        <CancelBtn
                          onClick={() => {
                            dispatch(deleteProfileImg());
                            cancelFunc1();
                          }}
                        />
                      )}
                    </ProfileThumbnail>
                  </label>
                </ProfilImageContainer>
                <EventThumbnailContainer>
                  <p>이벤트 썸네일</p>
                  <label htmlFor="icon-button-fileT">
                    <EventThumbnail
                      eventimg={eventimg}
                      eventBase64={eventBase64}
                    >
                      {!eventimg && (
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className={classes.input}
                          id="icon-button-fileT"
                          onChange={e => {
                            uploadEventImg(e);
                            clearEvent(e);
                          }}
                        />
                      )}
                      {eventimg && (
                        <CancelBtn
                          onClick={() => {
                            dispatch(deleteEventImg());
                            cancelFunc2();
                          }}
                        />
                      )}
                    </EventThumbnail>
                  </label>
                </EventThumbnailContainer>
              </ImageuploadWrap>
              <InputWrap>
                <UsernameInput
                  type="text"
                  placeholder="ID (예: instagram ID)"
                  onChange={e => dispatch(setUsername(e.target.value))}
                  onFocus={() => focused({ ...focus, username: true })}
                  onBlur={() => focused({ ...focus, username: false })}
                  username={focus.username}
                  maxLength="20"
                />
                <SaleseventInput
                  type="text"
                  placeholder="이벤트 이름"
                  onChange={e => dispatch(setEventName(e.target.value))}
                  // onFocus={() => focused({ ...focus, salesevent: true })}
                  onBlur={() => focused({ ...focus, salesevent: false })}
                  salesevent={focus.salesevent}
                />
                <div style={{ position: "relative" }}>
                  <EventUrlInput
                    type="url"
                    placeholder="이벤트 URL(예: Instagram url)"
                    onChange={verifyEventUrl}
                    onFocus={() => focused({ ...focus, eventurl: true })}
                    onBlur={() => focused({ ...focus, eventurl: false })}
                    eventurl={focus.eventurl}
                    // startdate={startdate}
                    isValidEventUrl={eventUrlChk}
                    value={}
                  />
                  {!isValidEventUrl[0] && (
                    <InvalidUrl eventurl={focus.eventurl}>
                      url주소는 http:// 혹은 https://로 시작해야 합니다.
                    </InvalidUrl>
                  )}
                  {!isValidEventUrl[1] && (
                    <InvalidUrl eventurl={focus.eventurl}>
                      url주소는 com 혹은 co.kr로 끝나야 합니다.
                    </InvalidUrl>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <ShoppingUrlInput
                    type="url"
                    placeholder="쇼핑 상품페이지 URL"
                    onChange={verifyShopUrl}
                    onFocus={() => focused({ ...focus, shoppingurl: true })}
                    onBlur={() => focused({ ...focus, shoppingurl: false })}
                    shoppingurl={focus.shoppingurl}
                    // startdate={startdate}
                    isValidShopUrl={shopUrlChk}
                    value={}
                  />
                  {!isValidShopUrl[0] && (
                    <InvalidShopUrl shoppingurl={focus.shoppingurl}>
                      url주소는 http:// 혹은 https://로 시작해야 합니다.
                    </InvalidShopUrl>
                  )}
                  {!isValidShopUrl[1] && (
                    <InvalidShopUrl shoppingurl={focus.shoppingurl}>
                      url주소는 com 혹은 co.kr로 끝나야 합니다.
                    </InvalidShopUrl>
                  )}
                </div>
                <PriceContainer
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <PercentEventInput
                    type="number"
                    placeholder="원 가격"
                    onChange={e => {
                      if (!e.target.value.includes(".")) {
                        return dispatch(setOriginalPrice(e.target.value));
                      }
                      return (e.target.value = "");
                    }}
                    onFocus={() => focused({ ...focus, originalprice: true })}
                    // startdate={startdate}
                  />
                  <PriceEventInput
                    type="number"
                    placeholder="세일 가격"
                    onChange={e => {
                      if (!e.target.value.includes(".")) {
                        return dispatch(setNewPrice(e.target.value));
                      }
                      return (e.target.value = "");
                    }}
                    onFocus={() => focused({ ...focus, newprice: true })}
                    // startdate={startdate}
                  />
                </PriceContainer>
                <form
                  style={{ position: "relative" }}
                  onFocus={() => {
                    setCalenderOpen(true);
                  }}
                  onBlur={() => {
                    setCalenderOpen(false);
                  }}
                >
                  <DurationInput
                    type="text"
                    placeholder="이벤트 기간(mm/dd/yyyy ~ mm/dd/yyyy)"
                    value={
                      durationStart &&
                      durationEnd &&
                      `${format(durationStart, `MMM do EEEEE, yyyy`, {
                        locale: ko
                      })} - ${format(durationEnd, `MMM do EEEEE, yyyy`, {
                        locale: ko
                      })}`
                    }
                    onFocus={() => focused({ ...focus, duration: true })}
                    onBlur={() => focused({ ...focus, duration: false })}
                    duration={focus.duration}
                    // startdate={startdate}
                    readOnly
                  />
                  <DurationCalender
                    as="form"
                    calenderOpen={calenderOpen}
                    eventStartDate={eventStartDate}
                    eventEndDate={eventEndDate}
                    setEventStartDate={setEventStartDate}
                    setEventEndDate={setEventEndDate}
                  />
                </form>
                <div style={{ position: "relative" }}>
                  <CategoryInput
                    as="input"
                    type="select"
                    onChange={e => dispatch(setEventCategory(e.target.value))}
                    onClick={() => {
                      setToggle(!toggle);
                      onCategory(!categoryfocus);
                    }}
                    categoryfocus={categoryfocus}
                    // startdate={startdate}
                    placeholder="이벤트 카테고리를 선택해 주세요."
                    value={CATEGORY[categoryIdx]}
                    readOnly
                  ></CategoryInput>
                  <Arrow toggle={toggle} />
                  <CategoryWrap toggle={toggle}>
                    {CATEGORY.map((el, idx) => {
                      return (
                        <Category
                          key={idx}
                          onClick={() => {
                            setCategory(idx);
                            setToggle(!toggle);
                            onCategory(!categoryfocus);
                            dispatch(setEventCategory(el));
                          }}
                        >
                          {el}
                        </Category>
                      );
                    })}
                  </CategoryWrap>
                </div>
              </InputWrap>
            </InputContentContainer>
          </InputBox>
        </InputContainer>
        <EventTypeWraaper>
          <EventTypeHeader>
            <PreviewTitle>이벤트 미리보기</PreviewTitle>
            <EventTypeContainer>
              <FreeEventBtn
                onClick={() => handleSponsorBtn("free")}
                sponsored={sponsored}
              >
                {sponsored ? <NotClick /> : <Click />}
                무료 등록
              </FreeEventBtn>
              <SponsoredEventBtn
                onClick={() => handleSponsorBtn("spon")}
                sponsored={sponsored}
              >
                {sponsored ? <Click /> : <NotClick />}
                스폰서이벤트 등록
              </SponsoredEventBtn>
            </EventTypeContainer>
          </EventTypeHeader>
          {!sponsored ? (
            <CreateEventFreePreview
              eventimg={eventimg}
              eventBase64={eventBase64}
              eventname={eventname}
              userImage={userImage}
              profileBase64={profileBase64}
              username={username}
              newPrice={newPrice}
              originalPrice={originalPrice}
              durationStart={durationStart}
              durationEnd={durationEnd}
              shoppingUrl={shoppingUrl}
            />
          ) : (
            <CreateEventSponPreview
              eventimg={eventimg}
              eventBase64={eventBase64}
              eventname={eventname}
              userImage={userImage}
              profileBase64={profileBase64}
              username={username}
              newPrice={newPrice}
              originalPrice={originalPrice}
              durationStart={durationStart}
              durationEnd={durationEnd}
              shoppingUrl={shoppingUrl}
            />
          )}
        </EventTypeWraaper>
      </InputBoxWrap>
      <ConfirmBtnWrap>
        <ConfirmBtn
          confirm={confirm}
          onClick={() => {
            handleCreateFreeEvent();
          }}
        >
          확 인
        </ConfirmBtn>
      </ConfirmBtnWrap>
      {isCheckModal && <CheckFreeEventModal />}
      {isLoading && <Loading />}
    </>
  );
}

export default withRouter(CreateEventItem);

const Container = styled.main`
  /* background-color: yellowgreen; */
`;

const InputBoxWrap = styled.div`
  /* border: 1px solid #dee8ff; */
  width: 100%;
  border-radius: 12px;
  height: auto;
  background-color: #f2f6ff;
  /* pointer-events: ${({ startdate }) => (startdate ? "auto" : "none")}; */
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  width: 100%;

  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-right: 0px;
  }
`;

const InputTitle = styled.p`
  font-weight: 500;
  font-size: 21px;
  color: #212121;
  margin-bottom: 30px;
  @media (max-width: 500px) {
    align-self: flex-start;
    margin-left: 20px;
    font-size: 18px;
  }
`;

const InputBox = styled.div`
  width: auto;
  height: auto;
  width: 768px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dee8ff;
  padding: 28px 24px 0;

  background-color: #ffffff;
  border-radius: 24px;
  @media (max-width: 500px) {
    width: 90%;
    margin-right: 0px;
  }
`;

const InputContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
    margin-left: 0px;
  }
`;

const ImageuploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;
  @media (max-width: 500px) {
    flex-direction: row;
  }
  p {
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #757575;
  }
`;

const ProfilImageContainer = styled.div`
  @media (max-width: 500px) {
    margin-right: 30px;
  }
`;

const EventThumbnailContainer = styled.div``;

const ProfileThumbnail = styled.form`
  position: relative;
  width: 104px;
  height: 104px;
  margin-bottom: 32px;
  background-color: #f5f5f5;
  border-radius: 24px;
  background-repeat: no-repeat;
  cursor: pointer;
  background-position: ${({ userImage }) =>
    userImage ? "center" : "left bottom, center"};
  background-image: ${({ userImage, profileBase64 }) =>
    userImage
      ? `url(${profileBase64})`
      : `url("/images/ProfileImage.svg"), url("/images/Upload.svg")`};
  background-size: ${({ userImage }) => (userImage ? "cover" : null)};

  :hover {
    border: 1px solid #bdbdbd;
  }
`;

const EventThumbnail = styled(ProfileThumbnail)`
  position: relative;
  width: 136px;
  height: 136px;
  background-position: ${({ eventimg }) =>
    eventimg ? "center" : "center, center"};
  background-image: ${({ eventimg, eventBase64 }) =>
    eventimg
      ? `url(${eventBase64})`
      : `url("/images/Upload.svg"), url("/images/previewimage.svg")`};
  background-size: ${({ eventimg }) =>
    eventimg ? "cover" : "32px 22px, cover"};
`;

const ProfileUploadBox = styled.input`
  width: 104px;
  height: 104px;
  padding-top: 110px;
  border-radius: 24px;
  background-color: transparent;
  cursor: pointer;
`;

const EventUploadBox = styled(ProfileUploadBox)`
  width: 136px;
  height: 136px;
  padding-top: 136px;
`;

const CancelBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url("/images/imagecancel.svg") center no-repeat;
  background-size: cover;
  z-index: 10;
  :hover {
    filter: invert(100%);
  }
`;

const InputWrap = styled.div`
  width: 100%;
  @media (max-width: 500px) {
    margin-bottom: 30px;
  }
`;

const UsernameInput = styled.input`
  width: 100%;
  display: block;
  padding: 14px 0 16px 13px;
  margin-bottom: 35px;
  border: ${({ username }) =>
    username ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  border-radius: 6px;
  font-size: 16px;
  color: ${({ username }) => (username ? "#424242" : "#757575")};
  -webkit-appearance: none;
  @media (max-width: 500px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const SaleseventInput = styled(UsernameInput)`
  width: 100%;
  border: ${({ salesevent }) =>
    salesevent ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  color: ${({ salesevent }) => (salesevent ? "#424242" : "#757575")};
`;

const EventUrlInput = styled(UsernameInput)`
  border: ${({ eventurl, isValidEventUrl }) =>
    eventurl && isValidEventUrl
      ? "0.5px solid #424242"
      : !eventurl && !isValidEventUrl
      ? "0.5px solid #bdbdbd"
      : eventurl && !isValidEventUrl
      ? "0.5px solid red"
      : null};
  color: ${({ eventurl, isValidEventUrl }) =>
    eventurl && isValidEventUrl ? "#424242" : "#757575"};
`;

const ShoppingUrlInput = styled(UsernameInput)`
  border: ${({ shoppingurl, isValidShopUrl }) =>
    shoppingurl && isValidShopUrl
      ? "0.5px solid #424242"
      : !shoppingurl && !isValidShopUrl
      ? "0.5px solid #bdbdbd"
      : shoppingurl && !isValidShopUrl
      ? "0.5px solid red"
      : null};
  color: ${({ shoppingurl, isValidShopUrl }) =>
    shoppingurl && isValidShopUrl ? "#424242" : "#757575"};
`;

const PercentInput = styled.input`
  display: block;
  width: 45%;
  padding: 14px 0 16px 13px;
  margin-bottom: 35px;
  border: ${({ username }) =>
    username ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  border-radius: 6px;
  color: ${({ username }) => (username ? "#424242" : "#757575")};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -webkit-appearance: none;
`;

const PriceContainer = styled.div`
  @media (max-width: 500px) {
    margin-bottom: -15px;
  }
`;

const PercentEventInput = styled(PercentInput)`
  font-size: 16px;
  color: black;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const PriceInput = styled.input`
  display: block;
  width: 45%;
  padding: 14px 0 16px 13px;
  margin-bottom: 35px;
  border: ${({ username }) =>
    username ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  border-radius: 6px;
  font-size: 16px;
  color: ${({ username }) => (username ? "#424242" : "#757575")};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -webkit-appearance: none;
`;

const PriceEventInput = styled(PriceInput)`
  font-size: 16px;
  color: black;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const DurationInput = styled(UsernameInput)`
  position: relative;
  cursor: pointer;
  border: ${({ duration }) =>
    duration ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  color: ${({ duration }) => (duration ? "#424242" : "#757575")};
`;

const CategoryInput = styled(UsernameInput)`
  position: relative;
  font-size: 16px;
  line-height: 130%;
  color: #757575;
  border: ${({ categoryfocus }) =>
    categoryfocus ? "0.5px solid #424242" : "0.5px solid #bdbdbd"};
  color: ${({ categoryfocus }) => (categoryfocus ? "#424242" : "#757575")};
  cursor: pointer;
`;

const Arrow = styled.span`
  position: absolute;
  display: inline-block;
  top: 25px;
  right: 18px;
  width: 12px;
  height: 6px;
  background: ${({ toggle }) =>
    toggle
      ? `url("/images/categoryarrowup.svg") center no-repeat`
      : `url("/images/categoryarrowdown.svg") center no-repeat`};
  background-size: contain;
  z-index: 2;
`;

const CategoryWrap = styled.div`
  position: absolute;
  z-index: 11;
  width: 100%;
  top: 52px;
  left: 0;
  display: ${({ toggle }) => (toggle ? "block" : "none")};
`;

const Category = styled.div`
  padding: 10px 0 13px 13px;
  background-color: #ffffff;
  border-left: 0.5px solid #bdbdbd;
  border-right: 0.5px solid #bdbdbd;
  :hover {
    cursor: pointer;
  }
  :last-child {
    border-bottom: 0.5px solid #bdbdbd;
    border-radius: 0 0 6px 6px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const InvalidUrl = styled.p`
  display: ${({ eventurl }) => (eventurl ? "block" : "none")};
  position: absolute;
  top: 50px;
  left: 10px;
  color: red;
  font-size: 10px;
`;

const InvalidShopUrl = styled.p`
  display: ${({ shoppingurl }) => (shoppingurl ? "block" : "none")};
  position: absolute;
  top: 50px;
  left: 10px;
  color: red;
  font-size: 10px;
`;

const EventTypeWraaper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    margin-top: 80px;
    justify-content: center;
    align-items: center;
  }
`;

const EventTypeHeader = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const PreviewTitle = styled.span`
  font-weight: 500;
  font-size: 21px;
  color: #212121;
  white-space: nowrap;
  margin-bottom: 30px;
  @media (max-width: 500px) {
    font-size: 18px;
    align-self: flex-start;
    margin-left: 10px;
  }
`;

const EventTypeContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const FreeEventBtn = styled.button`
  width: 240px;
  height: 96px;
  background-color: ${({ sponsored }) => (sponsored ? `#F2F6FF` : `#FFFFFF`)};
  border: 1px solid #dee8ff;
  border-radius: 12px;
  margin-right: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    width: 90%;
    height: 72px;
    margin-right: 0px;
    margin-bottom: 20px;
    justify-content: flex-start;
    padding-left: 15px;
  }
`;

const SponsoredEventBtn = styled.button`
  width: 240px;
  height: 96px;
  background-color: ${({ sponsored }) => (sponsored ? `#FFFFFF` : `#F2F6FF`)};
  border: 1px solid #dee8ff;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    width: 90%;
    margin-right: 0px;
    height: 72px;
    justify-content: flex-start;
    padding-left: 15px;
  }
`;

const Click = styled.p`
  background: url("/images/ClickIcon.svg") center no-repeat;
  width: 22px;
  height: 22px;
  margin-right: 15px;
`;

const NotClick = styled.p`
  background: url("/images/NotClickIcon.svg") center no-repeat;
  width: 22px;
  height: 22px;
  margin-right: 15px;
`;

const ConfirmBtnWrap = styled.div`
  background: #f2f6ff;
  ${({ theme }) => theme.flex("flex-start", "center", "row-reverse")};
  width: 100%;
  @media (max-width: 500px) {
    justify-content: center;
    margin-bottom: 30px;
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
    width: 150px;
  }
`;
