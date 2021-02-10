import React, { useContext } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";
import { NewUserContext } from "../../Context/newUserContext";
import TourModalCloseWhite from "../../Images/TourModalCloseWhite";
import TourModalCloseBlue from "../../Images/TourModalCloseBlue";
import { useMediaQuery } from "react-responsive";

// 이 컴포터넌트는 팝업창을 종료시키는 컴포넌트입니다. setTooltipToggle false가 되므로 팝업창이 꺼지고
// 또, addNext(1) 은 모달을 종료 이후에 모달창의 첫번째 화면으로 넘어가게 해두었습니다.

function FifthModal() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });
  const { isNewUser, setIsNewUser } = useContext(NewUserContext);
  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    dispatch(setTooltipToggle(false));
    dispatch(addNext(1));
  };

  const handleToggle = () => {
    dispatch(setTooltipToggle(false));
    dispatch(addNext(1));
    setIsNewUser(false);
    localStorage.setItem("new_user", 0);
  };

  return (
    <Fade right big>
      <ModalContainer>
        <HeaderContainer>
          <WelcomeContainer>
            <span style={{ fontWeight: 700 }}>지금 시작해 보세요!!</span>
            <br />
          </WelcomeContainer>
        </HeaderContainer>
        <InfoContainer>
          여러분의 이벤트를 모두의셀러에 포스팅하고 <br />더 많은 소비자들에게
          홍보해 보세요!
        </InfoContainer>
        <ImageContainer>
          <TourImage src="/images/TourModalFifth.png" alt="ALL DONE" />
        </ImageContainer>
        <PageContainer>
          <img src="/images/fivePage.svg" alt="fifth" />
        </PageContainer>
        <ButtonContainer onClick={handleToggle}>
          <button>시작하기</button>
        </ButtonContainer>
        <CloseBtnContainer onClick={handleCloseBtn}>
          {!isMobile ? <TourModalCloseWhite /> : <TourModalCloseBlue />}
        </CloseBtnContainer>
      </ModalContainer>
    </Fade>
  );
}

export default FifthModal;

const ModalContainer = styled.div`
  position: relative;
  z-index: 11;
  height: 500px;
  width: 832px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  ${({ theme }) => theme.flex("flex-start", "center", "column")}
  @media (max-width: 500px) {
    width: 350px;
  }
`;

const HeaderContainer = styled.div`
  width: 800px;
  height: 135px;
  border-radius: 20px 20px 0px 0px;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const WelcomeContainer = styled.div`
  margin-bottom: 23px;
  text-align: center;
  font-size: 30px;
  text-align: center;
  color: #3c66ba;
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const InfoContainer = styled.div`
  width: 448px;
  height: 64px;
  font-size: 16px;
  line-height: 20px;
  /* margin-bottom: 20px; */
  text-align: center;
  line-height: 130%;
  @media (max-width: 500px) {
    width: 310px;
    font-size: 14px;
  }
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center", "")}
  margin-bottom: 25px;
`;

const TourImage = styled.img`
  width: 220px;
  @media (max-width: 500px) {
    width: 180px;
  }
`;

const PageContainer = styled.div`
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: 156px;
  height: 36px;
  background: #212121;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  border-radius: 4px;
  cursor: pointer;
  button {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0.08em;
    color: #ffffff;
    cursor: pointer;
  }
`;

const CloseBtnContainer = styled.div`
  position: absolute;
  right: -10px;
  top: -50px;
  @media (max-width: 500px) {
    top: 17px;
    right: 17px;
  }
`;
