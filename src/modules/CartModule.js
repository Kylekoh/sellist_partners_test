export const addCart = item => {
  return {
    type: "ADD_ITEM",
    payload: item
  };
};

export const deleteCart = items => {
  return {
    type: "DELETE_ITEM",
    payload: items
  };
};

export default function cartReducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "DELETE_ITEM":
      return [...action.payload];
    default:
      return state;
  }
}
const INITAIL_STATE = [];
