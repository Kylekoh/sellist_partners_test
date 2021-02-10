import React, { useContext } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { NewUserContext } from "../../Context/newUserContext";
import TourModalCloseWhite from "../../Images/TourModalCloseWhite";
import TourModalCloseBlue from "../../Images/TourModalCloseBlue";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";
import { useMediaQuery } from "react-responsive";

function FourthModal() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });
  const { isNewUser, setIsNewUser } = useContext(NewUserContext);
  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    dispatch(setTooltipToggle(false));
    dispatch(addNext(1));
    setIsNewUser(false);
  };

  const handleNext = () => {
    dispatch(addNext(5));
  };

  return (
    <Fade right big>
      <ModalContainer>
        <HeaderContainer>
          <WelcomeContainer>
            <span style={{ fontWeight: 700 }}>3</span>
            <span>/3</span> <br />
            <span style={{ fontWeight: 700 }}>이벤트 정보</span>
          </WelcomeContainer>
        </HeaderContainer>
        <InfoContainer>
          스폰서이벤트 등록을 위해서는 포인트가 필요합니다.
          <br />
          포인트는 충전하셔서 사용하실 수 있습니다.
        </InfoContainer>
        <ImageContainer>
          <TourImage src="/images/TourModalFourth.svg" alt="Assets" />
        </ImageContainer>
        <PageContainer>
          <img src="/images/fourthPage.svg" alt="fourth" />
        </PageContainer>
        <ButtonContainer onClick={handleNext}>
          <button>다음</button>
        </ButtonContainer>
        <CloseBtnContainer onClick={handleCloseBtn}>
          {!isMobile ? <TourModalCloseWhite /> : <TourModalCloseBlue />}
        </CloseBtnContainer>
      </ModalContainer>
    </Fade>
  );
}

export default FourthModal;

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
  line-height: 35px;
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
  text-align: center;
  line-height: 20px;
  @media (max-width: 500px) {
    width: 310px;
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center", "")}
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TourImage = styled.img`
  width: 310px;
  @media (max-width: 500px) {
    width: 260px;
  }
`;

const PageContainer = styled.div`
  margin-bottom: 60px;
  @media (max-width: 500px) {
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
