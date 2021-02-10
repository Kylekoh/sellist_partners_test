import React, { useState } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSponsorEndDate } from "../../../../modules/SponsorEndDateModule";

// 이 컴포넌트는 포인트이 부족할때 포인트구매 버튼을 위한 모달입니다.

function UnsavedModal() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleToggle = e => {
    setOpen(!open);
  };

  // addEndData(Null)가 있는 이유는 유저가 종료날짜를 정했을경우에 다른 페이지로 이동을하려할떄 모달을 띄우는데,
  // 그이후에 모달에서 유저가 YES를 눌렀을때 종료날짜값을 NULL줘서 페이지를 넘어간 이후에도 다른페이지에서 또 다른페이지로 옮길때
  // 모달이 생기는걸 방지하기위해서 했습니다.

  const handlePage = () => {
    setOpen(!open);
    dispatch(setSponsorEndDate(null));
    history.push("/creditsPage");
  };

  return (
    <Wrapper>
      <Fade>
        <ModalContainer>
          <SubContainer>
            <NotifyContainer>
              정말로 이 페이지에서 나가시겠습니까? 입력하신 모든 정보가 다
              사라집니다.
            </NotifyContainer>
            <SelectContainer>
              <NoContainer onClick={handleToggle}>아니요</NoContainer>
              <YesContainer onClick={handlePage}>네</YesContainer>
            </SelectContainer>
          </SubContainer>
        </ModalContainer>
      </Fade>
    </Wrapper>
  );
}

export default UnsavedModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.65);
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const ModalContainer = styled.div`
  height: 145px;
  width: 302px;
  left: 29px;
  top: 0px;
  border-radius: 4px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  ${({ theme }) => theme.flex("center", "center", "null")}
`;

const SubContainer = styled.div``;

const NotifyContainer = styled.div`
  height: 63px;
  width: 246px;
  left: 57px;
  top: 16px;
`;

const SelectContainer = styled.div`
  ${({ theme }) => theme.flex("flex-end", "null", "null")}
`;

const NoContainer = styled.div`
  width: 70px;
  height: 36px;
  margin-right: 16px;
  ${({ theme }) => theme.flex("center", "center", "null")}
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const YesContainer = styled.div`
  width: 70px;
  height: 36px;
  ${({ theme }) => theme.flex("center", "center", "null")}
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
