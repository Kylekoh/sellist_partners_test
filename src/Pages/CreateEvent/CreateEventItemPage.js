import React, { useState, useEffect, useContext } from "react";
import { Prompt, withRouter } from "react-router-dom";
import WarningDialog from "../../Components/modals/WarningDialog";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CreateEventItem from "./CreateEventItem/CreateEventItem";
import CreateEventDate from "./CreateEventDate/CreateEventDate";
import TooltipModal from "../../Components/modals/TootipModal";
import DeleteParentModal from "../Order/Components/DeleteParentModal";
import DeletedSnackBar from "../Order/Components/DeletedSnackBar";
import { useMediaQuery } from "react-responsive";

import { setTooltipToggle } from "../../modules/TooltipModule";
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
} from "../../modules/UserInputModule";
import { NewUserContext } from "../../Context/newUserContext";
import Loading from "../../Components/Loading";

function CreateEventItemPage({ history, ...props }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });

  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  // const isNewUser = localStorage.getItem("new_user") === "1";

  const tooltipToggle = useSelector(store => store.toggleReducer);
  const del = useSelector(store => store.deleteReducer);
  const deleted = useSelector(store => store.confirmDeleteReducer);

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

  const pointCheck = useSelector(store => store.checkPointReducer);
  //무엇인가를 한번이라도 수정하고 페이지를 나가려고 하면 그때 띄울 것이다. when에 넣어줄 boolean 값
  const [shouldConfirm, setShouldConfirm] = useState(false);
  //isLeave값은 모달에서 나가기 버튼을 클릭했을 때 true로 변경
  const [isLeave, setIsLeave] = useState(false);
  const [lastLocation, setLastLocation] = useState();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { isNewUser, setIsNewUser } = useContext(NewUserContext);

  const dispatch = useDispatch();

  const showModal = location => {
    // if (location.pathname === "/CreateEvent/CreateDate") {
    //   console.log("1111");
    //   setShowConfirmModal(false);
    //   setLastLocation(location);
    // } else {
    //   console.log("222");
    //   setShowConfirmModal(true);
    //   setLastLocation(location);
    // }
    setShowConfirmModal(true);
    setLastLocation(location);
  };

  //아니요 눌렀을 때 발생하는 함수
  const closeModal = () => {
    setShowConfirmModal(false);
  };

  //네 눌렀을 때 발생하는 함수, 모달창없어지면서 현재 창을 떠난다!
  const handleConfirmNavigationClick = () => {
    setShowConfirmModal(false);
    setIsLeave(true);

    // 밖으로가기 버튼을 눌렀을시 입력된 모든 정보를 리셋한다.
    dispatch(setUserImage(null));
    dispatch(setEventImg(null));
    dispatch(setUsername(null));
    dispatch(setEventName(null));
    dispatch(setEventUrl(null));
    dispatch(setShoppingUrl(null));
    dispatch(setOriginalPrice(null));
    dispatch(setNewPrice(null));
    dispatch(setEventCategory(null));
    dispatch(setSalesDurationStart(null));
    dispatch(setSalesDurationEnd(null));
  };

  //message에 들어갈 함수값.isLeave값이 false고 shouldConfirm이 true면? return false(페이지 이동을 막는다)
  const handlePrompt = nextLocation => {
    if (nextLocation.pathname === "/CreateEvent/CreateDate") {
      return true;
    }
    if (!isLeave && shouldConfirm) {
      showModal(nextLocation);
      return false;
    }
    return true;

    // if ((nextLocation.pathname = "/CreateEvent/CreateDate")) {
    //   return true;
    // } else if (!isLeave && shouldConfirm) {
    //   showModal(nextLocation);
    //   return false;
    // } else {
    //   return true;
    // }
  };

  /* 최초 로그인이 아닐 경우, 조건에 만족하지 않아 tour pop-up 실행되지 않는다.
하지만 아래 함수가 실행되면 pop-up이 뜨는 조건으로 변경된다. */
  const handleTooltip = async () => {
    // localStorage.setItem("new_user", 1);
    dispatch(setTooltipToggle(true));
  };

  useEffect(() => {
    console.log("이즈 뉴유저 크리에이트아이템", isNewUser);
  }, [isNewUser]);

  useEffect(() => {
    const item = localStorage.getItem("new_user");
    console.log(item);
    if (item === "1") {
      setIsNewUser(true);
      console.log("새로운 유저다!!!");
    } else {
      setIsNewUser(false);
      console.log("새로운 유저가 아니다!!!");
    }

    // 처음들어왔을때 모든 입력데이터를 초기화한다
    dispatch(setUserImage(null));
    dispatch(setEventImg(null));
    dispatch(setUsername(null));
    dispatch(setEventName(null));
    dispatch(setEventUrl(null));
    dispatch(setShoppingUrl(null));
    dispatch(setOriginalPrice(null));
    dispatch(setNewPrice(null));
    dispatch(setEventCategory(null));
    dispatch(setSalesDurationStart(null));
    dispatch(setSalesDurationEnd(null));
  }, []);

  // useEffect(() => {
  //   function checkIsNewUser() {
  //     const item = localStorage.getItem("new_user");
  //     if (item === 1) {
  //       setIsNewUser(true);
  //       console.log("이즈뉴유저", isNewUser);
  //     } else {
  //       setIsNewUser(false);
  //       console.log("이즈뉴유저", isNewUser);
  //     }
  //     console.log("로컬스토리지", item);
  //   }

  //   window.addEventListener("storage", checkIsNewUser);
  //   return () => {
  //     window.removeEventListener("storage", checkIsNewUser);
  //   };
  // }, []);

  //isLeave값이 변경되면 useEffect가 실행되고 true일 때 아까 담아둔 lastLocation값으로 histoty.push해준다
  useEffect(() => {
    if (pointCheck) {
      window.location.href = "/CreditsPage";
    }
    if (isLeave && lastLocation) {
      return history.push(lastLocation);
    }
  }, [history, isLeave, lastLocation, pointCheck]);

  useEffect(() => {
    // 이벤트 항목 중에 1개라도 입력되었을시 shouldConfirm을 true로 바꾼다
    // 유저가 입력하다가 다른 페이지로 이동했을때
    // 경고창을 띄우기 위함
    if (
      (username ||
        userImage ||
        eventimg ||
        eventname ||
        // eventUrl ||
        // shoppingUrl ||
        originalPrice ||
        newPrice ||
        durationStart ||
        durationEnd ||
        category) &&
      !shouldConfirm
    ) {
      setShouldConfirm(true);
    }
  }, [
    username,
    userImage,
    eventimg,
    eventname,
    shoppingUrl,
    originalPrice,
    newPrice,
    durationStart,
    durationEnd,
    category,
    shouldConfirm
  ]);

  if (!email && !accessToken) {
    window.location.href = "/";
  } else {
    return (
      <>
        <Container>
          {isNewUser || tooltipToggle ? <TooltipModal /> : ""}
          {del && <DeleteParentModal />}
          {deleted && <DeletedSnackBar />}
          <SubContainer>
            <SubContainerHeader>
              <Title>이벤트 정보를 입력해 주세요</Title>
              <ImageContainer>
                <img
                  onClick={handleTooltip}
                  src="/images/Info.svg"
                  alt="Info"
                />
              </ImageContainer>
            </SubContainerHeader>
            <CreateEventItem />
          </SubContainer>
          <Prompt when={shouldConfirm} message={handlePrompt} />
          <WarningDialog
            open={showConfirmModal}
            contentText=" 입력하신 정보는 저장되지 않습니다.
          정말로 나가시겠습니까?"
            cancelButtonText="아니요"
            confirmButtonText="네"
            onCancel={closeModal}
            onConfirm={handleConfirmNavigationClick}
          />
        </Container>
      </>
    );
  }
}
export default CreateEventItemPage;

const Container = styled.main`
  max-width: 1400px;
  display: flex;
  padding: 24px;

  @media (max-width: 500px) {
    margin-top: 80px;
    padding: 0px;
  }
`;

const SubContainer = styled.div`
  width: 100vw;
  margin: 1.5% 4% 0 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: gray; */
  @media (max-width: 500px) {
    margin: 0px;
  }
`;

const SubContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 50px;
  padding-right: 20px;
  @media (max-width: 500px) {
    padding-right: 30px;
    margin-left: 20px;
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 34px;
  color: #96a9cf;
  white-space: nowrap;
  margin-bottom: 9px;
  padding-right: 0px;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 10px;
  align-self: flex-end;
  justify-content: flex-end;

  @media (max-width: 500px) {
  }

  img {
    cursor: pointer;
    padding-right: 9px;
    margin-top: -11px;
    @media (max-width: 500px) {
      font-size: 28px;
    }
  }
`;
