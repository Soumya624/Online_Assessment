import { ADD_QUESTION, ADD_TEST, GET_TEST, GET_TESTS } from "./types";

const initialState = {
    tests : [],
    test : {
        questions : []
    },
}

export default function testReducer (state = initialState, action){
    switch(action.type){
        case GET_TESTS : 
            return{
                tests : action.payload
            }
        case GET_TEST : {
            return {
                test : action.payload
            }
        }
        case ADD_TEST:
            // state.test.questions.push(action.payload)
            return{
                ...state,
                test : {
                    ...state.test,
                    questions : [
                        ...state.test.questions,action.payload]
                }
            }
        default:
            return state;
    }
}