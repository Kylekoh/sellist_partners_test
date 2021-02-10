import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import { registerApi, TOKEN } from "../../Config/urls";
import Close from "../../Images/Close";
import Visiblility from "../../Images/Visibility";
import VisibilityOff from "../../Images/VisibilityOff";

function Register() {
  const [pwvisibility, setPwVisibility] = useState(false); //eyeIcon 클릭시 password input type을 password또는text로 바꿔줍니다
  const [state, setState] = useState({ email: "", name: "", password: "" });
  const [error1, setError1] = useState(false); //이미 사용 중인 이메일 입니다. 다시 시도해 주세요. -email
  const [error2, setError2] = useState(false); //사용할 수 없는 이메일 형식입니다. -email
  const [error3, setError3] = useState(false); //숫자나 특수문자( . 제외)는 포함될 수 없습니다. -name
  const [error4, setError4] = useState(false); //비밀번호는 최소 8자 이상이어야 합니다. -pw
  const [open, setOpen] = useState(false); //open === true 일때 snackbar가 열립니다

  const emailFilled = state.email.length > 0;
  const nameFilled = state.name.length > 0;
  const pwFilled = state.password.length > 0;
  const isRegisterBtnActive = !(
    state.name.length > 0 &&
    state.email.length > 0 &&
    state.password.length > 0
  );

  const regEmail =
    "/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i";
  const regName = "/^[ㄱ-ㅎ|가-힣|a-z|A-Z|.| |*]+$/"; //숫자나 특수문자( . 제외)는 포함될 수 없습니다.
  const regPassword = "/^[a-zA-Z0-9!@#$%^&*)(+=._-]{8,}$/"; //영문대소문,숫자,특수문자,최소8자

  function inputhandler(e) {
    const { name, value } = e.target;
    setError1(false);
    if (name === "email" && regEmail.test(value)) {
      setError2(false);
    }
    if (name === "name" && regName.test(value)) {
      setError3(false);
    }
    if (name === "password" && regPassword.test(value)) {
      setError4(false);
    }
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function btnRegister(e) {
    if (e.which === 13 || e.nativeEvent.type === "click") {
      const { email, name, password } = state;
      if (!regEmail.test(email)) {
        setError2(true);
      }
      if (!regName.test(name)) {
        setError3(true);
      }
      if (!regPassword.test(password)) {
        setError4(true);
      }
      if (
        regEmail.test(email) &&
        regName.test(name) &&
        regPassword.test(password)
      ) {
        getFetch();
      }
    }
  }

  function getFetch() {
    const { email, name, password } = state;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);

    fetch(registerApi, {
      method: "post",
      headers: {
        Authorization: TOKEN
      },
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          const { email, access_token } = res.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("email", email);
          localStorage.setItem("new_user", res.data.new_user); // new_user: 0 (접속이력 2회 이상), 1(최초 접속)
          localStorage.setItem("toggle", false); // 최초 로그인한 user만 toggle을 저장한다.
          //회원가입 성공
          setOpen(true);
          window.location.href = "/CreateEvent";
        }
        if (res.error) {
          if (res.error.type === 1) {
            alert("다시확인");
          }
          if (res.error.type === 2) {
            alert("서버에러");
          }
          if (res.error.type === 3) {
            alert("회원가입 실패");
          }
          if (res.error.type === 4) {
            setError1(true); //이미 사용 중인 이메일 입니다. 다시 시도해 주세요.
          }
        }
      });
  }

  function closeIcon(param) {
    //closeIcon 클릭시 해당 input의 state값을 "" 으로, error를 false
    if (param === "email") {
      setError1(false);
      setError2(false);
      setState(prevState => ({
        ...prevState,
        email: ""
      }));
    }
    if (param === "name") {
      setError3(false);
      setState(prevState => ({
        ...prevState,
        name: ""
      }));
    }
  }

  function eyeIcon() {
    //eyeIcon 클릭시 password input type을 password또는text로 바꿔줍니다
    setPwVisibility(!pwvisibility);
  }

  return (
    <>
      <InputBox
        error1={error1}
        error2={error2}
        error3={error3}
        error4={error4}
        emailFilled={emailFilled}
        nameFilled={nameFilled}
        pwFilled={pwFilled}
      >
        <div>
          <input
            placeholder="이메일"
            className="error correctEmail errorForEmail typingEmail"
            name="email"
            onChange={inputhandler}
            onKeyPress={btnRegister}
            value={state.email}
          />
          {error1 && (
            <div className="inputIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
          {error2 && emailFilled && (
            <div className="inputIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
        </div>
        {error1 && (
          <div className="emailError">
            이미 사용 중인 이메일 입니다. 다시 시도해 주세요.
          </div>
        )}
        {error2 && emailFilled && (
          <div className="emailError">사용할 수 없는 이메일 형식입니다.</div>
        )}
        <div className="name">
          <input
            placeholder="이름"
            className="error errorForName typingName"
            name="name"
            onChange={inputhandler}
            onKeyPress={btnRegister}
            value={state.name}
          />
          {error3 && nameFilled && (
            <div className="inputIcon" onClick={() => closeIcon("name")}>
              <Close />
            </div>
          )}
        </div>
        {error3 && nameFilled && (
          <div className="nameError">
            숫자나 특수문자( . 제외)는 포함될 수 없습니다.
          </div>
        )}
        <div className="password">
          <input
            placeholder="비밀번호 (8글자 이상)"
            type={pwvisibility ? "text" : "password"}
            className="error errorForPw typingPw"
            name="password"
            onChange={inputhandler}
            onKeyPress={btnRegister}
            value={state.password}
          />
          {pwFilled && pwvisibility && (
            <div className="inputIcon" onClick={eyeIcon}>
              <Visiblility />
            </div>
          )}
          {pwFilled && !pwvisibility && (
            <div className="inputIcon" onClick={eyeIcon}>
              <VisibilityOff />
            </div>
          )}
        </div>
        {error4 && pwFilled && (
          <div className="passwordError">
            비밀번호는 최소 8자 이상이어야 합니다.
          </div>
        )}
      </InputBox>
      <FooterBox error4={error4} pwFilled={pwFilled}>
        <p>
          계속 버튼을 클릭하면 서비스 이용약관 및 개인 정보 정책에 동의 하는
          것으로 간주됩니다.
        </p>
        <div className="terms">
          <div>
            <a
              href="https://www.moduseller.com/terms-of-service"
              target="_blank"
            >
              서비스 이용약관
            </a>
          </div>
          <div>
            <a href="https://www.moduseller.com/privacy-policy" target="_blank">
              개인 정보 정책
            </a>
          </div>
        </div>
        <RegisterButton
          disabled={isRegisterBtnActive}
          onClick={btnRegister}
          button={isRegisterBtnActive}
        >
          계속
        </RegisterButton>

        <Snackbar
          anchorOrigin={{
            vertical: "",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={3000}
        >
          <SnackbarContent
            message={`${state.name} 님, 가입을 환영합니다 !`}
            style={{
              backgroundColor: "#757575"
            }}
          />
        </Snackbar>
      </FooterBox>
    </>
  );
}
export default Register;

const InputBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  div {
    width: 100%;
    position: relative;

    input {
      padding: 13px;
      width: 100%;
      height: 56px;
      background: white;
      font-size: 16px;
    }

    .errorForEmail {
      ${({ error1 }) => error1 && `border-bottom: 1px solid red`}
      ${({ error2, emailFilled }) =>
        error2 && emailFilled && `border-bottom: 1px solid red`}
    }

    .errorForName {
      ${({ error3, nameFilled }) =>
        error3 && nameFilled && `border-bottom: 1px solid red`}
    }

    .errorForPw {
      ${({ error4, pwFilled }) =>
        error4 && pwFilled && `border-bottom: 1px solid red`}
    }
    .typingEmail {
      ${({ emailFilled, error1, error2 }) =>
        emailFilled && !error1 && !error2 && `border-bottom: 1px solid #757575`}
    }

    .typingName {
      ${({ nameFilled, error3 }) =>
        nameFilled && !error3 && `border-bottom: 1px solid #757575`}
    }

    .typingPw {
      ${({ error4, pwFilled }) =>
        !error4 && pwFilled && `border-bottom: 1px solid #757575`}
    }
    .inputIcon {
      left: 88%;
      bottom: 5%;
      position: absolute;
    }
  }

  .emailError,
  .nameError,
  .passwordError {
    font-size: 13px;
    color: #e64a19;
    left: 2%;
  }

  .name {
    ${({ error1, error2 }) => !error1 && !error2 && `margin-top: 5%;`}
    ${({ error1, emailFilled }) => error1 && emailFilled && `margin-top: 0.5%;`}
    ${({ error2, emailFilled }) => error2 && emailFilled && `margin-top: 0.5%;`}
  }

  .password {
    ${({ error3 }) => !error3 && `margin-top: 5%;`}
    ${({ error3, nameFilled }) => error3 && nameFilled && `margin-top: 0.5%;`}
  }
`;

const FooterBox = styled.div`
  ${({ error4 }) => !error4 && `margin-top: 7%;`}
  ${({ error4, pwFilled }) => error4 && !pwFilled && `margin-top: 7%;`}
  ${({ error4, pwFilled }) => error4 && pwFilled && `margin-top: 2.8%;`}
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
