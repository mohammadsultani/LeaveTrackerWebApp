import axios from 'axios'
import { FETCH_LEAVE_REQUESTS
    ,POST_LEAVE_REQUESTS
    ,UPDATE_LEAVE_REQUESTS,
    DELETE_LEAVE_REQUESTS,
    Approve_Leave_Request,
    Deny_Leave_Request,
    LEAVE_REQUESTS_LOADING
} 
from './types'
export const leaveRequestsLoading = () => {
    return {
        type:LEAVE_REQUESTS_LOADING
    }
} 
export const fetchLeaveRequest = () =>  dispatch => {
    dispatch(leaveRequestsLoading())
    axios.get('/leaves/')
            .then(leaveRequests => dispatch({
                type:FETCH_LEAVE_REQUESTS,
                payload: leaveRequests.data
            }))
            .catch((error) => {
                console.log(error)
            }) 
}
export const approveLeaveRequest = leaveRequest => dispatch => {
    axios.post(`/leaves/update/${leaveRequest._id}`,leaveRequest)
        .then(res =>  dispatch ({ 
            type: Approve_Leave_Request,
            payload: leaveRequest
        })
        )
   
}
export const denyLeaveRequest = leaveRequest => dispatch => {
    axios.post(`/leaves/update/${leaveRequest._id}`,leaveRequest)
        .then(res => dispatch({ 
            type: Deny_Leave_Request,
            payload: leaveRequest
         })
         )
    
}
export const postLeaveRequest = newRequest => dispatch => {
    axios.post('/leaves/add/', newRequest) 
        .then(res => dispatch({
            type: POST_LEAVE_REQUESTS
        }))
} 
export const updateLeaveRequest = leaveRequest => dispatch => {
    axios.post(`/leaves/update/${leaveRequest._id}`, leaveRequest)
        .then(res => dispatch({
            type: UPDATE_LEAVE_REQUESTS,
            payload: leaveRequest
        }))
} 
export const deleteLeaveRequest = id => dispatch => {
    axios.delete(`/leaves/${id}`)
        .then(res => dispatch({
            type: DELETE_LEAVE_REQUESTS,
            payload: id
        }))
}
             