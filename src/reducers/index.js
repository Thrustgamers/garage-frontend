import {combineReducers} from 'redux'

const initialState = {
    isAdmin: false,
    needAlert: false,
    alertType: null,
    alertMessage: '',
    searchId: null,
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
                name: action.payload.name,
                isAdmin: action.payload.isAdmin
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
        case "SEARCH_ITEM":
            return {
                ...state,
                searchId: action.payload
            }   
        case "SET_ALERT":
            return {
                ...state,
                needAlert: action.payload.needAlert,
                alertMessage: action.payload.alertMessage,
                alertType: action.payload.alertType
            }            
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userState,
})

export default rootReducer

