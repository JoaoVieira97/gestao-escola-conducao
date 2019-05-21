// USER reducer

const INITIAL_STATE = {
    token: ''
};

// take the previous state and an action, and return the next state
export default function userReducer (state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'CLEAR_USER_STATE':
            return {
                INITIAL_STATE
            };

        case 'SET_USER_TOKEN':
            return {
                ...state,
                token: action.token
            };

        default:
            return state;
    }
}