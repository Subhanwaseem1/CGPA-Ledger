<script setup>
import { useToast } from '../../composables/useToast';

const { toasts, dismiss } = useToast();

const icons = { success: '✓', danger: '!', warning: '⚠', info: 'i' };
</script>

<template>
  <Teleport to="body">
    <div class="toast-stack">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="toast" :class="`type-${toast.type}`">
          <span class="toast-icon">{{ icons[toast.type] }}</span>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-dismiss" aria-label="Dismiss notification" @click="dismiss(toast.id)">✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  z-index: 200;
  max-width: 340px;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-ink-900);
  color: var(--color-canvas);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  font-size: var(--fs-body-sm);
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
}

.type-success .toast-icon { background: var(--color-success); }
.type-danger .toast-icon { background: var(--color-danger); }
.type-warning .toast-icon { background: var(--color-warning); }
.type-info .toast-icon { background: var(--color-accent); }

.toast-message {
  flex: 1;
}

.toast-dismiss {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.toast-dismiss:hover {
  opacity: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: all var(--transition-base);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
