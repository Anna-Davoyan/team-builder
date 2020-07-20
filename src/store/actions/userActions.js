import { LOGOUT, UPDATE_FAILURE, UPDATE_SUCCESS, USER_FETCHED } from './actionTypes';
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
        console.log(response);
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


const actionUserFetched = (user) => ({
    type: USER_FETCHED,
    payload: user
});
