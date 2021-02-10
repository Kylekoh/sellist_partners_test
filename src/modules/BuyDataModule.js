// 구매하기 버튼으로 낱개 구매하는 item의 상태관리

const BUY_DATA = "BUY_DATA";

export const buyCreditDirect = item => {
  return {
    type: BUY_DATA,
    payload: item
  };
};

export default function buyCreditReducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case BUY_DATA:
      return [action.payload];
    default:
      return state;
  }
}

const INITAIL_STATE = [];
