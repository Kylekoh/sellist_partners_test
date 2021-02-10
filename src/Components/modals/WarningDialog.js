import React from "react";

import styled from "styled-components";

function WarningDialog({
  contentText,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
  open
}) {
  return (
    <>
      {open && (
        <Wrapper>
          <ModalContainer>
            <SubContainer>
              <NotifyContainer>{contentText}</NotifyContainer>
              <SelectContainer>
                <CancelButtonText onClick={onCancel}>
                  {cancelButtonText}
                </CancelButtonText>
                <YesContainer onClick={onConfirm}>
                  {confirmButtonText}
                </YesContainer>
              </SelectContainer>
            </SubContainer>
          </ModalContainer>
        </Wrapper>
      )}
    </>
  );
}

export default WarningDialog;

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
  width: 240px;
  font-weight: 300;
  white-space: initial;
`;

const SelectContainer = styled.div`
  ${({ theme }) => theme.flex("flex-end", "null", "null")}
`;

const CancelButtonText = styled.div`
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
