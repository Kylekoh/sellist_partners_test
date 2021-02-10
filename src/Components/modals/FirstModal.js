import React, { useContext } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { NewUserContext } from "../../Context/newUserContext";
import TourModalCloseWhite from "../../Images/TourModalCloseWhite";
import TourModalCloseBlue from "../../Images/TourModalCloseBlue";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";
import { useMediaQuery } from "react-responsive";

function FirstModal() {
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
    dispatch(addNext(2));
  };

  return (
    <Fade bottom big>
      <ModalContainer>
        <HeaderContainer>
          <WelcomeContainer>
            <span style={{ fontWeight: 700 }}>환영합니다!</span>
            <br />
            모두의셀러 파트너스
          </WelcomeContainer>
        </HeaderContainer>
        <InfoContainer>
          여러분의 공구이벤트를 더 많은 분들에게 홍보해 보세요! <br />
          모두의셀러에 여러분의 공구이벤트를 포스팅하여 SNS 쇼핑을 즐기시는 많은
          소비자분들께 소개하실 수 있습니다.
          <br />
          공구이벤트를 보다 효과적으로 홍보하시려면 스폰서이벤트 등록을 통해
          모두의셀러 상단에 노출하실 수도 있습니다.
          <br />
          지금 시작해보세요!
        </InfoContainer>

        <ImageContainer>
          <img src="/images/TourModalFirst.svg" alt="first" />
        </ImageContainer>
        <ButtonContainer onClick={handleNext}>
          <button>다음</button>
        </ButtonContainer>
        <CloseBtnContainer onClick={handleCloseBtn}>
          <TourModalCloseWhite />
        </CloseBtnContainer>
      </ModalContainer>
    </Fade>
  );
}

export default FirstModal;

const ModalContainer = styled.div`
  position: relative;
  height: 500px;
  width: 832px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  ${({ theme }) => theme.flex("center", "center", "column")};
  @media (max-width: 500px) {
    width: 350px;
  }
`;

const HeaderContainer = styled.div`
  margin-top: -30px;
  width: 800px;
  height: 135px;
  left: 16px;
  top: 16px;
  background: linear-gradient(180deg, #3c66ba 0%, #6e9dfd 148.15%);
  border-radius: 20px 20px 0px 0px;
  ${({ theme }) => theme.flex("center", "center", "column")}

  @media (max-width: 500px) {
    width: 325px;
  }
`;

const WelcomeContainer = styled.div`
  margin-bottom: 23px;
  text-align: center;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 500px) {
    margin-bottom: 15px;
    font-size: 25px;
  }
`;

const InfoContainer = styled.div`
  margin: 30px 0px 70px 0px;
  width: 88%;
  height: 127px;
  font-size: 16px;
  text-align: center;
  line-height: 30px;

  @media (max-width: 500px) {
    font-size: 13px;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
