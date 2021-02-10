import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

function ButtonModal({ open, setOpen, postPassword }) {
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleChange = () => {
    postPassword();
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };
  return (
    <Wrapper>
      <Fade>
        <ModalContainer>
          <SubContainer>
            <NotifyContainer>
              정말로 비밀번호를 변경하시겠습니까? 변경하시면, 다시 로그인 해야
              됩니다.
            </NotifyContainer>
            <SelectContainer>
              <NoContainer onClick={handleToggle}>아니요</NoContainer>
              <YesContainer onClick={handleChange}>네</YesContainer>
            </SelectContainer>
          </SubContainer>
        </ModalContainer>
      </Fade>
    </Wrapper>
  );
}

export default ButtonModal;

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
