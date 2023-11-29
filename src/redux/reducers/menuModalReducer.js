import { MENU_M0DAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  menusModalData: {
    category: "",
    product: "",
    inprice: "",
    outprice: "",
    unitAmount: "",
  },
  menuOpenModal: false,
  menuModalLoading: false,
};

export const menuModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_M0DAL_ACTION_TYPE.GET_MENU_MODAL:
      return {
        ...state,
        menusModalData: action.payload.data,
        menuOpenModal: action.payload.openModal,
      };
    case MENU_M0DAL_ACTION_TYPE.MENU_OPEN_MODAL:
      return {
        ...state,
        menuOpenModal: action.payload,
      };
      case MENU_M0DAL_ACTION_TYPE.MENU_MODAL_LOADING:
        return{
            ...state,
            menuModalLoading:action.payload
        }
        default:
          return state;
  }
};
