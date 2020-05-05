import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SENDING_EMAIL,
    CLOSENAVBAR,
    RESET_PASSWORD,
    UPDATE_USER_LEAVE_DAYS // It update number of leave days taken by user.
} from "../actions/types"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    userId: null,
    userName: null,
    userEmail: null,
    userPosition:null,
    accessLevel: null,
    numOfLeaveDaysGiven: null,
    numOfLeaveDaysTaken: null,
    isDeleted: null,
    closeNavbar: false, // It is used in ResetPassword Component.
    msg: null
} 
export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                isLoading: true
            } 
        case USER_LOADED: 
            return {  
                ...state,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userPosition: action.payload.userPosition,
                accessLevel: action.payload.accessLevel,
                numOfLeaveDaysGiven: action.payload.numOfLeaveDaysGiven,
                numOfLeaveDaysTaken: action.payload.numOfLeaveDaysTaken,
                isDeleted: action.payload.isDeleted
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token) 
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userPosition: action.payload.userPosition,
                accessLevel: action.payload.accessLevel,
                numOfLeaveDaysGiven: action.payload.numOfLeaveDaysGiven,
                numOfLeaveDaysTaken: action.payload.numOfLeaveDaysTaken,
                isDeleted: action.payload.isDeleted
            }
        case AUTH_ERROR:
            localStorage.clear()
            return {
                ...state,
                token: null
            }
        case LOGOUT_SUCCESS:
            localStorage.clear()
            return {
                ...state,
                token: null,
                userId: null,
                userName: null,
                userEmail: null,
                accessLevel: null,
                isAuthenticated: false,
                isLoading: false,
                numOfLeaveDaysGiven: null,
                numOfLeaveDaysTaken: null,
                isDeleted: null
            }
        case UPDATE_USER_LEAVE_DAYS: 
            return {
                ...state, 
                numOfLeaveDaysTaken: action.payload
            }
        case SENDING_EMAIL: 
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                msg: action.payload.msg
            }
        case CLOSENAVBAR: 
            return{
                ...state,
                closeNavbar: action.payload
            }
        case RESET_PASSWORD:
            localStorage.setItem('token', action.payload.token) 
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userPosition: action.payload.userPosition,
                accessLevel: action.payload.accessLevel,
                numOfLeaveDaysGiven: action.payload.numOfLeaveDaysGiven,
                numOfLeaveDaysTaken: action.payload.numOfLeaveDaysTaken,
                isDeleted: action.payload.isDeleted
            }
        default: return state
    }
}