import {combineReducers} from 'redux'

const initialState = {
    loggedIn: false,
}

const userState = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                loggedIn: false
            }               
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userState,
})

export default rootReducer

