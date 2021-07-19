import {
    CONTACT_SUCCESSFUL,
    CONTACT_FAIL,
    RESET_ERROR_CONTACT
} from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case CONTACT_SUCCESSFUL:
            return {
                ...state,
                loading: false
            }
        case RESET_ERROR_CONTACT:
            return {
                ...state,
                error: null
            }
        case CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default contactReducer;