import React from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, headers } from "../../../Config/urls";
import { deleteDataCart } from "../../../modules/CartDataModule";

function CartCredits({ credit_amount, credit_cash, cart_id, idx }) {
  const cartDataItems = useSelector(store => store.cartDataReducer);
  const EMAIL = localStorage.getItem("email");
  const dispatch = useDispatch();

  //deleteCredit
  const data = qs.stringify({ email: EMAIL, cart_id: cart_id });
  const deleteCredit = async () => {
    await axios.post(deleteCart, data, {
      headers
    });
  };

  //클릭 시 스토어에 있는 데이터 배열 요소 삭제
  const filterItem = () => {
    const items = cartDataItems[0][0].filter((_, i) => {
      return i !== idx;
    });
    dispatch(deleteDataCart(items));
    deleteCredit();
  };

  return (
    <CreditsContainer style={listStyles[credit_amount]}>
      <CreditWrap>
        <LeftWrap>
          <DeleteIcon
            style={deletedIconStyle[credit_amount]}
            onClick={filterItem}
          />
          <span style={amountStyle[credit_amount]}>{credit_amount}포인트</span>
        </LeftWrap>
        <RightWrap>
          <span>￦</span>
          <span style={creditPrice[credit_amount]}>
            {credit_cash.toLocaleString()}
          </span>
        </RightWrap>
      </CreditWrap>
    </CreditsContainer>
  );
}

export default CartCredits;

const CreditsContainer = styled.div`
  width: 90%;
  margin-bottom: 14px;
  border: 2px solid #6e9dfd;
  border-radius: 15px;
`;

const CreditWrap = styled.div`
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 500px) {
    padding: 15px 20px;
  }
`;

const LeftWrap = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.flex("space-between", "center", "")};
  span {
    padding-left: 27px;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0.08em;
    @media (max-width: 500px) {
      padding-left: 12px;
      font-size: 14px;
    }
  }
`;

const DeleteIcon = styled.div`
  width: 10px;
`;

const RightWrap = styled.div`
  ${({ theme }) => theme.flex("", "center", "")};

  span {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: #96a9cf;
    @media (max-width: 500px) {
      font-size: 18px !important;
    }
    :nth-child(1) {
      margin-right: 2px;
    }
  }
`;

const listStyles = {
  10: {
    background: "#F2F6FF"
  },
  30: {
    background: "linear-gradient(90.03deg, #4180FF 0.68%, #00256F 99.97%)"
  },
  50: {
    background: "linear-gradient(90.03deg, #4180FF 0.68%, #37006F 99.97%)"
  },
  100: {
    background: "linear-gradient(90.03deg, #4180FF 0.68%, #000A1D 99.97%)"
  }
};

const deletedIconStyle = {
  10: {
    height: "15px",
    background: "url('/images/deleteIcon.svg') no-repeat"
  },
  30: {
    height: "15px",
    background: "url('/images/deleteIconWhite.svg') no-repeat"
  },
  50: {
    height: "15px",
    background: "url('/images/deleteIconWhite.svg') no-repeat"
  },
  100: {
    height: "15px",
    background: "url('/images/deleteIconWhite.svg') no-repeat"
  }
};

const amountStyle = {
  10: {
    color: "#3c66ba"
  },
  30: {
    color: "white"
  },
  50: {
    color: "white"
  },
  100: {
    color: "white"
  }
};

const creditPrice = {
  10: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: "20px",
    letteSpacing: "0.08em"
  },
  30: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    letteSpacing: "0.08em"
  },
  50: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    letteSpacing: "0.08em"
  },
  100: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    letteSpacing: "0.08em"
  }
};
