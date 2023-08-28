export const setUser = data => {
    return {
        type: "SET_USER",
        payload : {
            employeeId: data.employeeId,
            name: data.name,
            isAdmin: data.isAdmin
        }
    }
}
export const logOut = data => {
    return {
        type: "LOG_OUT",
        payload : {
            employeeId: data.employeeId,
            name: data.name
        }
    }
}

export const setSearchItem = data => {
    return {
        type: "SEARCH_ITEM",
        payload : data
    }
}

export const setAlert = data => {
    return {
        type: "SET_ALERT",
        payload : {
            needAlert: data.needAlert,
            alertMessage: data.alertMessage,
            alertType: data.alertType
        }
    }
}

export const SetRefresh = data => {
    return {
        type: "SET_REFRESH",
        payload: data
    }
}