import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import { setDelete } from "../../../modules/EventModule";

function DeleteParentModal({ setDeleted, permlink }) {
  const del = useSelector(store => store.deleteReducer);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Overlay
        onClick={() => {
          dispatch(setDelete(!del));
        }}
      />
      <DeleteModal setDeleted={setDeleted} permlink={permlink} />
    </Wrapper>
  );
}

export default DeleteParentModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
`;
