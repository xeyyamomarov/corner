import { FULLED_CELLS_ACTION_TYPE } from "../actions-type";

export  const fulledCellsReducer = (state = { fulledCells: [] }, action) => {
    switch (action.type) {
      case FULLED_CELLS_ACTION_TYPE.GET_FULLED_CELLS:
        return {
          ...state,
          fulledCells: action.payload,
        };
    case FULLED_CELLS_ACTION_TYPE.UPDATE_FULLED_CELLS:
        return {
            ...state,
            fulledCells:state.fulledCells.map(cell=>cell._id===action.payload._id?action.payload:cell),
        };
      default:
        return state; 
    }
  };