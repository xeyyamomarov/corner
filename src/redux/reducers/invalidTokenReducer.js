import { INVALID_TOKEN_ACTION_TYPE } from "../actions-type";

const initialState={
    errorToken:false,

}


export const invalidTokenReducer = (state=initialState,action)=>{
    switch(action.type){
        case INVALID_TOKEN_ACTION_TYPE.GET_INVALID_TOKEN:
        return{
            ...state,

           errorToken:action.payload
        }
        default:
            return state;
    }
   
}