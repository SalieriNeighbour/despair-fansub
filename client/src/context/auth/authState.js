import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    ADMIN_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        admin: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load admin
    const loadAdmin = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: ADMIN_LOADED, payload: res.data});
        } catch (err) {
            dispatch({ type: AUTH_ERROR, payload: err.data });
        } 
    };

    // Log in admin
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('api/auth', formData, config);
            dispatch ({ type: LOGIN_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.data });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            admin: state.admin,
            error: state.error,
            loadAdmin,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;