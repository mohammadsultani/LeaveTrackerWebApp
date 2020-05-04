import axios from 'axios'
import { FETCH_LEAVE_REQUESTS
    ,POST_LEAVE_REQUESTS
    ,UPDATE_LEAVE_REQUESTS,
    DELETE_LEAVE_REQUESTS,
    Approve_Leave_Request,
    Deny_Leave_Request,
    GET_LEAVE_REQUEST,
    LEAVE_REQUESTS_LOADING,
    TAKEN_LEAVE_REQUEST
} 
from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions' 

export const leaveRequestsLoading = () => {
    return {
        type:LEAVE_REQUESTS_LOADING
    }
} 
export const getLeaveRequest = leaveRequest => dispatch => {
        dispatch({
            type: GET_LEAVE_REQUEST,
            payload: leaveRequest
        })    
}
export const fetchLeaveRequest = () =>  (dispatch,getState) => {
    dispatch(leaveRequestsLoading())
    axios.get('/leaves', tokenConfig(getState))
            .then(leaveRequests => dispatch({
                type:FETCH_LEAVE_REQUESTS,
                payload: leaveRequests.data
            }))
            
}
export const approveLeaveRequest = (leaveRequest) => (dispatch,getState) => {
    axios.post(`/leaves/update/${leaveRequest._id}`,leaveRequest, tokenConfig(getState))
        .then(res =>  dispatch ({ 
            type: Approve_Leave_Request,
            payload: leaveRequest
        })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}
export const denyLeaveRequest = leaveRequest => (dispatch,getState) => {
    axios.post(`/leaves/update/${leaveRequest._id}`,leaveRequest,tokenConfig(getState))
        .then(res => dispatch({ 
            type: Deny_Leave_Request,
            payload: leaveRequest
         })
         )
         .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}
export const postLeaveRequest = newRequest => (dispatch,getState )=> {
    axios.post(`/leaves/add`, newRequest, tokenConfig(getState)) 
        .then(res => dispatch({
            type: POST_LEAVE_REQUESTS,
            payload: res.data
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status, "Request Failed"))
        )
} 
export const takenLeaveRequest = leaveRequest => (dispatch,getState) => {
    axios.post(`/leaves/update/${leaveRequest._id}`, leaveRequest,tokenConfig(getState))
        .then(res => dispatch({
            type: TAKEN_LEAVE_REQUEST,
            payload: leaveRequest
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
} 

export const updateLeaveRequest = leaveRequest => (dispatch,getState) => {
    axios.post(`/leaves/update/${leaveRequest._id}`, leaveRequest,tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_LEAVE_REQUESTS,
            payload: leaveRequest
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
} 
export const deleteLeaveRequest = id => (dispatch,getState) => {
    axios.delete(`/leaves/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_LEAVE_REQUESTS,
            payload: id
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}
             