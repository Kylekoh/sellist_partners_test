import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FirstModal from "./FirstModal";
import SecondModal from "./SecondModal";
import ThirdModal from "./ThirdModal";
import FourthModal from "./FourthModal";
import FifthModal from "./FifthModal";
import { setTooltipToggle, addNext } from "../../modules/TooltipModule";

// 인트로 팝업창의 index 컴포턴트입니다.

const obj = {
  1: <FirstModal />,
  2: <SecondModal />,
  3: <ThirdModal />,
  4: <FourthModal />,
  5: <FifthModal />
};

const TooltipModal = () => {
  const next = useSelector(store => store.nextReducer);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setTooltipToggle(false));
    dispatch(addNext(1));
  };
  return (
    <Wrapper>
      <Overlay onClick={handleToggle} />
      {obj[next]}
    </Wrapper>
  );
};

export default TooltipModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
`;
