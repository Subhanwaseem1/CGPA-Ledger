<script setup>
/**
 * BaseButton — single-responsibility, style-only wrapper around <button>.
 * Demonstrates prop validation (type + validator) and forwarding of native
 * events via emits, rather than swallowing the click handler.
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);

function handleClick(event) {
  emit('click', event);
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="base-button"
    :class="[`variant-${variant}`, `size-${size}`, { 'is-full': fullWidth }]"
    @click="handleClick"
  >
    <span class="content"><slot /></span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
  white-space: nowrap;
}

.base-button:active:not(:disabled) {
  transform: translateY(1px);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-full {
  width: 100%;
}

.size-sm { padding: var(--space-2) var(--space-3); font-size: var(--fs-body-sm); }
.size-md { padding: 10px var(--space-5); font-size: var(--fs-body); }
.size-lg { padding: var(--space-3) var(--space-6); font-size: var(--fs-body-lg); }

.variant-primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.variant-primary:hover:not(:disabled) {
  background: var(--color-accent-strong);
  box-shadow: var(--shadow-md);
}

.variant-secondary {
  background: var(--color-surface);
  border-color: var(--color-line);
  color: var(--color-ink-900);
}
.variant-secondary:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.variant-ghost {
  background: transparent;
  color: var(--color-ink-700);
}
.variant-ghost:hover:not(:disabled) {
  background: var(--color-surface-sunken);
  color: var(--color-ink-900);
}

.variant-danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
.variant-danger:hover:not(:disabled) {
  background: var(--color-danger);
  color: #fff;
}
</style>
