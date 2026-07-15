import { reactive, readonly } from 'vue';
import api from '../api/axios.js';

const state = reactive({
  isAuthenticated: !!localStorage.getItem('cgpa-calculator::token'),
  user: JSON.parse(localStorage.getItem('cgpa-calculator::user') || 'null'),
});

async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('cgpa-calculator::token', data.token);
  localStorage.setItem('cgpa-calculator::user', JSON.stringify(data.user));
  state.isAuthenticated = true;
  state.user = data.user;
  return data;
}

async function register(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password });
  localStorage.setItem('cgpa-calculator::token', data.token);
  localStorage.setItem('cgpa-calculator::user', JSON.stringify(data.user));
  state.isAuthenticated = true;
  state.user = data.user;
  return data;
}

async function logout() {
  localStorage.removeItem('cgpa-calculator::token');
  localStorage.removeItem('cgpa-calculator::user');
  state.isAuthenticated = false;
  state.user = null;
  const { default: router } = await import('../router/index.js');
  router.push({ name: 'login' });
}

export function useAuth() {
  return {
    state: readonly(state),
    login,
    register,
    logout,
  };
}
