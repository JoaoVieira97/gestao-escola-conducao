// USER actions

export function clearUserState() {
    return {
        type: 'CLEAR_USER_STATE'
    }
}

export function setUserTokenAndType(userToken, userType) {
    return {
        type: 'SET_USER_TOKEN_AND_TYPE',
        userToken: userToken,
        userType: userType
    }
}