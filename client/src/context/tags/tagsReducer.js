import {
    TAGS_LOADED,
    TAG_LOAD_FAIL,
    TAG_FOUND,
    TAG_NOT_FOUND,
    TAG_PRESET,
    SET_LOADING_TAG
} from '../types';

const tagsReducer = (state, action) => {
    switch (action.type) {
        case TAGS_LOADED:
            return {
                ...state,
                loading: false,
                tags: action.payload
            }
        case TAG_FOUND:
            return {
                ...state,
                loading: false,
                tag_info: action.payload
            }
        case TAG_PRESET:
            return {
                ...state,
                post_info: action.payload
            }
        case SET_LOADING_TAG:
            return {
                ...state,
                loading: true
            }
        case TAG_LOAD_FAIL:
        case TAG_NOT_FOUND:
            return {
                ...state,
                loading: false,
                tags: null,
                tags_info: null,
                error: action.payload
            }
        default:
            return state;
    }
};

export default tagsReducer;