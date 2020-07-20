import { LOGOUT, UPDATE_FAILURE, UPDATE_SUCCESS, USER_FETCHED } from './actionTypes';
import apiHelper from '../../helpers/apiHelper';

export const fetchUser = () => (dispatch) => {
    return apiHelper.fetchUser().then(response => {
        if (response.status === 200) {
            return response.json().then((user) => {
                dispatch({
                    type: USER_FETCHED,
                    payload: user
                });
            });
        } else {
            logout()(dispatch);
        }
    });
};

export const updateUser = (userData) => (dispatch) => {
    return apiHelper.updateUser(userData).then(response => {
        if (response.status !== 200) {
            return response.text().then(error => {
                dispatch({
                    type: UPDATE_FAILURE,
                    error: error
                });
                return error;
            });

        }
        return response.json().then(responseData => {
            dispatch({
                type: UPDATE_SUCCESS,
                payload: responseData
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });


};

export const logout = () => (dispatch) => {
    localStorage.clear();
    sessionStorage.clear();

    return dispatch({
        type: LOGOUT
    });
};


