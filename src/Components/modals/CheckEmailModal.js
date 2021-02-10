import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 302,
    height: 145
  }
};

function CheckEmailModal({ CheckEmail, closeHandler }) {
  return (
    <PwModalWrapper>
      <Modal isOpen={CheckEmail} style={customStyles}>
        <Text>비밀번호 재설정을 위하여 이메일을 확인해 주세요.</Text>
        <Button onClick={() => closeHandler()}>확인</Button>
      </Modal>
    </PwModalWrapper>
  );
}

export default CheckEmailModal;

const PwModalWrapper = styled.div``;

const Text = styled.div`
  font-size: 18px;
`;

const Button = styled.div`
  font-weight: bold;
  display: inline-block;
  float: right;
  margin-right: 33px;
  margin-top: 39px;
  cursor: pointer;
`;
