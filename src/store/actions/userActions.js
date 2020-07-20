import { UPDATE_FAILURE, UPDATE_SUCCESS, LOGOUT, USER_FETCHED } from './actionTypes';
import apiHelper from '../../helpers/apiHelper';

export const fetchUser = () => (dispatch) => {
    return apiHelper.fetchUser().then(response => {
        if (response.status === 200) {
            return response.json().then((user) => {
                dispatch(actionUserFetched(user));
            });
        } else {
            logout()(dispatch);
        }
    });
};

export const updateUser = (userData) => (dispatch) => {
    return apiHelper.updateUser(userData).then(response => {
        if (response.status !== 200) {
            dispatch({
                type: UPDATE_FAILURE,
                error: 'Incorrect email or password'
            });
            return null;
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

    return dispatch(actionLogout());
};


const actionUserFetched = (user) => ({
    type: USER_FETCHED,
    payload: user
});

const actionLogout = () => ({
    type: LOGOUT
});