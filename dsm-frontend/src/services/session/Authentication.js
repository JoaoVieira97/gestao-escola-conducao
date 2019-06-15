import store from '../../redux/store';
import { clearUserState, setUserTokenAndType } from "../../redux/actions/user";

export default class Authentication {

    /**
     * Check if there is an active session.
     * @returns {boolean}
     */
    static isAuthenticated () {

        // check on local storage
        if (localStorage.getItem('userToken') !== null &&
            localStorage.getItem('userType') !== null) {

            return true;
        }
        else
        // check on redux
        if (store.getState().user.userToken !== null &&
            store.getState().user.userType !== null){

            return true;
        }

        return false;
    }

    /**
     * Get user type
     */
    static getUserType() {

        console.log(store.getState());

        if(localStorage.getItem('userType') !== null)
            return localStorage.getItem('userType');

        else if(store.getState().user.userType !== null)
            return store.getState().user.userType;

        return null;
    }

    /**
     * Authentication method.
     * @param data
     * @param rememberMe
     */
    static login(data, rememberMe) {

        if(rememberMe) {
            // add on local storage
            localStorage.setItem('userToken', data.userToken);
            localStorage.setItem('userType', data.userType);
        }
        else {
            // add on redux
            store.dispatch(
                setUserTokenAndType(data.userToken, data.userType),
            );

            console.log(store.getState());
        }
    }

    /**
     * Re login the current user.
     */
    static reLogin() {

        /*
        const userToken = localStorage.getItem('userToken');
        const userType = localStorage.getItem('userType');
         */
    }

    static logout() {

        localStorage.clear();
        store.dispatch(clearUserState());
    }
}