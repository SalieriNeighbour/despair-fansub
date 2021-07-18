import React, { useReducer } from 'react';
import axios from 'axios';
import TagsContext from './tagsContext';
import tagsReducer from './tagsReducer';
import {
    TAGS_LOADED,
    TAG_LOAD_FAIL,
    TAG_FOUND,
    TAG_NOT_FOUND,
    TAG_PRESET,
    SET_LOADING_TAG
} from '../types';

const TagsState = props => {
    const initialState = {
        tags: null,
        tag_info: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(tagsReducer, initialState);

    // Load tags
    const loadTags = async () => {
        try {
            const res = await axios.get('/api/tags');
            dispatch({type: TAGS_LOADED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: TAG_LOAD_FAIL, payload: err.data})
        }
    };

    // Load specific tag
    const loadTag = async tag_id => {
        try {
            const res = await axios.get(`/api/tags/${tag_id}`);
            dispatch({type: TAG_FOUND, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: TAG_NOT_FOUND, payload: err.data});
        }
    };

    const preSetTagInfo = async tag_data => dispatch({type: TAG_PRESET, payload: tag_data});

    const setLoading = async () => dispatch({type: SET_LOADING_TAG, payload: null});

    return (
        <TagsContext.Provider 
        value={{
            tags: state.tags,
            tag_info: state.tag_info,
            loading: state.loading,
            error: state.error,
            loadTags,
            loadTag,
            preSetTagInfo,
            setLoading
        }}>
            {props.children}
        </TagsContext.Provider>
    )
}

export default TagsState;