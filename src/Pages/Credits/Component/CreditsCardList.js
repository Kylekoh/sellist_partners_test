import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import {
  saveCredit,
  headers,
  getCart,
  generateCredit
} from "../../../Config/urls";
import { useDispatch } from "react-redux";
import { addCart } from "../../../modules/CartModule";
import { addDataCart } from "../../../modules/CartDataModule";
import { buyCreditDirect } from "../../../modules/BuyDataModule";
import useFormModal from "../useFormModal";
import useForm from "../../CheckOut/useForm";

function CreditsCardList({ credits }) {
  const {
    id,
    packages,
    amount,
    krw,
    price,
    onePrice,
    cartText,
    addIcon,
    buyText,
    cartIcon,
    addedIcon
  } = credits;

  const { btnToggle, toggle } = useFormModal();
  const dispatch = useDispatch();
  const [cartType, setCartType] = useState("");
  const EMAIL = localStorage.getItem("email");
  const ACCESS_TOKEN = localStorage.getItem("access_token");

  //save credit
  const CREDIT = CREDITS_LIST[id - 1].amount;
  const PRICE = CREDITS_LIST[id - 1].price;
  const data = qs.stringify({ email: EMAIL, price: PRICE, credit: CREDIT });

  //서버에 변경된 credit 값을 update한다.
  const postCredits = async () => {
    await axios
      .post(saveCredit, data, {
        headers
      })
      .then(getData());
  };

  //카트 관련 스토어가 업데이트 되기 위함
  const getData = async () => {
    const { data } = await axios.get(getCart, {
      headers,
      params: {
        email: EMAIL,
        token: ACCESS_TOKEN
      }
    });
    dispatch(addDataCart(data.data.carts));
  };

  /*requestPay(결재 process) custom hook 호출을 위한 선언
  구매하기 Button을 누르면 buyCredit 함수가 호출되고 cartType 상태가 "" → 2로 update되고
  update되면서 외부에 선언된 useForm이 실행된다. 이후 setCartType("") 설정하여 다시 초기화 진행*/

  const requestPay = useForm(cartType);

  const buyCredits = () => {
    axios
      .post(generateCredit, data, {
        headers
      })
      .then(res => {
        if (res.data.success === 1) {
          dispatch(buyCreditDirect([res.data?.data]));
          setCartType(2);
          setCartType("");
        }
      });
  };

  const handleCartClick = () => {
    "이거 참고해보기";
    "https://stackoverflow.com/questions/58850699/useselector-not-updating-when-store-has-changed-in-reducer-reactjs-redux";
    console.log("이거 눌렸다");
    console.log(credits);
    dispatch(addCart(credits));
    btnToggle();
    postCredits();
  };

  return (
    <Card style={CardStyle[id]}>
      <Container>
        <HeaderWrap style={textWrap[id]}>
          <Package>{packages}</Package>
          <Credit id={id}>{amount} 포인트</Credit>
        </HeaderWrap>
        <PriceList>
          <PriceWrap style={priceWrap[id]}>
            <Krw>{krw}</Krw>
            <Money id={id}>{price.toLocaleString()}</Money>
          </PriceWrap>
          <CreditsPrice>{onePrice}</CreditsPrice>
        </PriceList>
        <ButtonWrap>
          {/* <CartBtn toggle={toggle} onClick={() => handleCartClick()}>
            <span>{toggle ? "추가" : cartText}</span>
            <img alt="/" src={toggle ? addedIcon : addIcon} />
          </CartBtn> */}
          <AddBtn onClick={() => buyCredits()}>
            <span>{buyText}</span>
            <img alt="/" src={cartIcon} />
          </AddBtn>
        </ButtonWrap>
      </Container>
    </Card>
  );
}

export default CreditsCardList;

const Card = styled.div`
  width: 220px;
  height: 270px;
  border: 7px solid white;
  border-radius: 12px;
  font-size: 12px;
  @media (max-width: 500px) {
    width: 160px;
    height: 210px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex("space-evenly", "center", "column")}
`;

const HeaderWrap = styled.div`
  ${({ theme }) => theme.flex("", "center", "column")}
`;

const Package = styled.span`
  font-size: 1em;
  font-weight: 300;
  color: #dee8ff;

  @media screen and (min-width: 1800px) {
    font-size: 1em;
  }
`;

const Credit = styled.span`
  text-align: center;
  font-size: 1.2em;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.08em;
  padding-top: 10px;
  color: ${({ id }) => id === 1 && "#3C66BA"};
  color: ${({ id }) => id === 2 && "white"};
  color: ${({ id }) => id === 3 && "white"};
  color: ${({ id }) => id === 4 && "white"};

  @media screen and (min-width: 1800px) {
    font-size: 1.3em;
  }
`;

const PriceList = styled.div`
  color: ${({ id }) => id === 1 && "#3C66BA"};
  color: ${({ id }) => id === 2 && "white"};
  color: ${({ id }) => id === 3 && "white"};
  color: ${({ id }) => id === 4 && "white"};
  ${({ theme }) => theme.flex("", "center", "column")}
`;

const PriceWrap = styled.div`
  ${({ theme }) => theme.flex("", "center", "")}
`;

const Krw = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #96a9cf;

  @media screen and (min-width: 1800px) {
    font-size: 1.6em;
  }
`;

const Money = styled.p`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: 0.08em;
  color: ${({ id }) => id === 2 && "white"};
  color: ${({ id }) => id === 3 && "white"};
  color: ${({ id }) => id === 4 && "white"};

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const CreditsPrice = styled.p`
  font-size: 11px;
  letter-spacing: 0.05em;
  line-height: 16px;
  color: white;

  @media (max-width: 500px) {
    font-size: 9px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex("", "center", "column")};
`;

const CartBtn = styled.button`
  width: 70%;
  height: 4vh;
  margin-bottom: 5%;
  padding: 0 10%;
  border-radius: 4px;
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  color: ${({ toggle }) => (toggle ? "green" : "#3c66ba")};
  ${({ theme }) => theme.flex("space-between", "center", "")};

  span {
    padding: 1rem 0;
    font-size: 16px;

    @media (max-width: 500px) {
      font-size: 7px;
      margin-right: 6px;
    }
  }
`;

const AddBtn = styled.div`
  width: 70%;
  height: 4vh;
  padding: 0 10%;
  border-radius: 4px;
  font-weight: bold;
  color: ${({ toggle }) => (toggle ? "green" : "#3c66ba")};
  background-color: white;
  cursor: pointer;
  ${({ theme }) => theme.flex("space-between", "center", "")};

  span {
    font-size: 16px;
    @media (max-width: 500px) {
      font-size: 7px;
    }
  }
`;

const CardStyle = {
  1: { background: "linear-gradient(180deg, #e4edff 0%, #6494ff 100%)" },
  2: { background: "linear-gradient(180deg, #4180FF 0%, #00256F 100%)" },
  3: { background: "linear-gradient(180deg, #4180FF 0%, #37006F 100%)" },
  4: { background: "linear-gradient(180deg, #4180FF 0%, #000A1D 100%)" }
};

const textWrap = {
  1: {
    marginTop: "12px"
  }
};

const priceWrap = {
  1: {
    marginBottom: "12px"
  }
};

const CREDITS_LIST = [
  {
    id: 1,
    amount: "10",
    price: "30000"
  },
  {
    id: 2,
    amount: "30",
    price: "60000"
  },
  {
    id: 3,
    amount: "50",
    price: "90000"
  },
  {
    id: 4,
    amount: "100",
    price: "150000"
  }
];
