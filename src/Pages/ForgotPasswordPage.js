import React from "react";
import styled from "styled-components";
import ForgotPassword from "../Components/forgotPassword/ForgotPassword";
import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function ForgotPasswordPage(props) {
  return (
    <Container>
      <ImgRight src={Img2} />
      <ImgLeft src={Img1} />
      <ForgotPassword props={props} />
    </Container>
  );
}
export default ForgotPasswordPage;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #3c66ba;
  overflow: hidden;
`;

const ImgRight = styled.img`
  ${({ theme }) => theme.imgRight}
`;

const ImgLeft = styled.img`
  ${({ theme }) => theme.imgLeft}
`;
