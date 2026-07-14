import { reactive } from 'vue';
import { generateId } from '../utils/id';

const toasts = reactive([]);

function push(message, { type = 'info', timeout = 3200 } = {}) {
  const id = generateId('toast');
  toasts.push({ id, message, type });
  if (timeout) {
    setTimeout(() => dismiss(id), timeout);
  }
  return id;
}

function dismiss(id) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) toasts.splice(index, 1);
}

/**
 * Simple singleton toast bus. Any component can call useToast().success(...)
 * and the ToastNotification component (mounted once in App.vue) renders it.
 * This is an example of state flowing through a shared composable rather
 * than prop-drilling across unrelated branches of the component tree.
 */
export function useToast() {
  return {
    toasts,
    dismiss,
    push,
    success: (msg, opts) => push(msg, { ...opts, type: 'success' }),
    error: (msg, opts) => push(msg, { ...opts, type: 'danger' }),
    info: (msg, opts) => push(msg, { ...opts, type: 'info' }),
    warning: (msg, opts) => push(msg, { ...opts, type: 'warning' }),
  };
}
