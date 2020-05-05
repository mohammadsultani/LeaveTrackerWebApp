import axios from 'axios'
import { FETCH_LEAVES_TYPES, POST_LEAVE_TYPE, DELETE_LEAVE_TYPE, FETCH_POSITION_TYPES,DELETE_POSITION_TYPE,POST_POSITION_TYPE } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions' 

export const fetchLeaveTypes = () => (dispatch, getState) => {
    axios.get('/leaveTypes', tokenConfig(getState))
        .then(res => dispatch({
            type: FETCH_LEAVES_TYPES,
            payload: res.data
        })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}
export const deleteLeaveType = id => (dispatch,getState) => {
    axios.delete(`/leaveTypes/delete/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_LEAVE_TYPE,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}
export const postLeaveType = leaveType => (dispatch,getState) => {
    axios.post('/leaveTypes/add', leaveType, tokenConfig(getState))
        .then(res => dispatch({
            type: POST_LEAVE_TYPE,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}


export const  fetchPositionTypes = () => (dispatch) => {
    axios.get('/positions')
        .then(res => dispatch({
            type: FETCH_POSITION_TYPES,
            payload: res.data
        })) 
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}
export const postPositionType = positionType => (dispatch,getState) => {
    axios.post('/positions/add', positionType, tokenConfig(getState))
        .then(res => dispatch({
            type: POST_POSITION_TYPE,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
} 
export const deletePositionType = id => (dispatch,getState) => {
    axios.delete(`/positions/delete/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_POSITION_TYPE,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}