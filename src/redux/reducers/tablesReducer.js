import { TABLES_ACTION_TYPE } from "../actions-type";

const initialState = {
  tables: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TABLES_ACTION_TYPE.GET_TABLES:
      return {
        ...state,
        tables: action.payload,
      };
    case TABLES_ACTION_TYPE.CREATE_TABLES:
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case TABLES_ACTION_TYPE.DELETE_TABLES:
      return {
        ...state,
        tables: state.tables.filter((item) => item._id !== action.payload),
      };
    case TABLES_ACTION_TYPE.UPDATE_TABLES:
      return {
        ...state,
        tables: state.tables.map((item) => item._id === action.payload._id ? action.payload:item),
      };
    case TABLES_ACTION_TYPE.TABLES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case TABLES_ACTION_TYPE.GET_TABLES_LAST_PAGE:
        return{
          lastPage:action.payload
        }

    default:
      return state;
  }
};
