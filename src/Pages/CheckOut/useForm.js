import axios from "axios";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { useSelector } from "react-redux";
import { headers, buyCredit, deleteMultiCart } from "../../Config/urls";

const EMAIL = localStorage.getItem("email");

// CartType: 1, 정상적으로 구매가 진행되면 포인트 차감 진행
const postCartCredits = async cartDataItems => {
  const getCash = cartDataItems[0]?.[0]?.map(list => list.credit_cash);
  const getCredit = cartDataItems[0]?.[0]?.map(list => list.credit_amount);
  const data = qs.stringify({
    email: EMAIL,
    price: getCash,
    credit: getCredit
  });
  await axios.post(buyCredit, data, {
    headers
  });
};

// 정상적으로 구매가 진행되면 장바구니에 담긴 Item 삭제
const deleteMultiCredit = async cartDataItems => {
  const userCartId = cartDataItems[0]?.[0]?.map(list => list.cart_id);
  const convertUserId = String(userCartId);
  const deleteData = { email: EMAIL, cart_ids: convertUserId };
  await axios.delete(deleteMultiCart, {
    headers,
    params: deleteData
  });
};

// CartType:2, 정상적으로 구매가 진행되면 포인트 차감 진행
const postDirectBuyCredits = async buyItem => {
  const getCash = buyItem[0]?.[0]["credit_cash"];
  const getCredit = buyItem[0]?.[0]["credit_amount"];
  const cartId = buyItem[0]?.[0]["cart_id"];
  const data = qs.stringify({
    email: EMAIL,
    price: getCash,
    credit: getCredit,
    from_cart: 1,
    cart_id: cartId
  });
  await axios.post(buyCredit, data, {
    headers
  });
};

/* 전달 받은 cartType 숫자에 따라 결재 process가 구분된다.
1: 장바구니에 담긴 상품을 구매할 경우 -> 개별 item의 합계를 구하고 결재를 진행한다.
2: 바로 구매하기 버튼으로 상품을 구매할 경우 -> 최근에 담긴 store item을 확인하여 낱개 item의 결재를 진행한다.
*/
const useForm = cartType => {
  const history = useHistory();
  const cartDataItems = useSelector(store => store.cartDataReducer);
  const buyItem = useSelector(store => store.buyCreditReducer);
  const IMP = window.IMP;
  IMP.init("imp45750210");

  if (cartType === 1) {
    const totalPrice = cartDataItems[0]?.[0].reduce((acc, cur) => {
      return (acc += cur.credit_cash);
    }, 0);
    const totalCredit = cartDataItems[0]?.[0].reduce((acc, cur) => {
      return (acc += cur.credit_amount);
    }, 0);
    const cartEmail = cartDataItems[0]?.[0]?.map(list => list.credit_user);
    const cartId = cartDataItems[0]?.[0]?.map(list => list.cart_id);
    const convertCartId = String(cartId);
    const convertCartEmail = String(cartEmail[0]);
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: "card",
        merchant_uid: convertCartId,
        name: `${totalCredit} 포인트`,
        amount: totalPrice,
        buyer_email: convertCartEmail
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg && history.push("/ThankYou");
          deleteMultiCredit(cartDataItems);
          postCartCredits(cartDataItems);
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  }
  if (cartType === 2) {
    const totalPrice = buyItem[0]?.[0]["credit_cash"];
    const totalCredit = buyItem[0]?.[0]["credit_amount"];
    const cartEmail = buyItem[0]?.[0]["email"];
    const cartId = buyItem[0]?.[0]["cart_id"];
    const convertCartId = String(cartId);
    const convertCartEmail = String(cartEmail);
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: "card",
        merchant_uid: convertCartId,
        name: `${totalCredit} 포인트`,
        amount: totalPrice,
        buyer_email: convertCartEmail
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg && history.push("/ThankYou");
          postDirectBuyCredits(buyItem);
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  }
};
export default useForm;
