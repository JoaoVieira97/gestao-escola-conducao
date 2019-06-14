// USER reducer

const INITIAL_STATE = {
    userToken: '',
    userType: ''
};

// take the previous state and an action, and return the next state
export default function userReducer (state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'CLEAR_USER_STATE':
            return {
                INITIAL_STATE
            };

        case 'SET_USER_TOKEN_AND_TYPE':
            return {
                ...state,
                userToken: action.userToken,
                userType: action.userType
            };

        default:
            return state;
    }
}