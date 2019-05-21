// USER actions

export function clearUserState() {
    return {
        type: 'CLEAR_USER_STATE'
    }
}

export function setUserToken(token) {
    return {
        type: 'SET_USER_TOKEN',
        token: token
    }
}