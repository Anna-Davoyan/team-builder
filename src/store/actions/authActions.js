import {BASE_URL} from "../../helpers/constants";
import {LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS} from "./actionTypes";
import apiHelper from "../../helpers/apiHelper";

export const registerUser = (data, history) => (dispatch) => {

    fetch(BASE_URL + '/api/v1/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.text().then((data) => {
                if (response.status !== 200) {
                    dispatch(registerUserHaveError(data))
                } else {
                    history.push("/auth/login")
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });

};

export const userLogin = (userData, rememberToken) => dispatch => {
    return fetch(BASE_URL + '/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(response => {

        if (response.status !== 200) {
            dispatch({
                type: LOGIN_FAILURE,
                error: "Incorrect email or password"
            });
            return null;
        }

        return response.json().then(responseData => {
            if (rememberToken) {
                window.localStorage.setItem('token', responseData.token);
            } else {
                window.sessionStorage.setItem('token', responseData.token);
            }
            apiHelper.setToken(responseData.token);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: responseData
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });
};


export function fetchRegisterUserDataSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        data
    };
}


export function registerUserHaveError(error) {
    return {
        type: REGISTER_FAILURE,
        error: error
    };
}
