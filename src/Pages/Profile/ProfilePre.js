import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import Visibility from "../../Images/Visibility";
import VisibilityOff from "../../Images/VisibilityOff";
import { updateUserInfo, headers, getUserInfo } from "../../Config/urls";
import axios from "axios";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonModal from "./Components/ButtonModal";
import DeleteParentModal from "../Order/Components/DeleteParentModal";
import DeletedSnackBar from "../Order/Components/DeletedSnackBar";

function Profile() {
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("access_token");
  const [displayName, setDisplayName] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [modal, setModal] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSameName, setIsSameName] = useState(true);

  const del = useSelector(store => store.deleteReducer);
  const deleted = useSelector(store => store.confirmDeleteReducer);
  const dispatch = useDispatch();

  // const {
  //   emailValue,
  //   nameValue,
  //   oldPassValue,
  //   newPassValue,
  //   confirmPassValue
  // } = input;

  // const handleChangeName = async () => {
  //   await axios.post(updateUserInfo, nameData, {
  //     headers
  //   });
  // };

  // ------Name Validation------
  // const regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|.| |\*]+$/;
  // const SCValidation =
  //   nameValue && !regName.test(nameValue)
  //     ? "특수문자 및 숫자는 입력하실수 없습니다."
  //     : "";
  // const nameValidation = nameValue.length > 0;
  // const sameName = nameValue === displayName;
  // ----------------------------

  // const handleInput = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setInput({
  //     ...input,
  //     [`${name}Value`]: value
  //   });

  //   const validator = {
  //     oldPass:
  //       value.length < 8 && value.length > 0
  //         ? "비밀번호는 최소 8자리 이상이어야 합니다."
  //         : "",
  //     newPass:
  //       value.length < 8 && value.length > 0
  //         ? "비밀번호는 최소 8자리 이상이어야 합니다."
  //         : "",
  //     confirmPass:
  //       value.length < 8 && value.length > 0
  //         ? "비밀번호는 최소 8자리 이상이어야 합니다."
  //         : ""
  //   };

  //   setErr({
  //     ...err,
  //     [`${name}Err`]: validator[name]
  //   });
  // };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(getUserInfo, {
          headers,
          params: {
            email,
            token: accessToken
          }
        });
        setInputEmail(data.data.user_data.email);
        setName(data.data.user_data.name);
        setDisplayName(data.data.user_data.name);
      } catch (err) {
        console.log("겟유저데이터 에러 확인", err);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|.| |\*]+$/;
    console.log("이즈네임밸리드", isNameValid);
    console.log("이즈세임네임", isSameName);
    if (name && name.match(regName) === null) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
    if (name && name === displayName) {
      console.log("같은네임체크", name === displayName);
      setIsSameName(true);
    } else {
      console.log("같은네임체크", name === displayName);
      setIsSameName(false);
    }

    // if (name && name.match(regName) !== null && name !== displayName) {
    //   setIsNameValid(true);
    //   setIsSameName(false);
    // }
    // const SCValidation =
    //   name && !regName.test(name)
    //     ? "특수문자 및 숫자는 입력하실수 없습니다."
    //     : "";

    // const nameValidation = name.length > 0;
    // const sameName = name === displayName;

    // ----------------------------
  }, [name]);

  const handleInputChange = e => {
    setName(e.target.value);
  };

  // 저장버튼
  const handleSubmit = async e => {
    console.log("이기어기어 1111");
    e.preventDefault();
    try {
      const nameData = qs.stringify({
        email,
        token: accessToken,
        name: name
      });

      const data = await axios.post(updateUserInfo, nameData, {
        headers
      });
      console.log("데이터 결과", data);
    } catch (error) {
      console.log("Name Update error", error);
    }

    console.log("이기어기어 2222");

    setSnackbar(true); //snackbar open
    setTimeout(() => {
      setSnackbar(false);
    }, 15000);

    // if (!checkOldPw && oldPassRequire) {
    //   console.log("여기여기222");
    //   e.preventDefault();
    //   setName(true);
    // }
    // if (
    //   checkOldPw &&
    //   oldPassRequire &&
    //   newPassRequire &&
    //   confirmPassRequire &&
    //   !checkPassValidation
    // ) {
    //   e.preventDefault();
    //   setModal(true);
    //   console.log("여기여기333");
    // }
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("new_user");
    localStorage.removeItem("toggle");
    window.location.href = "/";
  };

  return (
    <Container>
      {del && <DeleteParentModal />}
      {deleted && <DeletedSnackBar />}

      <ProfilePageWrap>
        <TitleContainer>
          <span>프로필</span>
          <div onClick={handleLogout}>로그아웃</div>
        </TitleContainer>
        <NameContainer>
          <span>{displayName}</span>
        </NameContainer>
        <InputContainer>
          <InfoContainer>
            <InfoTitle>이름 변경</InfoTitle>
            <InfoInput>
              <EmailInput>
                <input
                  disabled
                  type="text"
                  name="inputEmail"
                  value={inputEmail}
                  placeholder="이메일을 입력해 주세요."
                />
              </EmailInput>
              <NameInput isValid={!isNameValid}>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="name"
                  value={name}
                  placeholder="이름을 입력해 주세요."
                />
                {!isNameValid ? (
                  <ErrIndicator>
                    <span>특수문자 및 숫자는 입력하실수 없습니다.</span>
                  </ErrIndicator>
                ) : null}
              </NameInput>
            </InfoInput>
          </InfoContainer>
          <ButtonContainer
            disabled={isNameValid && !isSameName}
            isValid={isNameValid && !isSameName}
            onClick={handleSubmit}
          >
            저장
          </ButtonContainer>
        </InputContainer>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbar}
          autoHideDuration={3000}
        >
          <SnackbarContent
            message={`프로필 수정이 완료 되었습니다.`}
            style={{
              backgroundColor: "#757575"
            }}
          />
        </Snackbar>
      </ProfilePageWrap>
    </Container>
  );
}

export default withRouter(Profile);

const OldPassVisible = styled.div`
  right: 5px;
  top: 25px;
  position: absolute;
`;

const NewPassVisible = styled.div`
  right: 5px;
  top: 25px;
  position: absolute;
`;

const ConfirmPassVisible = styled.div`
  right: 5px;
  top: 25px;
  position: absolute;
`;

const Container = styled.main`
  min-height: 700px;
  min-width: 1400px;
  display: flex;
  padding: 24px;
  @media (max-width: 500px) {
    min-width: 300px;
    padding: 0px;
  }
`;

const ProfilePageWrap = styled.section`
  width: 100%;
  margin: 20px 0px 0px 0px;
  @media (max-width: 500px) {
    margin: 80px 0px 0px 0px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
  span {
    font-weight: 300;
    font-size: 34px;
    color: #96a9cf;
    @media (max-width: 500px) {
      font-size: 28px;
      margin-left: 20px;
    }
  }

  div {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    @media (max-width: 500px) {
      margin-right: 20px;
    }
  }
`;

const NameContainer = styled.div`
  margin: 50px 0px 0px 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
  @media (max-width: 500px) {
    width: 100%;
    margin: 100px 0px 0px 0px;
    display: flex;
    justify-content: center;
  }
  span {
    font-weight: bold;
    font-size: 50px;
    color: #96a9cf;
    @media (max-width: 500px) {
      font-size: 42px;
    }
  }
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 40px;
  }
`;

const InfoContainer = styled.div``;

const InfoTitle = styled.div``;

const InfoInput = styled.div`
  ${({ theme }) => theme.flex("", "", "column")}
`;

const EmailInput = styled.div`
  input {
    height: 40px;
    width: 350px;
    background: #f5f5f5;
    border: ${({ isValid }) =>
      isValid ? "1px solid red " : "  0.5px solid #bdbdbd "};
    border-radius: 6px;
    margin-top: 30px;
    padding: 14px 0 16px 13px;
    font-size: 16px;
  }
`;

const NameInput = styled.div`
  input {
    height: 40px;
    width: 350px;
    background: #ffffff;
    border: ${({ isValid }) =>
      isValid ? "1px solid red " : "  0.5px solid #bdbdbd "};
    border-radius: 6px;
    margin-top: 30px;
    padding: 14px 0 16px 13px;
    font-size: 16px;
  }
`;

const PasswordContainer = styled.div`
  margin-left: 80px;
`;

const PasswordTitle = styled.div``;

const PasswordInput = styled.div`
  ${({ theme }) => theme.flex("", "", "column")}
`;

const OldPassInput = styled.div`
  position: relative;
  input {
    height: 40px;
    width: 350px;
    background: #ffffff;
    border: ${({ isValid }) =>
      isValid ? "1px solid red " : " 0.5px solid #bdbdbd "};
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 30px;
    padding: 14px 0 16px 13px;
    font-size: 16px;
  }
`;

const NewPassInput = styled.div`
  position: relative;
  input {
    height: 40px;
    width: 350px;
    background: #ffffff;
    border: ${({ isValid }) =>
      isValid ? "1px solid red " : " 0.5px solid #bdbdbd "};
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 30px;
    padding: 14px 0 16px 13px;
    font-size: 16px;
  }
`;

const ConfirmPassInput = styled.div`
  position: relative;
  input {
    height: 40px;
    width: 350px;
    background: #ffffff;
    border: ${({ isValid }) =>
      isValid ? "1px solid red " : " 0.5px solid #bdbdbd "};
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 30px;
    padding: 14px 0 16px 13px;
    font-size: 16px;
  }
`;

const ButtonContainer = styled.button`
  margin-left: 190px;
  margin-top: 100px;
  height: 36px;
  width: 156px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  background-color: ${({ isValid }) => (isValid ? "#212121" : "#bdbdbd")};
  align-self: flex-end;
  margin-top: 200px;
  margin-right: 100px;
  @media (max-width: 500px) {
    margin-top: 50px;
  }
`;

const ErrIndicator = styled.div`
  margin: 5px 0 0 8px;
  span {
    font-weight: bold;
    font-size: 13px;
    color: #e64a19;
  }
`;
