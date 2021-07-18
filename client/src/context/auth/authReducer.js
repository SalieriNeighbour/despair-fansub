import {
    ADMIN_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                admin: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                admin: null,
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;