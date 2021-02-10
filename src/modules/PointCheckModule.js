const CHECKPOINT = "CHECK_POINT";

export const isCheckPoint = point => {
  return {
    type: CHECKPOINT,
    payload: point
  };
};

export default function checkPointReducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case CHECKPOINT:
      return action.payload;
    default:
      return state;
  }
}
const INITAIL_STATE = false;
