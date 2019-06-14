import axios from 'axios';
import apiConfig from './config';


export const fetchApi = (
    method, endPoint,
    payload = {}, headers = {},
    successHandler, errorHandler) => {

    axios({
        url: apiConfig.url + endPoint,
        method: method,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  apiConfig.accessToken,
            ...headers
        }
    }).then(response => {
        successHandler(response);
    }).catch(error => {
        errorHandler(error);
    });
};