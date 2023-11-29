import { STUDENT_FEEDBACK_ACTION_TYPE } from "../actions-type";


const initialState={
    studentFeedback:[]
}


export const studentFeedbackReducer=(state=initialState,action)=>{
    switch(action.type){
        case STUDENT_FEEDBACK_ACTION_TYPE.GET_STUDENT_FEEDBACK:
            return{
                ...state,
                studentFeedback:action.payload

            }
            default:
                return state;
    }
}