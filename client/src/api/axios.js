import axios from 'axios';
import router from '../router/index.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cgpa-calculator::token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('cgpa-calculator::token');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default api;
