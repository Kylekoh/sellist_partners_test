/*Actions*/
const ADD_NEXT = "ADD_NEXT";
const TOOLTIP_TOGGLE = "TOOLTIP_TOGGLE";

/*Action Creator*/
export const addNext = next => {
  return {
    type: "ADD_NEXT",
    payload: next
  };
};

export const setTooltipToggle = toggle => {
  return {
    type: TOOLTIP_TOGGLE,
    payload: toggle
  };
};

export function nextReducer(state = 1, action) {
  switch (action.type) {
    case "ADD_NEXT":
      return action.payload;
    default:
      return state;
  }
}

/* toggle state 설정을 위한 함수, 최초 로그인한 user일 경우에만 toggle item을 localstorage에 저장한다. */
export function toggleState() {
  return localStorage.getItem("toggle") === "false" ? true : false;
}

/*Initial State*/
const initialState = false;

export function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case "TOOLTIP_TOGGLE":
      return action.payload;
    default:
      return state;
  }
}
