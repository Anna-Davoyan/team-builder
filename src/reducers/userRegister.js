const INITIAL_STATE = {};
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {...state, userInfo: action.data};
        case "REGISTER_FAILURE":
            return {...state, error: action.hasError};
        default:
            return state
    }
}