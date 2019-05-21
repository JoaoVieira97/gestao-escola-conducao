import store from '../../redux/store';
import { clearUserState } from "../../redux/actions/user";

export default class Authentication {

    /**
     * Check if there is an active session
     * @returns {boolean}
     */
    static isAuthenticated () {

        return !!localStorage.getItem('dsmSessionId');
    }


    static async login() {

    }

    static async logout() {

        localStorage.clear();
        store.dispatch(clearUserState());
    }
}