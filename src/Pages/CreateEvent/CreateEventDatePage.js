// 기본
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Prompt } from "react-router-dom";
//라이브러리
import { format } from "date-fns";
import styled from "styled-components";
import axios from "axios";
// 컴포넌트
import WarningDialog from "../../Components/modals/WarningDialog";
import CreateEventItem from "./CreateEventItem/CreateEventItem";
import CreateEventDate from "./CreateEventDate/CreateEventDate";
import { openModal } from "../../modules/CheckModalModule";
import TooltipModal from "../../Components/modals/TootipModal";
import DeleteParentModal from "../Order/Components/DeleteParentModal";
import DeletedSnackBar from "../Order/Components/DeletedSnackBar";

import { setTooltipToggle } from "../../modules/TooltipModule";

function CreateEventDatePage({ history }) {
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  const isNewUser = localStorage.getItem("new_user") === "1"; // 최초접속이면 true 아니면 false

  const tooltipToggle = useSelector(store => store.toggleReducer); // 최초접속이면 true 아니면 false
  const del = useSelector(store => store.deleteReducer);
  const deleted = useSelector(store => store.confirmDeleteReducer);
  const pointCheck = useSelector(store => store.checkPointReducer);

  const sponsorStartDate = useSelector(store => store.sponsorStartDateReducer);
  const sponsorEndDate = useSelector(store => store.sponsorEndDateReducer);
  //무엇인가를 한번이라도 수정하고 페이지를 나가려고 하면 그때 띄울 것이다. when에 넣어줄 boolean 값
  const [shouldConfirm, setShouldConfirm] = useState(false);
  //isLeave값은 모달에서 나가기 버튼을 클릭했을 때 true로 변경
  const [isLeave, setIsLeave] = useState(false);
  const [lastLocation, setLastLocation] = useState();
  const [newUser, setNewUser] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const showModal = location => {
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
  };

  //message에 들어갈 함수값.isLeave값이 false고 shouldConfirm이 true면? return false(페이지 이동을 막는다)
  const handlePrompt = nextLocation => {
    if (!isLeave && shouldConfirm) {
      showModal(nextLocation);
      return false;
    }
    return true;
  };

  /* 최초 로그인이 아닐 경우, 조건에 만족하지 않아 tour pop-up 실행되지 않는다.
하지만 아래 함수가 실행되면 pop-up이 뜨는 조건으로 변경된다. */
  const handleTooltip = async () => {
    dispatch(setTooltipToggle(true));
  };

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
    if (sponsorStartDate && !shouldConfirm) {
      setShouldConfirm(true);
    }
  }, [sponsorStartDate, shouldConfirm]);

  if (!email && !accessToken) {
    window.location.href = "/";
  } else {
    return (
      <Container>
        {isNewUser || tooltipToggle ? <TooltipModal /> : ""}
        {del && <DeleteParentModal />}
        {deleted && <DeletedSnackBar />}
        <SubContainer>
          <SubContainerHeader>
            <Title>이벤트 홍보 기간을 설정해 주세요</Title>
            <ImageContainer>
              <img onClick={handleTooltip} src="/images/Info.svg" alt="Info" />
            </ImageContainer>
          </SubContainerHeader>
          <CreateEventDate />
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
    );
  }
}
export default CreateEventDatePage;

const Container = styled.main`
  max-width: 1400px;
  display: flex;
  margin-left: 30px;
  @media (max-width: 500px) {
    margin-left: 0px;
  }
`;

const SubContainer = styled.div`
  width: 100vw;
  margin: 40px 0px 0px 10px;
  /* margin: 1.5% 4% 0 30px; */
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 500px) {
    margin: 80px 0px 0px 0px;
  }
`;

const SubContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 200px;
  /* padding-right: 20px; */
  align-items: center;
  padding: 12px 6px 12px 6px;
  @media (max-width: 500px) {
    margin-bottom: 20px;
    padding-right: 0px;
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 34px;
  color: #96a9cf;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 10px;

  @media (max-width: 500px) {
    margin-bottom: 0px;
  }
  img {
    cursor: pointer;
    padding-right: 9px;
    margin-top: -11px;
    @media (max-width: 500px) {
      margin-top: 0px;
    }
  }
`;
