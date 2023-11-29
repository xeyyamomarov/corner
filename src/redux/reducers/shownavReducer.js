import { SHOWNAV_ACTION_TYPE } from "../actions-type";

export const shownavReducer=(state={show:false},action)=>{
    switch(action.type){
        case SHOWNAV_ACTION_TYPE.SHOW:
            return{
                show:action.payload
            }
            default:
                return state;
    }
}