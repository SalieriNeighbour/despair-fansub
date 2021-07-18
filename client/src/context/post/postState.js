import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
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

const PostState = props => {
    const initialState = {
        posts: null,
        post_info: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(postReducer, initialState);

    // Load posts
    const loadPosts = async () => {
        try {
            const res = await axios.get('/api/post');
            dispatch({type: POSTS_LOADED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: POST_LOAD_FAIL, payload: err.data})
        }
    };

    // Load specific post
    const loadPost = async post_id => {
        try {
            const res = await axios.get(`/api/post/${post_id}`);
            dispatch({type: POST_FOUND, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: POST_NOT_FOUND, payload: err.data});
        }
    };

    // Post a post
    const postPost = async postData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/post', postData, config);
            dispatch({type: POST_SUCCESSFUL, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: POST_FAIL, payload: err.response.data});
        }
    };

    // Edit post
    const editPost = async (postData, post_id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        try {
            const res = await axios.put(`/api/post/${post_id}`, postData, config);
            dispatch({type: POST_EDITED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: POST_EDIT_FAIL, payload: err.response.data});
        }
    }

    // Delete post
    const deletePost = async post_id => {
        try {
            const res = await axios.delete(`api/post/${post_id}`);
            dispatch({type: POST_DELETED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: POST_DELETE_FAIL, payload: err.data});
        }
    };

    const preSetPostInfo = async post_data => dispatch({type: POST_PRESET, payload: post_data});

    const setLoading = async () => dispatch({type: SET_LOADING, payload: null});

    const resetError = async () => dispatch({type: RESET_ERROR, payload: null});

    return (
        <PostContext.Provider 
        value={{
            posts: state.posts,
            post_info: state.post_info,
            loading: state.loading,
            error: state.error,
            loadPosts,
            loadPost,
            postPost,
            setLoading,
            resetError,
            preSetPostInfo,
            editPost,
            deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState;