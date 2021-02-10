import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { headers, deleteEvent } from "../../../Config/urls";
import Fade from "react-reveal/Fade";
import { setDelete } from "../../../modules/EventModule";

function DeleteModal({ permlink }) {
  const [deleted, setDeleted] = useState(false);
  const del = useSelector(store => store.deleteReducer);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("access_token");
  const event_permlink = localStorage.getItem("permlink");
  const dispatch = useDispatch();

  const yesDelete = () => {
    dispatch(setDelete(!del));
  };

  const sendDelete = async () => {
    await axios
      .delete(deleteEvent, {
        headers,
        params: {
          email,
          token,
          event_permlink
        }
      })
      .then(res => {
        if (res.data.success === 1) {
          yesDelete();
          setDeleted(true);
        } else {
          console.log("event not deleted");
        }
      });
    setTimeout(() => {
      window.location.href = "/CreateDate";
    }, 3000);
    setTimeout(() => {
      setDeleted(false);
    }, 5000);
  };

  return (
    <Fade>
      <ModalContainer>
        <Content>정말 해당 이벤트를 취소하시겠습니까?</Content>
        <YesOrNo>
          <No
            onClick={() => {
              dispatch(setDelete(!del));
            }}
          >
            아니요
          </No>
          <Yes
            onClick={() => {
              sendDelete();
            }}
          >
            네
          </Yes>
        </YesOrNo>
      </ModalContainer>
    </Fade>
  );
}

export default DeleteModal;

const ModalContainer = styled.div`
  width: 302px;
  height: 145px;
  left: 29px;
  top: 0px;
  background: #f5f5f5;
  padding: 28px;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 3px 4px rgba(66, 66, 66, 0.12), 0px 1px 5px rgba(66, 66, 66, 0.2);
  border-radius: 4px;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 130%;
  color: #424242;
  margin-bottom: 16px;
`;

const YesOrNo = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex("flex-end", "ceter", "row")}
`;
const No = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 15px;
  cursor: pointer;
`;

const Yes = styled(No)`
  margin-left: 30px;
`;
