import { FETCH_USERS , DELETE_USER, UPDATE_USER , UPDATE_USER_ACCOUNT, GET_USER } from '../actions/types'
const initialState = {
    users: [],
    takenLeaveDays:null, // It is used to take Number of leave days taken by user from backend.
    userUpdated: false
}
export default function (state = initialState, action) {
    switch(action.type){
        case FETCH_USERS:    
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return {
                ...state,
                takenLeaveDays: action.payload
            } 
        case UPDATE_USER: 
            return {
                ...state,
                userUpdated: true
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(e => e._id !== action.payload )
            }
        case UPDATE_USER_ACCOUNT:
            return {
                ...state,
            }
            default: return state
    }
} 