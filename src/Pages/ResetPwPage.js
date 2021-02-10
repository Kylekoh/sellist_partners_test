import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";
import ResetPw from "../Components/resetPw/ResetPw";
import { tokenApi, TOKEN } from "../Config/urls";
import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function ResetPwPage(props) {
  const [valid, setvalid] = useState(false);
  const [open, setOpen] = useState(false);

  let url = props.location.search;
  let i = url.indexOf("=");
  let token = url.slice(i + 1, url.length);

  function checkIfTokenValid() {
    const formData = new FormData();
    formData.append("token", token);
    fetch(tokenApi, {
      method: "POST",
      headers: {
        Authorization: TOKEN
      },
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === 1) {
          setvalid(true);
        } else {
          setvalid(false);
          setOpen(true);
          setTimeout(() => {
            props.history.push("/");
          }, 3500);
        }
      });
  }

  useEffect(() => {
    checkIfTokenValid();
  });

  if (valid) {
    return (
      <Container>
        <ImgRight src={Img2} />
        <ImgLeft src={Img1} />
        <ResetPw props={props} token={token} />
      </Container>
    );
  }
  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={open}
      >
        <SnackbarContent
          message="링크의 유효기간이 만료되었습니다."
          style={{
            backgroundColor: "#757575"
          }}
        />
      </Snackbar>
    </Container>
  );
}

export default ResetPwPage;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #3c66ba;
  overflow: hidden;
`;

const ImgRight = styled.img`
  ${({ theme }) => theme.imgRight}
`;

const ImgLeft = styled.img`
  ${({ theme }) => theme.imgLeft}
`;
