import { FETCH_LEAVE_REQUESTS
        ,POST_LEAVE_REQUESTS
        ,UPDATE_LEAVE_REQUESTS
        ,DELETE_LEAVE_REQUESTS,
        Approve_Leave_Request,
        Deny_Leave_Request,
        GET_LEAVE_REQUEST,
        TAKEN_LEAVE_REQUEST,
        LEAVE_REQUESTS_LOADING
     }

from '../actions/types'

const initialState = {
    leaveRequests:[],
    takenLeaves: [],
    approvedRequests:[],
    deniedRequests:[],
    newRequests:[],
    leaveRequest: "",
    loading: false,
    msg: null
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
            takenLeaves: action.payload.filter(e => e.status === "Taken"),
            approvedRequests: action.payload.filter(e => e.status === "Approved"),
            newRequests: action.payload.filter(e => e.status === "New Request"),
            deniedRequests: action.payload.filter(e => e.status === "Denied"),
            loading: false
        }
        case GET_LEAVE_REQUEST:
            return {
                ...state,
                leaveRequest: action.payload
            }
        case POST_LEAVE_REQUESTS: 
        return {
            ...state,
            msg: action.payload
        }
        case UPDATE_LEAVE_REQUESTS: 
        return {
            ...state,
            approvedRequests: state.approvedRequests.filter(e => e._id !== action.payload._id )
        }
        case DELETE_LEAVE_REQUESTS:
        return {
            ...state,
            newRequests: state.newRequests.filter(e => e._id !== action.payload ),
            takenLeaves: state.takenLeaves.filter(e => e._id !== action.payload ),
            approvedRequests: state.approvedRequests.filter(e => e._id !== action.payload ),
            deniedRequests: state.deniedRequests.filter(e => e._id !== action.payload ),
            leaveRequests: state.leaveRequests.filter(e => e._id !== action.payload )
        }
        case Approve_Leave_Request:
        return {
            ...state,
            approvedRequests: [...state.approvedRequests, action.payload],
            newRequests: state.newRequests.filter(e => e._id !== action.payload._id ),
        }
        case Deny_Leave_Request: 
        return {
            ...state,
            deniedRequests: [ ...state.deniedRequests, action.payload ],
            newRequests: state.newRequests.filter(e => e._id !== action.payload._id )
        }
        case TAKEN_LEAVE_REQUEST: 
        return {
            ...state, 
            takenLeaves: [...state.takenLeaves, action.payload ],
            approvedRequests: state.approvedRequests.filter(e => e._id !== action.payload._id )
            } 
        default: return state
    }
}  