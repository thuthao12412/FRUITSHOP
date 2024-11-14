import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});