import { FETCH_LEAVE_REQUESTS
        ,POST_LEAVE_REQUESTS
        ,UPDATE_LEAVE_REQUESTS
        ,DELETE_LEAVE_REQUESTS,
        Approve_Leave_Request,
        Deny_Leave_Request,
        LEAVE_REQUESTS_LOADING
     }

from '../actions/types'

const initialState = {
    leaveRequests:[],
    approvedRequests:[],
    deniedRequests:[],
    newRequests:[],
    loading: false
}
export default function(state = initialState, action) {
    switch(action.type) {
        case LEAVE_REQUESTS_LOADING: 
        return {
            ...state,
            loading: true
        }
        case FETCH_LEAVE_REQUESTS: 
        return {
            ...state,
            leaveRequests: action.payload,
            approvedRequests: action.payload.filter(e => e.approved === "Approved"),
            newRequests: action.payload.filter(e => e.approved === "NewRequest"),
            deniedRequests: action.payload.filter(e => e.approved === "Denied"),
            loading: false
        }
        case POST_LEAVE_REQUESTS: 
        return {
            ...state
        }
        case UPDATE_LEAVE_REQUESTS: 
        return {
            ...state,

        }
        case DELETE_LEAVE_REQUESTS:
        return {
            ...state,
            newRequests: state.newRequests.filter(e => e._id !== action.payload ),
            approvedRequests: state.approvedRequests.filter(e => e._id !== action.payload ),
            deniedRequests: state.deniedRequests.filter(e => e._id !== action.payload ),
            leaveRequests: state.leaveRequests.filter(e => e._id !== action.payload )
        }
        case Approve_Leave_Request: 
        return {
            ...state,
            newRequests: state.newRequests.filter(e => e._id !== action.payload._id ),
            deniedRequests: state.deniedRequests.filter(e => e._id !== action.payload._id )
        }
        case Deny_Leave_Request: 
        return {
            ...state,
            newRequests: state.newRequests.filter(e => e._id !== action.payload._id ),
            approvedRequests: state.approvedRequests.filter(e => e._id !== action.payload._id )
        }
        default: return state
    }
}  