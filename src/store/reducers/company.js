import { COMPANIES_FAILURE, COMPANIES_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {};
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COMPANIES_SUCCESS:
            return { ...state, companies: action.data };
        case COMPANIES_FAILURE:
            return { ...state, error: action.error };
        default:
            return state;
    }
}