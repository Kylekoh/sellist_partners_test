/*Actions*/
const USERNAME = "RightSide/USERNAME";
const EVENT_NAME = "RightSide/EVENT_NAME";
const EVENT_URL = "RightSide/URL";
const SHOPPING_URL = "RightSide/URL2";
const ORIGINAL_PRICE = "RightSide/Price1";
const NEW_PRICE = "RightSide/Price2";
const EVENT_CATEGORY = "RightSide/EVENT_CATEGORY";
const USER_IMAGE = "RightSide/USER_IMAGE";
const EVENT_IMG = "RightSide/EVENT_IMG";
const EVENT_DURATION_START = "RightSide/EVENT_DURATION_START";
const EVENT_DURATION_END = "RightSide/EVENT_DURATION_END";
const DELETE_PROFILE_IMG = "RightSide/DELETE_PROFILE_IMG";
const DELETE_EVENT_IMG = "RightSide/DELETE_EVENT_IMG";
const NOT_ENOUGH = "AfterSelectDate/NOT_ENOUGH";

/*Action Creator*/
export const setUsername = username => ({
  type: USERNAME,
  payload: username
});

export const setEventName = eventname => ({
  type: EVENT_NAME,
  payload: eventname
});

export const setEventUrl = eventurl => ({
  type: EVENT_URL,
  payload: eventurl
});

export const setShoppingUrl = shoppingurl => ({
  type: SHOPPING_URL,
  payload: shoppingurl
});

export const setOriginalPrice = originalprice => ({
  type: ORIGINAL_PRICE,
  payload: originalprice
});

export const setNewPrice = newprice => ({
  type: NEW_PRICE,
  payload: newprice
});

export const setNotEnough = notenough => ({
  type: NOT_ENOUGH,
  payload: notenough
});

export const setSalesDurationStart = salesstart => ({
  type: EVENT_DURATION_START,
  payload: salesstart
});

export const setSalesDurationEnd = salesend => ({
  type: EVENT_DURATION_END,
  payload: salesend
});

export const setEventCategory = eventcategory => ({
  type: EVENT_CATEGORY,
  payload: eventcategory
});

export const setUserImage = userImage => ({
  type: USER_IMAGE,
  payload: userImage
});

export const setEventImg = eventimg => ({
  type: EVENT_IMG,
  payload: eventimg
});

export const deleteProfileImg = x => ({
  type: DELETE_PROFILE_IMG,
  payload: x
});

export const deleteEventImg = x => ({
  type: DELETE_EVENT_IMG,
  payload: x
});

/*Initial State*/
const initialState = "";

/*Reducer*/
export function usernameReducer(state = initialState, action) {
  switch (action.type) {
    case USERNAME:
      return action.payload;
    default:
      return state;
  }
}

export function eventnameReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_NAME:
      return action.payload;
    default:
      return state;
  }
}

export function eventurlReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_URL:
      return action.payload;
    default:
      return state;
  }
}

export function shoppingurlReducer(state = initialState, action) {
  switch (action.type) {
    case SHOPPING_URL:
      return action.payload;
    default:
      return state;
  }
}

export function originalpriceReducer(state = initialState, action) {
  switch (action.type) {
    case ORIGINAL_PRICE:
      return action.payload;
    default:
      return state;
  }
}

export function newpriceReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PRICE:
      return action.payload;
    default:
      return state;
  }
}

export function durationStartReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_DURATION_START:
      return action.payload;
    default:
      return state;
  }
}

export function durationEndReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_DURATION_END:
      return action.payload;
    default:
      return state;
  }
}

export function eventcategoryReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

export function profileimgReducer(state = "", action) {
  switch (action.type) {
    case USER_IMAGE:
      return action.payload;
    case DELETE_PROFILE_IMG:
      return state;
    default:
      return state;
  }
}

export function eventimgReducer(state = "", action) {
  switch (action.type) {
    case EVENT_IMG:
      return action.payload;
    case DELETE_EVENT_IMG:
      return state;
    default:
      return state;
  }
}

export function notenoughReducer(state = false, action) {
  switch (action.type) {
    case NOT_ENOUGH:
      return action.payload;
    default:
      return state;
  }
}
