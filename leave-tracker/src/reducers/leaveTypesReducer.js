import { FETCH_LEAVES_TYPES, DELETE_LEAVE_TYPE, POST_LEAVE_TYPE,
         FETCH_POSITION_TYPES, DELETE_POSITION_TYPE, POST_POSITION_TYPE
} from '../actions/types'

const initialState = {
    leaveTypes: [],
    positionTypes: []
}
export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_LEAVES_TYPES:
            return {
                ...state, 
                leaveTypes: action.payload
            }
        case DELETE_LEAVE_TYPE: 
            return {
                ...state,
                leaveTypes: state.leaveTypes.filter(e => e._id !== action.payload.id )
            }
        case POST_LEAVE_TYPE:
            return {
                ...state,
                leaveTypes: [...state.leaveTypes, action.payload.newLeaveType ]
            }
        case FETCH_POSITION_TYPES:
            return {
                ...state,
                positionTypes: action.payload
            }
        case POST_POSITION_TYPE:
            return {
                ...state,
                positionTypes: [...state.positionTypes, action.payload.newPositionType]
            }
        case DELETE_POSITION_TYPE: 
            return {
                ...state,
                positionTypes: state.positionTypes.filter(e => e._id !== action.payload.id)
            }
        default: return state
    }
}
