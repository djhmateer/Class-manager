import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL,
    CREATE_CURRICULUM,
    CREATE_CURRICULUM_SUCCESS,
    CREATE_CURRICULUM_FAIL,
    GET_SUBJECTS,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAIL,
    ADD_ASSIGNMENT,
    ADD_ASSIGNMENT_SUCCESS,
    ADD_ASSIGNMENT_FAIL,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAIL,
    DELETE_SUBJECT_SUCCESS
} from "./types";

export const getSubjects = () => (dispatch) => {
    dispatch({ type: GET_SUBJECTS })

    axios.get(`http://localhost:3001/api/curriculum/get-all`)
        .then(res => {
            dispatch({
                type: GET_SUBJECTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: GET_SUBJECTS_FAIL })
        })
}

export const createCurriculum = title => (dispatch) => {
    dispatch({ type: CREATE_CURRICULUM })

    axios.post(`http://localhost:3001/api/curriculum/new/${title}`)
        .then(res => {
            dispatch({
                type: CREATE_CURRICULUM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: CREATE_CURRICULUM_FAIL })
        })
}

export const addAssignment = (title, data) => (dispatch) => {
    const dataToSend = { data: data }
    dispatch({ type: ADD_ASSIGNMENT })
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.put(`http://localhost:3001/api/curriculum/add-assignment/${title}`, dataToSend, config)
        .then(res => {
            dispatch({
                type: ADD_ASSIGNMENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: ADD_ASSIGNMENT_FAIL })
        })
}

export const viewSubject = subject => (dispatch) => {
    axios.get(`http://localhost:3001/api/curriculum/view/${subject}`)
        .then(res => {
            dispatch({
                type: VIEW_CURRICULUM,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

export const editCurriculum = data => (dispatch) => {
    dispatch({ type: EDIT_CURRICULUM });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/curriculum/edit', data, config)
        .then(res => {
            dispatch({
                type: EDIT_CURRICULUM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EDIT_CURRICULUM_FAIL
            });
        });
};

export const deleteSubject = (id, title) => (dispatch) => {
    console.log(id)
    console.log(title)
    dispatch({ type: DELETE_SUBJECT })

    axios.put(`http://localhost:3001/api/curriculum/delete/${id}/${title}`)
        .then(res => {
            dispatch({
                type: DELETE_SUBJECT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: DELETE_SUBJECT_FAIL })
        })
}