import React, { useContext } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { NewUserContext } from "../../Context/newUserContext";
import { center } from "../../Config/commonStyles";
import TourModalCloseWhite from "../../Images/TourModalCloseWhite";
import TourModalCloseBlue from "../../Images/TourModalCloseBlue";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";
import { useMediaQuery } from "react-responsive";

function ThirdModal() {
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
    dispatch(addNext(4));
  };
  return (
    <Fade right big>
      <ModalContainer>
        <HeaderContainer>
          <WelcomeContainer>
            <span style={{ fontWeight: 700 }}>2</span>
            <span>/3</span> <br />
            <span style={{ fontWeight: 700 }}>홍보 종류 선택</span> <br />
            <span style={{ fontWeight: 700 }}>(무료 / 스폰서이벤트)</span>
          </WelcomeContainer>
        </HeaderContainer>
        <InfoContainer>
          무료 혹은 스폰서이벤트(포인트 필요) 등록을 선택합니다. <br />
          무료 등록: 이벤트 정보만 입력하시면 됩니다.
          <br />
          스폰서이벤트: 포인트를 사용하셔서 홍보기간을 <br /> 선택하시게 되고,
          그 기간동안 해당 이벤트는 상단에 고정노출되어 <br />
          더욱 효과적인 홍보가 가능해 집니다.
        </InfoContainer>
        <ImageContainer>
          <TourImage src="/images/TourModalThird.png" alt="calendar" />
        </ImageContainer>
        <PageContainer>
          <img src="/images/thirdPage.svg" alt="thrid" />
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

export default ThirdModal;

const ModalContainer = styled.div`
  position: relative;
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
  margin-top: 30px;
  width: 800px;
  border-radius: 20px 20px 0px 0px;
  ${({ theme }) => theme.flex("center", "center", "column")}
  @media (max-width: 500px) {
    margin-top: 20px;
  }
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
  line-height: 130%;
  margin-bottom: 80px;
  @media (max-width: 500px) {
    width: 310px;
    font-size: 14px;
    margin-top: 40px;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center", "")}
`;

const TourImage = styled.img`
  width: 300px;
  @media (max-width: 500px) {
    width: 270px;
  }
`;

const PageContainer = styled.div`
  margin-top: 30px;
  @media (max-width: 500px) {
    margin-top: 10px;
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
