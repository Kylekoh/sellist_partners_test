const CONTROL_MODAL = "CONTROL_MODAL";

export const controlModal = open => {
  return {
    type: CONTROL_MODAL,
    payload: open
  };
};

const INITIAL_STATE = "";

export function controlModalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONTROL_MODAL:
      return action.payload;
    default:
      return state;
  }
}
