import React, { useReducer } from 'react';
import axios from 'axios';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    PROJECTS_LOADED,
    PROJECT_LOAD_FAIL,
    PROJECT_FOUND,
    PROJECT_NOT_FOUND,
    PROJECT_EDITED,
    PROJECT_EDIT_FAIL,
    PROJECT_DELETED,
    PROJECT_DELETE_FAIL,
    RESET_ERROR_PROJECT,
    PROJECT_POST_FAIL,
    PROJECT_POST_SUCCESSFUL,
    PROJECT_PRESET
} from '../types';

const ProjectState = props => {
    const initialState = {
        projects: null,
        project_info: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Load projects
    const loadProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            dispatch({type: PROJECTS_LOADED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: PROJECT_LOAD_FAIL, payload: err.data})
        }
    };

    // Load specific project
    const loadProject = async project_id => {
        try {
            const res = await axios.get(`/api/projects/${project_id}`);
            dispatch({type: PROJECT_FOUND, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: PROJECT_NOT_FOUND, payload: err.data});
        }
    };

    // Post project
    const postProject = async projectData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/projects', projectData, config);
            dispatch({type: PROJECT_POST_SUCCESSFUL, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: PROJECT_POST_FAIL, payload: err.response.data});
        }
    };

    // Edit project
    const editProject = async (projectData, project_id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        try {
            const res = await axios.put(`/api/projects/${project_id}`, projectData, config);
            dispatch({type: PROJECT_EDITED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: PROJECT_EDIT_FAIL, payload: err.response.data});
        }
    }

    // Delete project
    const deleteProject = async project_id => {
        try {
            const res = await axios.delete(`api/projects/${project_id}`);
            dispatch({type: PROJECT_DELETED, payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: PROJECT_DELETE_FAIL, payload: err.data});
        }
    };

    const resetError = async () => dispatch({type: RESET_ERROR_PROJECT, payload: null});

    const preSetProjectInfo = async project_data => dispatch({type: PROJECT_PRESET, payload: project_data});

    return (
        <ProjectContext.Provider 
        value={{
            projects: state.projects,
            project_info: state.project_info,
            loading: state.loading,
            error: state.error,
            loadProjects,
            loadProject,
            postProject,
            editProject,
            deleteProject,
            resetError,
            preSetProjectInfo
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
};

export default ProjectState;