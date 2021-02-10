const ADD_EMAIL = "Login/ADD_EMAIL";

export const addAccessToken = token => {
  return {
    type: "ADD_ACCESSTOKEN",
    payload: token
  };
};

export const addEmail = email => {
  return {
    type: ADD_EMAIL,
    payload: email
  };
};

const INITIAL_STATE = "";

export function accessTokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_ACCESSTOKEN":
      return action.payload;
    default:
      return state;
  }
}
export function emailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_EMAIL:
      return action.payload;
    default:
      return state;
  }
}
