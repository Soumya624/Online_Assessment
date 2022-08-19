import { combineReducers } from "redux";
import questionReducers from "../Components/Teacher/questionReducer";
import testReducer from "../Components/Teacher/testReducers";

export default combineReducers({
    tests : testReducer,
    questions : questionReducers
})