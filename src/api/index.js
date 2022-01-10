import axios from 'axios';
import Catcher from './catcher';

const service = axios.create({
  baseURL: '',
});

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jhi-authenticationToken');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.data) {
      if (response.status !== 200) {
        Catcher(response)
      } else {
        return response.data
      }
    }
    return response;
  },
  error => {
    Catcher(error.response)
    return Promise.reject(error);
  }
);
export default service;
