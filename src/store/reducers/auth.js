import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {};
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, userInfo: action.data, loginError: undefined };
        case LOGIN_FAILURE:
            return { ...state, loginError: action.error, userInfo: undefined };

        case REGISTER_SUCCESS:
            return { ...state, userInfo: action.data, registerError: undefined };
        case REGISTER_FAILURE:
            return { ...state, registerError: action.error, userInfo: undefined };

        default:
            return state;
    }
}