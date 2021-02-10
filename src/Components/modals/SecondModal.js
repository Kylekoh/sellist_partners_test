import React, { useContext } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { NewUserContext } from "../../Context/newUserContext";
import TourModalCloseWhite from "../../Images/TourModalCloseWhite";
import TourModalCloseBlue from "../../Images/TourModalCloseBlue";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";
import { useMediaQuery } from "react-responsive";

function SecondModal() {
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
    dispatch(addNext(3));
  };
  return (
    <Fade right big>
      <ModalContainer>
        <HeaderContainer>
          <WelcomeContainer>
            <span style={{ fontWeight: 700 }}>1</span>
            <span>/3</span> <br />
            <span style={{ fontWeight: 700 }}>공구이벤트 정보 입력</span>
          </WelcomeContainer>
        </HeaderContainer>
        <InfoContainer>
          공구이벤트 정보를 입력해 주세요 <br />
          이벤트 컨텐츠, 이벤트이름, 기간, 샵링크 등
        </InfoContainer>
        <ImageContainer>
          <TourImage src="/images/TourModalSecond.png" alt="Pricing Cards" />
        </ImageContainer>
        <PageContainer>
          <img src="/images/secondPage.svg" alt="second" />
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

export default SecondModal;

const ModalContainer = styled.div`
  position: relative;
  height: 500px;
  width: 832px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  ${({ theme }) => theme.flex("center", "center", "column")}

  @media (max-width: 500px) {
    width: 350px;
  }
`;

const HeaderContainer = styled.div`
  margin-top: 20px;
  width: 800px;
  height: 135px;
  left: 16px;
  top: 16px;
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
`;

const InfoContainer = styled.div`
  width: 448px;
  height: 64px;
  left: 192px;
  top: 150px;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  @media (max-width: 500px) {
    width: 310px;
  }
`;

const ImageContainer = styled.div`
  margin-top: 30px;
  height: 67px;
  width: 370px;
  ${({ theme }) => theme.flex("center", "center", "")}
  @media (max-width: 500px) {
    width: 310px;
  }
`;

const TourImage = styled.img`
  width: 320px;
  margin-top: 30px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 270px;
  }
`;

const PageContainer = styled.div`
  margin-top: 50px;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
  width: 156px;
  height: 36px;
  background: #212121;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
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
