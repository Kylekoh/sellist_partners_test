import React from "react";
import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  /* width: 100%; */
  /* height: 100%; */
  top: 150;
  left: 150;
  position: fixed;
  z-index: 11;
  /* width: 100%;
  height: 100%; */
  /* margin: 0 auto; */
  z-index: 13;
`;

function Loading() {
  return (
    <ModalContainer>
      <ClipLoader loading={true} css={override} color={"#FFFFFF"} size={50} />
    </ModalContainer>
  );
}

export default Loading;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.55);
  ${({ theme }) => theme.flex("center", "center", "null")}
`;
