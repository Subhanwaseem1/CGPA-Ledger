import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const DefaultLayout = () => import('../layouts/DefaultLayout.vue');
const AuthLayout = () => import('../layouts/AuthLayout.vue');

const DashboardView = () => import('../views/DashboardView.vue');
const SemestersView = () => import('../views/SemestersView.vue');
const SemesterDetailView = () => import('../views/SemesterDetailView.vue');
const WhatIfView = () => import('../views/WhatIfView.vue');
const ProfileView = () => import('../views/ProfileView.vue');
const SettingsView = () => import('../views/SettingsView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', name: 'login', component: LoginView, meta: { title: 'Sign In' } }],
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [{ path: '', name: 'register', component: RegisterView, meta: { title: 'Register' } }],
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: { name: 'dashboard' } },
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
      { path: 'semesters', name: 'semesters', component: SemestersView, meta: { title: 'Semesters' } },
      {
        path: 'semesters/:semesterId',
        name: 'semester-detail',
        component: SemesterDetailView,
        props: true,
        meta: { title: 'Semester Detail' },
      },
      { path: 'what-if', name: 'what-if', component: WhatIfView, meta: { title: 'What-If Planner' } },
      { path: 'profile', name: 'profile', component: ProfileView, meta: { title: 'Profile' } },
      { path: 'settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Not Found' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Redirect unauthenticated users away from protected routes.
router.beforeEach((to) => {
  const { state } = useAuth();

  if (to.meta.requiresAuth && !state.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if ((to.name === 'login' || to.name === 'register') && state.isAuthenticated) {
    return { name: 'dashboard' };
  }

  return true;
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · CGPA Ledger` : 'CGPA Ledger';
});

export default router;
