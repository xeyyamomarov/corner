import { MENU_ACTION_TYPE } from "../actions-type";

const initialState = {
  menus: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_ACTION_TYPE.GET_MENU:
      return {
        ...state,
        menus: action.payload,
      };
    case MENU_ACTION_TYPE.CREATE_MENU:
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };
    case MENU_ACTION_TYPE.UPDATE_MENU:
      return {
        ...state,
        menus: state.menus.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case MENU_ACTION_TYPE.DELETE_MENU:
      return {
        ...state,
        menus: state.menus.filter((item) => item._id !== action.payload),
      };
    case MENU_ACTION_TYPE.MENU_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MENU_ACTION_TYPE.GET_MENU_LAST_PAGE:
      return {
        ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
