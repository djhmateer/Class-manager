import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT,
    VIEW_STUDENT_SUBJECT,
    VIEW_STUDENT_SUBJECT_SUCCESS,
    VIEW_STUDENT_SUBJECT_FAIL,
    GET_STUDENTS,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_FAIL,
    DELETE_STUDENT,
} from "./types";

export const addStudent = data => (dispatch) => {
    dispatch({ type: ADD_STUDENT });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/student/new', data, config)
        .then(res => {
            dispatch({
                type: ADD_STUDENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ADD_STUDENT_FAIL
            });
        });
};

export const getStudents = () => (dispatch) => {
    dispatch({ type: GET_STUDENTS })

    axios.get('http://localhost:3001/api/student/all')
        .then(res => {
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STUDENTS_FAIL
            });
        });
}
export const deleteStudent = data => (dispatch) => {

    axios.put(`http://localhost:3001/api/student/delete/${data}`)
        .then(res => {
            dispatch({
                type: DELETE_STUDENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const viewStudent = id => (dispatch) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    axios.get(`http://localhost:3001/api/student/view/${id}`, config)
        .then(res => {
            dispatch({
                type: VIEW_STUDENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const viewStudentSubject = (title, id) => (dispatch) => {
    // console.log(title, id)
    dispatch({ type: VIEW_STUDENT_SUBJECT })
    axios.get(`http://localhost:3001/api/student/view-subject/${title}/${id}`)
    .then(res => {
        dispatch({
            type: VIEW_STUDENT_SUBJECT_SUCCESS
        })
    })
        .catch(err => {
            dispatch({VIEW_STUDENT_SUBJECT_FAIL})
        });
}

export const updateStudentInfo = (id, data) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    dispatch({ type: UPDATE_STUDENT_INFO })
    axios.put(`http://localhost:3001/api/student/update/${id}`, data, config)
        .then(res => {
            dispatch({
                type: UPDATE_STUDENT_INFO_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: UPDATE_STUDENT_INFO_FAIL
            })
        });
}