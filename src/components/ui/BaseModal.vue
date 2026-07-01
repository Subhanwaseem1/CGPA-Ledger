<script setup>
/**
 * BaseModal — generic dialog shell used by SemesterForm, CourseForm, and
 * ConfirmDialog. Demonstrates Teleport (renders outside the layout DOM
 * tree to avoid z-index/overflow issues) and a controlled `open` prop with
 * a `close` emit, rather than managing its own visibility state.
 */
defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
});

const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-panel" :class="`size-${size}`" role="dialog" aria-modal="true">
          <header class="modal-header">
            <h3>{{ title }}</h3>
            <button class="close-btn" aria-label="Close dialog" @click="emit('close')">✕</button>
          </header>
          <div class="modal-body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 32, 28, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 100;
}

.modal-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 100%;
  box-shadow: var(--shadow-lg);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.size-sm { max-width: 380px; }
.size-md { max-width: 520px; }
.size-lg { max-width: 720px; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--color-line);
}

.modal-header h3 {
  margin: 0;
  font-size: var(--fs-display-md);
}

.close-btn {
  background: var(--color-surface-sunken);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  color: var(--color-ink-500);
  transition: background var(--transition-fast), color var(--transition-fast);
}
.close-btn:hover {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
}

.modal-footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-line);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--transition-base);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-panel {
  animation: pop-in var(--transition-base);
}
@keyframes pop-in {
  from { transform: scale(0.96) translateY(8px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
