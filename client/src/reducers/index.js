import { combineReducers } from 'redux'
import leaveReducer from './leaveReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import usersReducer from './usersReducer'
import leaveTypesReducer from './leaveTypesReducer'

export default combineReducers({
    requests: leaveReducer,
    error: errorReducer,
    auth: authReducer,
    users: usersReducer,
    types: leaveTypesReducer
})