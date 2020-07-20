import apiHelper from '../../helpers/apiHelper';
import { TEAMS_FAILURE, TEAMS_SUCCESS } from './actionTypes';

export const fetchTeams = () => (dispatch) => {
    return apiHelper.fetchTeams().then(response => {
        return response.json().then(data => {
            dispatch({
                type: TEAMS_SUCCESS,
                payload: data
            });
        });
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: TEAMS_FAILURE,
            error: 'Failed to load teams'
        });
    });
};