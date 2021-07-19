import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    CONTACT_SUCCESSFUL,
    CONTACT_FAIL,
    RESET_ERROR_CONTACT
} from '../types';

const ContactState = props => {
    const initialState = {
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Post contact
    const postContact = async contactData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contact', contactData, config);
            dispatch({type: CONTACT_SUCCESSFUL, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: CONTACT_FAIL, payload: err.response.data});
        }
    };

    const resetErrorContact = async () => dispatch({type: RESET_ERROR_CONTACT, payload: null});

    return (
        <ContactContext.Provider 
        value={{
            loading: state.loading,
            error: state.error,
            postContact,
            resetErrorContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;