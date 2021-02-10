export const addDataCart = item => {
  return {
    type: "ADD_DATA",
    payload: item
  };
};

export const deleteDataCart = items => {
  return {
    type: "DELETE_DATA",
    payload: items
  };
};

// 여기서 스토어 저장되는 배열의 깊이가 깊어지면서
// 가격표에서 '카트에 담기'를 눌렀을 때 첫시도 때 제대로 업데이트가 안되는거 같음
// 추후 확인 필요(키워드 : shallowEqual, 얖은비교 / 리액트 렌데링 최적화 / useMemo, useCallback )
export default function cartDataReducer(state = [], action) {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, 0: [action.payload] };
    // return [...state, action.payload];
    case "DELETE_DATA":
      return { 0: [action.payload] };

    default:
      return state;
  }
}
