import {combineReducers} from 'redux'

const initialState = {
    employeeId: null,
    name: null,
    refresh: false
}

const userState = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                employeeId: action.payload.employeeId,
                name: action.payload.name
            }
        case "LOG_OUT":
            return {
                ...state,
                employeeId: null,
                name: null,
            } 
        case "SET_REFRESH":
        return {
            ...state,
            refresh: action.payload
        }               
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userState,
})

export default rootReducer

