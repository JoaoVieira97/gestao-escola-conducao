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
        return localStorage.getItem('userToken') !== null &&
            localStorage.getItem('userType') !== null;
    }

    /**
     * User authentication
     * @param email
     * @param password
     * @param rememberMe
     * @param successHandler
     * @param errorHandler
     */
    static login(email, password, rememberMe=true, successHandler, errorHandler) {

        fetchApi(
            'post',
            '/authentication',
            {
                email: email,
                password: password,
                rememberMe: rememberMe
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

        return null;
    }
}