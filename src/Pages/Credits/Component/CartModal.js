import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CancelIcon from "../../../Images/CancelIcon";
import CartCredits from "./CartCredits";
import useForm from "../../CheckOut/useForm";

function CartModal({ hide }) {
  const [cartType, setCartType] = useState("");
  const cartDataItems = useSelector(store => store.cartDataReducer[0][0]);

  useForm(cartType);

  const handlePayProcess = () => {
    setCartType(1);
  };

  useEffect(() => {
    cartType === 1 && setCartType("");
  }, [cartType]);

  const modal = useRef();

  const handleClickOutside = ({ target }) => {
    if (!modal.current.contains(target)) {
      hide();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <CartModalWrap ref={modal}>
        <ModalWrap>
          <Header>
            <p>장바구니</p>
            <IconWrap onClick={hide}>
              <CancelIcon />
            </IconWrap>
          </Header>
          <CartListWrap>
            {cartDataItems?.map((e, i) => (
              <CartCredits {...e} key={i} idx={i} />
            ))}
          </CartListWrap>
          <TotalCredits>
            <span>포인트</span>
            <span>
              {cartDataItems
                .reduce((acc, cur) => {
                  return (acc += cur.credit_amount);
                }, 0)
                .toLocaleString()}
              포인트
            </span>
          </TotalCredits>
          <TotalPrice>
            <span>총액</span>
            <span>
              {cartDataItems
                .reduce((acc, cur) => {
                  return (acc += cur.credit_cash);
                }, 0)
                .toLocaleString()}
              원
            </span>
          </TotalPrice>
          {cartDataItems.length >= 1 ? (
            <>
              <CheckoutBtn onClick={handlePayProcess}>구매하기</CheckoutBtn>
            </>
          ) : (
            <>
              <CheckoutBtn
                style={{ backgroundColor: "#BDBDBD", color: "white" }}
              >
                구매하기
              </CheckoutBtn>
            </>
          )}
        </ModalWrap>
      </CartModalWrap>
    </Container>
  );
}

export default CartModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`;

const CartModalWrap = styled.div`
  width: 550px;
  min-height: 400px;
  padding: 45px 60px;
  border-radius: 25px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 35%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: white;
  @media (max-width: 500px) {
    padding: 15px 20px;
    width: 80%;
    left: 10%;
  }
`;

const ModalWrap = styled.div`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 50px;

  ${({ theme }) => theme.flex("space-between", "center", "")}
  @media (max-width: 500px) {
    margin-bottom: 15px;
  }
  p {
    font-weight: 700;
    font-size: 20px;
    color: #212121;
  }
`;

const CartListWrap = styled.div`
  max-height: 320px;
  overflow-y: scroll;
  margin-bottom: 20px;
  padding-bottom: 10px;

  ${({ theme }) => theme.flex("", "center", "column")}
`;

const IconWrap = styled.div`
  cursor: pointer;
`;

const TotalCredits = styled.div`
  margin-bottom: 12px;
  border-top: 2px solid rgba(222, 232, 255, 1);
  padding-top: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  letter-spacing: 0.08em;
  color: #757575;
  ${({ theme }) => theme.flex("space-between", "center", "")}
  @media (max-width: 500px) {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
  }
  span {
    &:nth-child(2) {
    }
  }
`;

const TotalPrice = styled.div`
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 21px;
  font-weight: bold;
  line-height: 25px;
  color: #212121;
  ${({ theme }) => theme.flex("space-between", "center", "")}
  @media (max-width: 500px) {
    margin-left: 10px;
    margin-right: 10px;
  }
  span {
    &:nth-child(2) {
      font-size: 25px;
      line-height: 29px;
      letter-spacing: 0.08em;
    }
  }
`;

const CheckoutBtn = styled.button`
  display: block;
  width: 270px;
  height: 45px;
  margin: 0 auto;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.08em;
  color: white;
  background-color: #212121;
  cursor: pointer;
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;
