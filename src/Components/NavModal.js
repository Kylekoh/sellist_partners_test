import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSponsorEndDate } from "../modules/SponsorEndDateModule";

function NavModal({ open, setOpen }) {
  const dispatch = useDispatch();

  const handleToggle = e => {
    setOpen(!open);
  };

  const handlePage = () => {
    setOpen(!open);
    dispatch(setSponsorEndDate(null));
  };

  return (
    <Wrapper>
      <ModalContainer>
        <SubContainer>
          <NotifyContainer>
            Are you sure you want to leave the page? Any information you have
            entered will not be saved.
          </NotifyContainer>
          <SelectContainer>
            <NoContainer onClick={handleToggle}>No</NoContainer>
            <YesContainer onClick={handlePage}>Yes</YesContainer>
          </SelectContainer>
        </SubContainer>
      </ModalContainer>
    </Wrapper>
  );
}

export default NavModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
