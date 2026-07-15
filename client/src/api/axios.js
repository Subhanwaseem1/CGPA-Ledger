import axios from 'axios';

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
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('cgpa-calculator::token');
      const { default: router } = await import('../router/index.js');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default api;
