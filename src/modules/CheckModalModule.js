const OPEN_MODAL = "OPEN_MODAL";

export const openModal = isOpen => {
  return {
    type: OPEN_MODAL,
    payload: isOpen
  };
};

export function checkModalReducer(state = false, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    default:
      return state;
  }
}
