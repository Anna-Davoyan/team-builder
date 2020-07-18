import {combineReducers} from 'redux';
import UserRegister from "./userRegister"
import company from "./company"

const rootReducer = combineReducers({
    userRegister:UserRegister,
    companies:company,
});

export default rootReducer;