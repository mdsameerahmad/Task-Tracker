import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants.js';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data || error.response);
    }
    return Promise.reject({ message: error.message || 'Network error' });
  }
);

const apiService = {
  get(path = '') {
    return apiClient.get(path);
  },

  post(path = '', body) {
    return apiClient.post(path, body);
  },

  put(path = '', body) {
    return apiClient.put(path, body);
  },

  delete(path = '') {
    return apiClient.delete(path);
  },
};

export default apiService;
