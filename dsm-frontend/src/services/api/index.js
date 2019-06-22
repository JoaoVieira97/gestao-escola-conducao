import axios from 'axios';
import apiConfig from './config';

//axios.defaults.withCredentials = true;

export const fetchApi = (
    method, endPoint,
    payload = {}, headers = {},
    successHandler, errorHandler) => {

    axios({
        url: apiConfig.url + endPoint,
        method: method,
        data: payload,
        headers: {
            //crossDomain: true,
            'Content-Type': 'application/json',
            'Authorization':  apiConfig.accessToken,
            ...headers
        },
        //withCredentials: true,
    }).then(response => {
        successHandler(response);
    }).catch(error => {
        errorHandler(error);
    });

    /*
    fetch(apiConfig.url + endPoint, {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  apiConfig.accessToken,
            ...headers
        },
    })
        .then((response) => response.json())
        .then((json) => {
            successHandler(json);
            console.log(json);
        }).catch((err) => {
            console.log("ERROR: " + err);
    });
     */
};