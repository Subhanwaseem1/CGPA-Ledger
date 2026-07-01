<script setup>
defineProps({
  icon: { type: String, default: '📄' },
  title: { type: String, required: true },
  message: { type: String, default: '' },
});
</script>

<template>
  <div class="empty-state">
    <div class="icon" aria-hidden="true">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p v-if="message">{{ message }}</p>
    <div v-if="$slots.action" class="action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  border: 1px dashed var(--color-line);
  border-radius: var(--radius-lg);
  background: var(--color-surface-sunken);
}

.icon {
  font-size: 2.25rem;
  margin-bottom: var(--space-3);
}

h3 {
  margin-bottom: var(--space-1);
}

p {
  max-width: 360px;
  margin: 0 auto var(--space-4);
  color: var(--color-ink-500);
}

.action {
  display: flex;
  justify-content: center;
}
</style>
