const INITIAL_STATE = {};
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "COMPANIES_SUCCESS":
            return {...state, companies: action.data};
        case "COMPANIES_FAILURE":
            return {...state, error: action.hasError};
        default:
            return state
    }
}