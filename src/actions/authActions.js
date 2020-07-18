import {BASE_URL} from "../helpers/constants";

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

export const fetchCompanies = (history) => (dispatch) => {
    return fetch(BASE_URL + '/api/v1/companies').then(response => {
        return response.json()
    }).then((data) => {
        dispatch({
            type: 'COMPANIES_SUCCESS',
            data
        })
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: 'COMPANIES_FAILURE',
            hasError: true
        })
    });
};

export function fetchRegisterUserDataSuccess(data) {
    return {
        type: 'REGISTER_SUCCESS',
        data
    };
}


export function registerUserHaveError(error) {
    return {
        type: 'REGISTER_FAILURE',
        hasError: error
    };
}
