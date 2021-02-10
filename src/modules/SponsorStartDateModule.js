//액션 타입 정의
const SPONSOR_START_DATE = "DateRangePicker/SPONSOR_START_DATE";

//액션 생성 함수 정의
export const setSponsorStartDate = start => {
  return {
    type: SPONSOR_START_DATE,
    payload: start
  };
};

// 초기값 설정
const INITIAL_STATE = "";

// 리듀서
export default function sponsorStartDateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SPONSOR_START_DATE:
      return action.payload;
    default:
      return state;
  }
}
