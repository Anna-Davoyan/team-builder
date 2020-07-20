import { LOGOUT, UPDATE_FAILURE, UPDATE_SUCCESS, USER_FETCHED, USER_UPDATED } from '../actions/actionTypes';

const INITIAL_STATE = {};
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_FETCHED:
        case USER_UPDATED:
            return { ...state, userData: action.payload };

        case UPDATE_SUCCESS:
            return { ...state, userData: action.payload, error: '' };
        case UPDATE_FAILURE:
            console.log(action.error);
            return { ...state, error: action.error };

        case LOGOUT:
            const newState = { ...state };
            delete newState.userData;
            return newState;
        default:
            return state;
    }
}