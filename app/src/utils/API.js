import axios from 'axios'
import { routes } from '../routes';
export const base_url = import.meta.VITE_API_BASE_URL;
let instance = axios.create({ baseURL: 'http://localhost:5000/api' });

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['token'] = token;
    return config;
}, (err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use((config) => {
    return config;
}, (err) => {
    if (err.response.status === 401 && err.response.data.err === 'TOKEN_EXPIRED') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = routes.login;
        return;
    }
    if (err.response && err.response.data) {
        return Promise.reject(err.response.data);
    }
    return Promise.reject(err.message);
});

export default instance;