import {
    POSTS_LOADED,
    POST_LOAD_FAIL,
    POST_SUCCESSFUL,
    POST_FAIL,
    POST_FOUND,
    POST_NOT_FOUND,
    SET_LOADING,
    POST_PRESET,
    POST_EDITED,
    POST_EDIT_FAIL,
    POST_DELETED,
    POST_DELETE_FAIL,
    RESET_ERROR
} from '../types';

const postReducer = (state, action) => {
    switch (action.type) {
        case POSTS_LOADED:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case POST_EDITED:
        case POST_SUCCESSFUL:
            return {
                ...state,
                loading: false
            }
        case POST_FOUND:
            return {
                ...state,
                loading: false,
                post_info: action.payload
            }
        case POST_DELETED:
            return {
                ...state,
                loading: false,
                post_info: null
            }
        case POST_PRESET:
            return {
                ...state,
                post_info: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case RESET_ERROR:
            return {
                ...state,
                error: null
            }
        case POST_LOAD_FAIL:
        case POST_FAIL:
        case POST_EDIT_FAIL:
        case POST_NOT_FOUND:
        case POST_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                posts: null,
                post_info: null,
                error: action.payload
            }
        default:
            return state;
    }
};

export default postReducer;