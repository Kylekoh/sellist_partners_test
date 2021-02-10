import React from "react";
import styled from "styled-components";

function ThankYou() {
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken && !email) {
    window.location.href = "/";
  } else {
    return (
      <Container>
        <SubContainer>
          <Page>
            <Title>감사합니다.</Title>
            <SubTitle>포인트 충전이 완료되었습니다.</SubTitle>
          </Page>
        </SubContainer>
      </Container>
    );
  }
}

export default ThankYou;

const Container = styled.main`
  margin-top: 30px;
  display: flex;
  padding: 24px;
  background-color: #f2f6ff;
  @media (max-width: 500px) {
    margin-top: 150px;
  }
`;

const SubContainer = styled.div`
  width: 100%;
  margin-left: 350px;
  display: flex;
  ${({ theme }) => theme.flex("center", "flex-start", "column")};
  @media (max-width: 500px) {
    margin-left: 30px;
  }
`;

const Page = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 50px;
  line-height: 130%;
  color: #6e9dfd;
  margin-bottom: 24px;
  @media (max-width: 500px) {
    font-size: 40px;
  }
`;

const SubTitle = styled.p`
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  color: #212121;
  margin-bottom: 54px;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
