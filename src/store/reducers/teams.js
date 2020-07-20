import { TEAMS_FAILURE, TEAMS_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TEAMS_SUCCESS:
            return { ...state, teams: action.payload, error: undefined };
        case TEAMS_FAILURE:
            return { ...state, error: action.error, projects: [] };

        default:
            return state;
    }

}