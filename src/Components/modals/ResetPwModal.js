import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import CheckEmailModal from "./CheckEmailModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 302,
    height: 145,
  },
};

function ResetPwModal() {
  const [modalIsOpen, SetModalIsOpen] = useState(false);
  const [CheckEmailIsOpen, SetCheckEmailIsOpen] = useState(false);

  const closeHandler = () => {
    SetCheckEmailIsOpen(false);
    SetModalIsOpen(false);
  };

  return (
    <PwModalWrapper>
      <ForgetPw onClick={() => SetModalIsOpen(true)}>
        비밀번호를 잊으셨나요?
      </ForgetPw>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Text>비밀번호를 재설정 하시겠습니까?</Text>
        <Check onClick={() => SetCheckEmailIsOpen(true)}>확인</Check>
        <Cancel onClick={() => SetModalIsOpen(false)}>취소</Cancel>
        <CheckEmailModal
          CheckEmail={CheckEmailIsOpen}
          closeHandler={closeHandler}
        />
      </Modal>
    </PwModalWrapper>
  );
}

export default ResetPwModal;

const PwModalWrapper = styled.div``;

const Text = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const Check = styled.div`
  font-weight: bold;
  display: inline-block;
  float: right;
  margin-right: 30px;
  margin-top: 40px;
  cursor: pointer;
`;

const Cancel = styled.div`
  font-weight: bold;
  display: inline-block;
  float: right;
  margin-right: 70px;
  margin-top: 40px;
  cursor: pointer;
`;

const ForgetPw = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;
