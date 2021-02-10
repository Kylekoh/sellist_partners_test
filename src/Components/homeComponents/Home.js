import React, { useState, useMemo, useContext } from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import Register from "./Register";
import { center, container, header } from "../../Config/commonStyles";
import { kakaoLoginAPI, headers } from "../../Config/urls";
import Logo from "../../Images/Logo";
import Partners from "../../Images/Partners";
import { green } from "@material-ui/core/colors";
import { findByLabelText } from "@testing-library/react";
import Loading from "../../../src/Components/Loading";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import axios from "axios";
import KakaoTalkOriginal from "../../Images/KakaoTalkOriginal";
import { NewUserContext } from "../../Context/newUserContext";
import { Loader } from "react-loader-spinner";

const { Kakao } = window;

function Home(props) {
  const propsFromHomePage = props.props;

  const [activeTab, setActiveTab] = useState(false);
  const [loading, setLoading] = useState(null); //Loading spinner
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { isNewUser, setIsNewUser } = useContext(NewUserContext);

  const handleKakaoLogin = async () => {
    console.log("kakako login clicked");
    setLoading(true);
    Kakao.Auth.login({
      success: function (response) {
        // 토큰
        const token = response.access_token;
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            // 이메일
            const email = res.kakao_account.email;
            // 이름
            const name = res.properties.nickname;
            let formData = new FormData();
            formData.append("email", email);
            formData.append("token", token);
            formData.append("name", name);

            fetch(kakaoLoginAPI, {
              method: "post",
              headers,
              body: formData
            })
              .then(res => {
                return res.json();
              })
              .then(res => {
                if (res.success === 1) {
                  // 카카오 로그인 성공
                  const { email, access_token, name, new_user } = res.data;
                  setUserName(name);
                  localStorage.setItem("access_token", access_token);
                  localStorage.setItem("email", email);
                  localStorage.setItem("new_user", new_user);
                  localStorage.setItem("toggle", false);
                  access_token
                    ? setOpen(true)((window.location.href = "/CreateEvent"))
                    : alert("로그인 실패!");

                  setLoading(false);
                }
              })
              .catch(err => console.log(err));
          },
          fail: function (error) {
            setLoading(false);
            console.log("카카오 유저 정보받기 에러 발생", error);
          }
        });
      },
      fail: function (error) {
        console.log("에러", error);
        setLoading(false);
      }
    });
  };

  return (
    <HomeContainer>
      <Center>
        <Content>
          <Header>
            <div>
              <div className="logo">
                <Logo />
              </div>
              <div className="partners">
                <Partners />
              </div>
            </div>
          </Header>
          <UpperContainer>
            <WelcomeText>
              모두의셀러 파트너스에 <br />
              오신 것을 환영합니다.
            </WelcomeText>
            <IntroduceText>
              여려분이 진행하시는 이벤트를 등록하시고
              <br /> 더 많은 소비자들에게 홍보해 보세요.
            </IntroduceText>
          </UpperContainer>
          <KakaoContainer>
            <KakaoBtn onClick={handleKakaoLogin}>
              <KakaoTalkOriginal />
              <KakaoText>
                카카오 로그인하기
                <LoadingContainer className="loading">
                  {loading ? <Loading /> : ""}
                </LoadingContainer>
              </KakaoText>
            </KakaoBtn>
          </KakaoContainer>
          <UnderContainer>
            <ImageContainer>
              <FirstImage />
              <SecondImage />
              <ThirdImage />
            </ImageContainer>
            <ServiceContainer>
              {/* <ServiceIntroText>
                계속 버튼을 클릭하면 서비스 이용약관 및 개인 정보 정책에
                <br />
                동의 하는 것으로 간주됩니다.
              </ServiceIntroText> */}
              {/* <CompanyInfoContainer>
                <p>서울특별시 강남구 신사동 525-1 이룸빌딩 1층</p>
                <p>머치스퀘어(주)사업자등록번호:168-81-00659</p>
                <p>대표자: 송상우, 구교빈 전화번호: 070-4229-6120</p>
                <p>Email:info@moduseller.com</p>
                <p>Copyright © Merchsquare,Inc.2020 All Rights Reserved</p>
              </CompanyInfoContainer> */}
              <BtnContainer>
                <ServiceBtn>
                  <a
                    href="https://www.moduseller.com/terms-of-service"
                    target="_blank"
                  >
                    서비스 이용약관
                  </a>
                </ServiceBtn>
                <PersonalInfoBtn>
                  <a
                    href="https://www.moduseller.com/privacy-policy"
                    target="_blank"
                  >
                    개인 정보 정책
                  </a>
                </PersonalInfoBtn>
              </BtnContainer>
            </ServiceContainer>
          </UnderContainer>
        </Content>

        <SnackbarWrapper open={open}>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={open}
            autoHideDuration={3000}
          >
            <PopupContent
              message={`${userName} 님, 로그인을 환영합니다!`}
              style={{ background: "#757575" }}
            />
          </Snackbar>
        </SnackbarWrapper>
      </Center>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    background-color: #ffffff;
    background-color: yellowgreen;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  width: 448px;
  height: 736px;
  border: 1px solid #6e9dfd;
  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    border: 0px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = header;

const UpperContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const WelcomeText = styled.span`
  margin-bottom: 25px;
  text-align: center;
  color: #6e9dfd;
  font-size: 15px;
  line-height: 150%;
`;

const IntroduceText = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #3c66ba;
  line-height: 160%;
`;

const KakaoContainer = styled.div`
  margin-top: 40px;
  width: 80%;
`;

const KakaoBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ffe812;
  opacity: 0.8;
  border-radius: 4px;
  line-height: 16px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #212121;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const KakaoIcon = styled.span`
  width: 40px;
  height: 22px;
  margin-right: 10px;
  color: red;
  background: url(/images/kakao_talk.svg) left 20px center no-repeat;
`;

const KakaoText = styled.p`
  margin-left: 5px;
`;

const UnderContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: gray; */
  margin-top: 40px;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
`;

const FirstImage = styled.p`
  width: 117px;
  height: 117px;
  background: url(https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y29jb29pbHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=900&q=60)
    center no-repeat;
  background-size: cover;
  border: 4px solid #ffffff;
  border-radius: 120px;
  z-index: 1;
`;

const SecondImage = styled.p`
  width: 117px;
  height: 117px;
  background: url(https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2550&q=80)
    center no-repeat;
  background-size: cover;
  border: 4px solid #ffffff;
  border-radius: 120px;
  margin-left: -55px;
  z-index: 3;
`;

const ThirdImage = styled.p`
  width: 117px;
  height: 117px;
  background: url(https://images.unsplash.com/photo-1559517042-d5e10d1afe6c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80)
    center no-repeat;
  background-size: cover;
  border: 4px solid #ffffff;
  border-radius: 120px;
  margin-left: -55px;
  z-index: 5;
`;

const ServiceContainer = styled.div`
  text-align: center;
  padding: 0px 12px 0px 12px;
`;

const ServiceIntroText = styled.span`
  line-height: 130%;
  font-weight: normal;
  font-size: 14px;
  color: #424242;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
`;

const ServiceBtn = styled.button`
  color: #212121;
  font-weight: bold;
  font-size: 12px;
`;

const PersonalInfoBtn = styled.button`
  color: #212121;
  font-weight: bold;
  font-size: 12px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  left: 160px;
  bottom: -10px;
`;

const Tab = styled.div`
  margin-top: 10%;
  padding-right: 16px;
  padding-left: 16px;

  ul {
    display: flex;

    li {
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.08em;
      width: 100%;
      height: 29px;
      text-align: center;
      color: #757575;
      cursor: pointer;

      .tabStyle {
        height: 29px;
        border-bottom: 1px solid rgb(33, 33, 33);
        color: #212121;
      }
    }
  }
`;

const SnackbarWrapper = styled.div`
  position: fixed;
  display: ${({ open }) => (open ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 100;
`;

const PopupContent = styled(SnackbarContent)`
  .MuiSnackbarContent-message {
    color: #fff;
  }
`;

const FooterBox = styled.div`
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

const RegisterButton = styled.button`
  margin-top: 10%;
  height: 48px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  cursor: pointer;
  ${({ button }) =>
    button
      ? `background: #bdbdbd;`
      : `
background: #212121;
`};
`;

const CompanyInfoContainer = styled.div`
  font-size: 11px;
  text-align: center;
  line-height: 130%;
  @media (max-width: 500px) {
    background-color: #ffffff;
    margin-top: -20px;
    margin-bottom: 20px;
  }
`;
