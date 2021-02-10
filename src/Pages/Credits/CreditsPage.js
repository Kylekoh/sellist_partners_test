import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useFormModal from "./useFormModal";
import CartIcon from "../../Images/CartIcon";
import CreditsCard from "./Component/CreditsCard";
import CartModal from "./Component/CartModal";
import DeleteParentModal from "../Order/Components/DeleteParentModal";
import DeletedSnackBar from "../Order/Components/DeletedSnackBar";

function CreditsPage() {
  const { modalActive, openModal } = useFormModal();
  const cartDataItems = useSelector(store => store.cartDataReducer);
  const del = useSelector(store => store.deleteReducer);
  const deleted = useSelector(store => store.confirmDeleteReducer);
  const EMAIL = localStorage.getItem("email");
  const ACCESS_TOKEN = localStorage.getItem("access_token");

  if (!ACCESS_TOKEN && !EMAIL) {
    window.location.href = "/";
  } else {
    return (
      <Container>
        {modalActive && <CartModal hide={openModal} />}
        {del && <DeleteParentModal />}
        {deleted && <DeletedSnackBar />}
        <CreditsPageWrap>
          <Header>
            <span>포인트 충전</span>
            {/* <Cartcontainer>
              {cartDataItems[0][0]?.length >= 1 ? (
                <CartWrap onClick={openModal}>
                  <ItemCount>
                    <span>{cartDataItems[0][0]?.length}</span>
                  </ItemCount>
                  <IconWrap style={{ background: "#3C66BA" }}>
                    <CartIcon />
                  </IconWrap>
                </CartWrap>
              ) : (
                <IconWrap>
                  <CartIcon />
                </IconWrap>
              )}
            </Cartcontainer> */}
          </Header>
          <Main>
            <MainTitle>
              스폰서이벤트로 홍보되기 위해서는 하루에 10포인트가 필요합니다.
            </MainTitle>
          </Main>
          <Main>{/* <MainHeader>가격표</MainHeader> */}</Main>
          <CreditsCard />
        </CreditsPageWrap>
      </Container>
    );
  }
}
export default CreditsPage;
const Container = styled.main`
  ${({ theme }) => theme.container}
  @media (max-width: 500px) {
    padding: 0px;
    width: 100%;
    min-width: 0;
  }
`;
const CreditsPageWrap = styled.section`
  ${({ theme }) => theme.pageWrap}
  @media (max-width: 500px) {
    margin: 80px 0px 0px 0px;
  }
`;
const Header = styled.div`
  max-width: 1400px;
  ${({ theme }) => theme.flex("space-between", "center", "")}
  span {
    color: #96a9cf;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 130%;
    @media (max-width: 500px) {
      font-size: 28px;
      padding-left: 12px;
    }
  }
`;
const Cartcontainer = styled.div`
  @media (max-width: 500px) {
    padding-right: 15px;
  }
`;
const CartWrap = styled.div`
  ${({ theme }) => theme.flex("space-between", "center", "")}
`;
const ItemCount = styled.div`
  width: 45px;
  height: 35px;
  border-radius: 10px;
  background-color: #ee6352;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 40px;
    height: 30px;
  }
  cursor: pointer;
  span {
    font-weight: bold;
    font-size: 24px;
    color: white;
    @media (max-width: 500px) {
      font-size: 18px;
      padding-left: 0px;
    }
  }
`;
const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 5px;
  ${({ theme }) => theme.flex("center", "center", "")};
  @media (max-width: 500px) {
    width: 35px;
    height: 35px;
    font-size: 2px;
  }
  cursor: pointer;
`;
const Main = styled.div``;

const MainTitle = styled.div`
  margin: 50px 0px 100px 80px;
  font-size: 21px;
  line-height: 25px;
  font-weight: 500;
  color: #212121;
  @media (max-width: 500px) {
    margin: 50px 20px 20px 20px;
    font-weight: normal;
    font-size: 16px;
    word-break: break-word;
    white-space: initial;
  }
`;

const MainHeader = styled.div`
  margin: 120px 0px 0px 80px;
  font-style: normal;
  font-size: 20px;
  color: #96a9cf;
  @media (max-width: 500px) {
    margin: 120px 0px 0px 20px;
  }
`;
