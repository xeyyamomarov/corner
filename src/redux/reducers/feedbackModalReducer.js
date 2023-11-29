import {  FEEDBACK_MODAL_ACTION_TYPE } from "../actions-type"

const initialState = {
    feedbackModalData:
     { student:"",
     teacher: "",
    feedback:""},
    feedbackOpenModal: false
}

export const feedbackModalReducer = (state=initialState, action) => {
    switch(action.type) {
        case FEEDBACK_MODAL_ACTION_TYPE.GET_FEEDBACK_MODAL:
            return {
                ...state,
                feedbackModalData: action.payload.data,
                feedbackOpenModal: action.payload.openModal
            }
        default:
            return state
    }
}