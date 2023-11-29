import { WAREHOUSE_ACTION_TYPE } from "../actions-type";

const initialState = {
  warehouses: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case WAREHOUSE_ACTION_TYPE.GET_WAREHOUSE:
      return {
        ...state,
        warehouses: action.payload,
      };
    case WAREHOUSE_ACTION_TYPE.CREATE_WAREHOUSE:
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
      };
    case WAREHOUSE_ACTION_TYPE.UPDATE_WAREHOUSE:
      return {
        ...state,
        warehouses: state.warehouses.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case WAREHOUSE_ACTION_TYPE.DELETE_WAREHOUSE:
      return {
        ...state,
        warehouses: state.warehouses.filter(
          (item) => item.id !== action.payload
        ),
      };
    case WAREHOUSE_ACTION_TYPE.WAREHOUSE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case WAREHOUSE_ACTION_TYPE.GET_WAREHOUSE_LAST_PAGE:
      return {
        ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
