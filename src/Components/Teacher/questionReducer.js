import { ADD_QUESTION, GET_QUESTION } from "./types";

const initialState = {
    questions : [],
    question : null,
}

export default function questionReducers (state = initialState, action){
    console.log(action)
    switch(action.type){
        case GET_QUESTION:
            return {
                ...state,
                questions : action.payload
            }
        default:
            return state;
    }
}