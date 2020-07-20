import apiHelper from '../../helpers/apiHelper';
import {
    FETCH_PROJECTS_FAILURE,
    FETCH_PROJECTS_SUCCESS,
    PROJECT_VOTED_FAILURE,
    PROJECT_VOTED_SUCCESS
} from './actionTypes';

export const fetchProjects = () => (dispatch) => {
    return apiHelper.fetchProjects().then(response => {
        return response.json().then(data => {
            dispatch({
                type: FETCH_PROJECTS_SUCCESS,
                payload: data
            });
        });
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: FETCH_PROJECTS_FAILURE,
            error: 'Failed to load projects'
        });
    });
};

export const projectVotedUnVoted = (data) => (dispatch) => {
    return apiHelper.projectVotedUnVoted(data).then(response => {
        if (response.status !== 200) {
            dispatch({
                type: PROJECT_VOTED_FAILURE,
                error: 'Something went wrong'
            });
            return null;

        }
        return response.json().then(responseData => {
            dispatch({
                type: PROJECT_VOTED_SUCCESS,
                payload: responseData
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });
};