import {
    FETCH_PROJECTS_FAILURE,
    FETCH_PROJECTS_SUCCESS,
    PROJECT_VOTED_FAILURE,
    PROJECT_VOTED_SUCCESS
} from '../actions/actionTypes';


const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload, error: undefined };
        case FETCH_PROJECTS_FAILURE:
            return { ...state, error: action.error, projects: [] };
        case PROJECT_VOTED_SUCCESS:
            const projects = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    project.votedByMe = !project.votedByMe;
                    return project;
                }
                return project;
            });
            return { ...state, projects: projects };
        case PROJECT_VOTED_FAILURE:
            return { ...state, error: action.error };

        default:
            return state;
    }
}