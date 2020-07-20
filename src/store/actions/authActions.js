import {LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE} from "./actionTypes";
import apiHelper from "../../helpers/apiHelper";

export const registerUser = (data, history) => (dispatch) => {
    return apiHelper.registerUser(data).then(response => {
        response.text().then((data) => {
            if (response.status !== 200) {
                dispatch({
                    type: REGISTER_FAILURE,
                    error: data
                })
            } else {
                history.push("/auth/login")
            }
        });
        return data;
    })
        .catch((error) => {
            console.error(error);
        });
};

export const userLogin = (userData, rememberToken) => dispatch => {

    return apiHelper.userLogin(userData).then(response => {

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


