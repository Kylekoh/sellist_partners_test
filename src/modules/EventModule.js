/*Actions*/
const UPCOMING = "Order/UPCOMING";
const ONGOING = "Order/ONGOING";
const PAST = "Order/PAST";
const DELETE_EVENT = "Order/DELETE_EVENT";
const CONFIRM_DELETE = "Order/CONFIRM_DELETE";
const PERM_LINK = "nav/PERM_LINK";

/*Action Creator*/
export const setUpcoming = upcoming_event => ({
  type: UPCOMING,
  payload: upcoming_event
});

export const setOngoing = ongoing_event => ({
  type: ONGOING,
  payload: ongoing_event
});

export const setPast = past_event => ({
  type: PAST,
  payload: past_event
});

export const setPerm = permlink => ({
  type: PERM_LINK,
  payload: permlink
});

export const setDelete = toggle => ({
  type: DELETE_EVENT,
  payload: toggle
});

export const confirmDelete = toggle => ({
  type: CONFIRM_DELETE,
  payload: toggle
});

/*Initial State*/
const initialState = [];

/*Reducer*/
export function upcomingReducer(state = initialState, action) {
  switch (action.type) {
    case UPCOMING:
      return [...state, action.payload];
    default:
      return state;
  }
}

export function ongoingReducer(state = initialState, action) {
  switch (action.type) {
    case ONGOING:
      return [...state, action.payload];
    default:
      return state;
  }
}

export function pastReducer(state = initialState, action) {
  switch (action.type) {
    case PAST:
      return [...state, action.payload];
    default:
      return state;
  }
}

export function deleteReducer(state = false, action) {
  switch (action.type) {
    case DELETE_EVENT:
      return !state;
    default:
      return state;
  }
}

export function confirmDeleteReducer(state = false, action) {
  switch (action.type) {
    case CONFIRM_DELETE:
      return !state;
    default:
      return state;
  }
}

export function permlinkReducer(state = null, action) {
  switch (action.type) {
    case PERM_LINK:
      return action.payload;
    default:
      return state;
  }
}
