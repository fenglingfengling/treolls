import axios from 'axios';
import TMessage from "../components/TMessage/TMessage";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.response.use( configs => {

    try {
        let data = JSON.parse(localStorage.getItem('user'));
        if (data.authorization) {
            configs.headers.common.authorization = data.authorization;
        }
    } catch (e) {

    }

    return configs;
} );
axios.interceptors.response.use( response => {
    return response;
}, error => {
    let {message, errorDetails} = error.response.data;
    if (errorDetails) {
        message += ' : ' + errorDetails;
    }

    TMessage.error(message);

    throw error;

} );

// 注册
export const register = data => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    })
};

// 登录
export const login = data => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    });
};