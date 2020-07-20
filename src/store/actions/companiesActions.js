import { BASE_URL } from '../../helpers/constants';
import { COMPANIES_FAILURE, COMPANIES_SUCCESS } from './actionTypes';

export const fetchCompanies = () => (dispatch) => {
    return fetch(BASE_URL + '/api/v1/companies').then(response => {
        return response.json().then((data) => {
            dispatch({
                type: COMPANIES_SUCCESS,
                data
            });
        });
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: COMPANIES_FAILURE,
            error: 'Failed to load companies'
        });
    });
};