export const setUser = data => {
    return {
        type: "SET_USER",
        payload : {
            employeeId: data.employeeId,
            name: data.name
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

export const SetRefresh = data => {
    return {
        type: "SET_REFRESH",
        payload: data
    }
}