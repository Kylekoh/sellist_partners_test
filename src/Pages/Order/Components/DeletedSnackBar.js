import React from "react";
import styled from "styled-components";

function DeletedSnackBar() {
  return (
    <ModalContainer>
      <Content>
        해당 이벤트가 성공적으로 삭제 되었습니다. 포인트를 돌려 드렸습니다.
      </Content>
    </ModalContainer>
  );
}

export default DeletedSnackBar;

const ModalContainer = styled.div`
  position: absolute;
  width: 328px;
  height: 66px;
  right: 30px;
  bottom: 30px;
  background: #757575;
  padding: 16px 15px;
  box-shadow: 0px 6px 10px rgba(66, 66, 66, 0.14),
    0px 1px 18px rgba(66, 66, 66, 0.12), 0px 3px 5px rgba(66, 66, 66, 0.2);
  border-radius: 10px;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 130%;
  color: #f5f5f5;
`;
