import axios from 'axios'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISER_FAIL,
    REGISTER_FAIL,
    SENDING_EMAIL,
    CLOSENAVBAR,
    RESET_PASSWORD
} from './types'

import { returnErrors } from './errorActions'

export const tokenConfig = getstate => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    } 
    if(token) {
        config.headers['x-auth-token'] = token
    }
    return config
}

export const loadUser = () => (dispatch, getstate) => {
    dispatch({ type: USER_LOADING })
    axios.get('/auth/user/', tokenConfig(getstate))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status ))
            dispatch({
                type:AUTH_ERROR
            })   
        } )
}

export const register = ({ name , email, password, position, access_level,numof_leavedays_given,numof_leavedays_taken, isDeleted }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify({ name , email, password, position, access_level, numof_leavedays_given, numof_leavedays_taken, isDeleted })
    axios.post('/users', body, config)
        .then(res => 
            dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            )
            dispatch({
                type: REGISTER_FAIL
            })
        })


}
// Including Token with Reseting password action
export const verifyToken = () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if(token) {
        config.headers['x-auth-token'] = token
    }
    return config
}
export const resetPassword = (userInfo) => dispatch => {
    axios.post('/auth/resetpass',userInfo, verifyToken())
        .then(res => dispatch({
            type: RESET_PASSWORD,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'RESETING_PASSWORD_FAILED'))
        })
}
export const sendEmail = (email) => dispatch => {
    axios.post('/auth/sendemail', email)
        .then(res => dispatch({
            type: SENDING_EMAIL,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status, "INVALID_EMAIL" ))
        })

}
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post('/auth', body, config)
        .then(res => 
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        })


}
export const closeNavbar = () => dispatch => {
    dispatch({
        type: CLOSENAVBAR,
        payload: true
    })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
