import { createGlobalStyle, css } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
${reset}

* {
    text-decoration: none;
    box-sizing: border-box;
  }
  
  html {
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400;500;700;900&display=swap');
    font-family: "Roboto", "Roboto Condensed", "Noto Sans KR", sans-serif, Malgungothic, "맑은고딕",
      Dotum, "돋움";

  input:focus,
  button:focus {
    outline: none;
  }

  input,
  button {
    background-color: inherit;
    border: none;
  }

  a {
    color: inherit;
  }

  html, body {
    height: 100%;
    background-color: #f2f6ff;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;

export const themes = {
  flex: (justify = null, align = null, direction = null) => css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `,
  imgRight: css`
    width: 500px;
    height: auto;
    position: absolute;
    left: 75%;
    right: -70.75%;
    top: 3%;
    bottom: 0.09%;
    transform: rotate(20deg);
    opacity: 0.4;
    @media screen and (max-width: 755px) {
      display: none;
    }
  `,
  imgLeft: css`
    width: 500px;
    height: auto;
    position: absolute;
    left: 41%;
    top: 22%;
    bottom: 0.09%;
    transform: rotate(20deg);
    border-radius: 20px;
    opacity: 0.4;
    @media screen and (max-width: 755px) {
      display: none;
    }
  `,
  container: css`
    width: 100vw;
    min-height: 700px;
    min-width: 1400px;
    display: flex;
    padding: 24px;
  `,
  pageWrap: css`
    width: 100vw;
    margin: 1.5% 4% 0 30px;
  `
};
