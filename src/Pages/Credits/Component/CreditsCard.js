import React from "react";
import styled from "styled-components";
import { CREDITS_LIST } from "../../../Components/data/creditsData";
import CreditsCardList from "./CreditsCardList";
import { center } from "../../../Config/commonStyles";

export default function CreditsCard() {
  return (
    <CardWrap>
      {CREDITS_LIST.map((credits, idx) => (
        <CreditsCardList credits={credits} key={idx} />
      ))}
    </CardWrap>
  );
}

const CardWrap = styled.section`
  margin: 30px 0px 0px 80px;
  letter-spacing: 0.08em;
  max-width: 1200px;
  ${({ theme }) => theme.flex("space-between", "", "")};
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 10px;
    place-content: center;
    place-items: center;

    margin: 5% 0 0 0;
  }
`;
