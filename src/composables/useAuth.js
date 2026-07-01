import { reactive, readonly } from 'vue';

// Manages login/logout state and persists the session to localStorage.
const SESSION_KEY = 'cgpa-calculator::session';

const state = reactive({
  isAuthenticated: localStorage.getItem(SESSION_KEY) === 'true',
  studentEmail: localStorage.getItem('cgpa-calculator::email') || '',
});

function login(email) {
  state.isAuthenticated = true;
  state.studentEmail = email;
  localStorage.setItem(SESSION_KEY, 'true');
  localStorage.setItem('cgpa-calculator::email', email);
}

function logout() {
  state.isAuthenticated = false;
  localStorage.setItem(SESSION_KEY, 'false');
}

export function useAuth() {
  return {
    state: readonly(state),
    login,
    logout,
  };
}
