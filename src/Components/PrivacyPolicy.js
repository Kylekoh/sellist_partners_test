import React from "react";
import styled from "styled-components";
import ArrowBack from "../Images/ArrowBack";

function PrivacyPolicy(props) {
  return (
    <Container>
      <TopBox>
        <div onClick={() => props.history.push("/")}>
          <ArrowBack />
        </div>
        <Text>개인 정보 정책</Text>
      </TopBox>
    </Container>
  );
}

export default PrivacyPolicy;

const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;
`;

const TopBox = styled.div`
  display: flex;
  height: 56px;
  padding: 32px;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 4px 5px rgba(66, 66, 66, 0.12), 0px 1px 10px rgba(66, 66, 66, 0.2);
`;

const Text = styled.p`
  margin-left: 24px;
  color: #757575;
`;
