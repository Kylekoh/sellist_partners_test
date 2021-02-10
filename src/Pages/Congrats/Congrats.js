import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Congrats({ history }) {
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)"
  });

  if (!accessToken && !email) {
    window.location.href = "/";
  } else {
    return (
      <Container>
        <SubContainer>
          <Page>
            <Title>감사합니다!</Title>
            <SubTitle>이벤트가 확정되었습니다!</SubTitle>
            <OtherTitle>
              신청하신 기간동안 모두의 셀러 공구페이지
              <br /> 상단에 노출될 예정입니다!
            </OtherTitle>
            {!isMobile ? (
              <SeeMoreOrder onClick={() => history.push("/Order")}>
                이벤트 확인하기
              </SeeMoreOrder>
            ) : null}
          </Page>
        </SubContainer>
      </Container>
    );
  }
}

export default withRouter(Congrats);

const Container = styled.main`
  display: flex;
  padding: 24px;
  background-color: #f2f6ff;

  @media (max-width: 500px) {
    margin-top: 100px;
  }
`;

const SubContainer = styled.div`
  width: 100%;
  margin-left: 350px;
  display: flex;
  ${({ theme }) => theme.flex("center", "flex-start", "column")};
  @media (max-width: 500px) {
    margin-left: 0px;
  }
`;

const Page = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 50px;
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
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const OtherTitle = styled.p`
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  color: #424242;
  padding-top: 20px;
  margin-bottom: 54px;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const SeeMoreOrder = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #757575;
  border: 1px solid #757575;
  border-radius: 4px;
  padding: 10px 8px 13px;
  width: 156px;
  height: 36px;
  cursor: pointer;
`;
