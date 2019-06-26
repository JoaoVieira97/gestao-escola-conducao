import axios from 'axios';
import apiConfig from './config';


export const fetchApi = (
    method, endPoint,
    payload = {}, headers = {},
    successHandler, errorHandler) => {


    // by default
    let authorization = apiConfig.accessToken;

    //check if login authentication
    const userToken = localStorage.getItem('userToken');
    const userType = localStorage.getItem('userType');

    if(userToken && userType)
        authorization = userToken;

    axios({
        url: apiConfig.url + endPoint,
        method: method,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  authorization,
            ...headers
        },
    }).then(response => {
        successHandler(response);
    }).catch(error => {
        errorHandler(error);
    });
};