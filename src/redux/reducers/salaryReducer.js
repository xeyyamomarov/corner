import { SALARY_ACTION_TYPE } from "../actions-type";

const initialState={
  salaryData:[],
  loading:false
}

export const salaryReducer = (state =initialState, action) => {
  switch (action.type) {
    case SALARY_ACTION_TYPE.GET_SALARY:
      return {
        ...state,
        salaryData: action.payload,
        loading:action.payload.loading
      };
      case SALARY_ACTION_TYPE.SALARY_LOADING:
        return{
          ...state,
          loading:action.payload
        }
    case SALARY_ACTION_TYPE.CLEAR_SALARY:
      return {
        ...state,
        salaryData: [],
      };
    default:
      return state;
  }
};
