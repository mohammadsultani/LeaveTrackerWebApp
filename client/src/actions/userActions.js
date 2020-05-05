import axios from 'axios'
import { FETCH_USERS , DELETE_USER,UPDATE_USER, UPDATE_USER_ACCOUNT, UPDATE_USER_LEAVE_DAYS, GET_USER} from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const fetchUsers = () => dispatch => {
    axios.get('/users', tokenConfig())
        .then(users => dispatch({
            type:FETCH_USERS,
            payload: users.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}
export const getUser = name => dispatch => {
    axios.get(`/users/${name}`, tokenConfig())
        .then(res => dispatch({
            type:GET_USER,
            payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}
// It updates number of leave days taken update leave request updated. 
export const updateUserLeaveDays = user =>  dispatch => {
    axios.post('/users/leaveDaysTaken', user, tokenConfig())
        .then(res => dispatch({
            type: UPDATE_USER_LEAVE_DAYS,
            payload: user.numof_leavedays_taken
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status, "Delete Fail"))
        )
} 
export const deleteUser = user => dispatch => {
    axios.post(`/users/delete/${user.id}`,user, tokenConfig())
        .then(res => dispatch({
            type: DELETE_USER,
            payload: user.id
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status, "Delete Fail"))
        )
} 
export const updateUserAccount = user => dispatch => {
    axios.post(`/users/updateAccount/${user.id}`,user, tokenConfig())
    .then(user => dispatch({
        type: UPDATE_USER_ACCOUNT,
        payload: user.data
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status, "Update Account Fail"))
    )
}
export const updateUser = user => dispatch => {
    axios.post(`/users/update/${user.id}`,user, tokenConfig())
        .then(res => dispatch({
            type: UPDATE_USER,
            payload: user
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status, "Update Fail"))
        )   
}