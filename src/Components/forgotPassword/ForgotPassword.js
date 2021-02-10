import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import { forgotPwApi, TOKEN } from "../../Config/urls";
import { center, container, header } from "../../Config/commonStyles";
import ArrowBack from "../../Images/ArrowBack";
import Logo from "../../Images/Logo";
import Partners from "../../Images/Partners";

function ForgotPassword(props) {
  const propsFromPage = props.props;
  const [open, setOpen] = useState(false);
  const [input, setUserEmail] = useState({ userEmail: "" });
  const btnActive = !(input.userEmail.length > 0);
  const [success, setSuccess] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function InputUserEmail(e) {
    setUserEmail({ userEmail: e.target.value });
  }

  const handleSubmit = e => {
    if (e.which === 13 || e.nativeEvent.type === "click") {
      const formData = new FormData();
      formData.append("email", input.userEmail);

      fetch(forgotPwApi, {
        method: "post",
        headers: {
          Authorization: TOKEN
        },
        body: formData
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === 1) {
            setOpen(true);
            setSuccess(true);
            setTimeout(() => {
              propsFromPage.history.push("/");
            }, 1000);
          }
          if (res.success === 0) {
            setOpen(true);
            setSuccess(false);
          }
        })
        .catch(err => console.log("err: ", err));
    }
  };

  return (
    <Center>
      <Container>
        <TopBox>
          <div onClick={() => propsFromPage.history.push("/")}>
            <ArrowBack />
          </div>
        </TopBox>
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
        <InputBox>
          <InputBoxText>비밀번호 찾기</InputBoxText>
          <input
            placeholder="가입하신 이메일을 입력해주세요."
            className="newPassword"
            onChange={InputUserEmail}
            onKeyPress={handleSubmit}
          />
        </InputBox>
        <FooterBox>
          <ChangeButton
            disabled={btnActive}
            button={btnActive}
            onClick={handleSubmit}
          >
            비밀번호 찾기
          </ChangeButton>
          <Snackbar
            anchorOrigin={{
              vertical: "",
              horizontal: "center"
            }}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <SnackbarContent
              message={
                success
                  ? "비밀번호 재설정을 위한 Email이 사용자의 계정으로 전송되었습니다."
                  : "이메일을 확인해 주세요"
              }
              style={{
                backgroundColor: "#757575"
              }}
            />
          </Snackbar>
        </FooterBox>
      </Container>
    </Center>
  );
}
export default ForgotPassword;

const Center = center;

const Container = container;

const TopBox = styled.div`
  display: flex;
  height: 56px;
  padding: 32px;
  @media screen and (min-width: 530px) {
    display: none;
  }
`;

const Header = header;

const InputBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;
  input {
    padding: 13px;
    width: 100%;
    height: 56px;
    background: white;
    font-size: 16px;
  }
  .newPassword {
    margin-bottom: 5%;
  }
  .name {
    margin-bottom: 5%;
  }
`;
const InputBoxText = styled.div`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  margin-left: 10px;
`;

const FooterBox = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;
  p {
    height: 18px;
    font-size: 14px;
    text-align: center;
    color: #424242;
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
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: white;
    justify-content: center;
  }
`;

const ChangeButton = styled.button`
  margin-top: 50%;
  height: 48px;
  background: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  ${({ button }) => (button ? `background: #BDBDBD;` : `background: #212121;`)}
  @media screen and (max-width: 530px) {
    margin-top: 65%;
  }
`;
