import styled from "styled-components";

export const center = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 101vh;
`;

export const container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;

  @media screen and (min-width: 530px) {
    width: 420px;
    height: 660px;
    background: #f2f6ff;
    border-radius: 16px;
    margin-left: 12vw;
  }
`;

export const header = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    position: relative;
    width: 154px;
    height: 58px;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .partners {
      width: 67px;
      height: 23px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

export const footerBox = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  p {
    height: 10px;
    font-size: 14px;
    text-align: center;
    color: #424242;
    margin-bottom: 30px;
  }
  div {
    cursor: pointer;
  }
  .terms {
    margin-top: 5%;
    display: flex;
    justify-content: space-evenly;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.08em;
  }
  div {
    font-size: 12px;
    line-height: 10px;
    font-weight: bold;
    color: #212121;
  }
`;
