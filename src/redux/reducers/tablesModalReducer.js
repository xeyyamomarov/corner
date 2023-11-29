import { TABLES_M0DAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  tablesModalData: {
    category: "",
    deposit: "",
    oneMinutePrice: "",
    tableNumber: "",
  },
  tablesOpenModal: false,
  tablesModalLoading:false
};

export const tablesModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TABLES_M0DAL_ACTION_TYPE.GET_TABLES_MODAL:
      return {
        ...state,
        tablesModalData: action.payload.data,
        tablesOpenModal: action.payload.openModal,
      };
    case TABLES_M0DAL_ACTION_TYPE.TABLES_OPEN_MODAL:
      return {
        ...state,
        tablesOpenModal: action.payload,
      };
      case TABLES_M0DAL_ACTION_TYPE.TABLES_MODAL_LOADING:
        return{
          ...state,
          tablesModalLoading:action.payload
        }

    default:
      return state;
  }
};
