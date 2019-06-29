import store from '../redux/store';
import { clearUserState } from "../redux/actions/user";
import { fetchApi } from "./api";

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
     * User authentication
     * @param email
     * @param password
     * @param successHandler
     * @param errorHandler
     */
    static login(email, password, successHandler, errorHandler) {

        fetchApi(
            'post',
            '/authentication',
            {
                email: email,
                password: password
            },  {},
            successHandler,
            errorHandler
        );
    }

    /**
     * User logout.
     */
    static logout() {

        fetchApi(
            'post',
            '/logout',
            {},
            {},
            (res) => {
                this.clearData();
            },
            (err) => {
                this.clearData();
            }
        );
    }

    static clearData() {
        // clear local storage
        localStorage.clear();
        // clear redux state
        store.dispatch(clearUserState());
    }

    /**
     * Get user type
     */
    static getUserType() {

        if(localStorage.getItem('userType') !== null)
            return localStorage.getItem('userType');

        else if(store.getState().user.userType !== null)
            return store.getState().user.userType;

        return null;
    }
}