//액션 타입 정의

const SPONSOR_END_DATE = "DateRangePicker/SPONSOR_END_DATE";

//액션 생성 함수 정의

export const setSponsorEndDate = end => {
  return {
    type: SPONSOR_END_DATE,
    payload: end
  };
};

// 초기값 설정
const INITIAL_STATE = "";

// 리듀서

export default function sponsorEndDateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SPONSOR_END_DATE:
      return action.payload;
    default:
      return state;
  }
}
