import { WAREHOUSE_M0DAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  warehouseModalData: {
    category: "",
    product: "",
    amount: "",
  },
  warehouseOpenModal: false,
  warehouseModalLoading: false,
};

export const warehouseModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case WAREHOUSE_M0DAL_ACTION_TYPE.GET_WAREHOUSE_MODAL:
      return {
        ...state,
        warehouseModalData: action.payload.data,
        warehouseOpenModal: action.payload.openModal,
      };
    case WAREHOUSE_M0DAL_ACTION_TYPE.WAREHOUSE_OPEN_MODAL:
      return {
        ...state,
        warehouseOpenModal: action.payload,
      };
    case WAREHOUSE_M0DAL_ACTION_TYPE.WAREHOUSE_MODAL_LOADING:
      return {
        ...state,
        warehouseModalLoading: action.payload,
      };
      default:
        return state;
  }
};
