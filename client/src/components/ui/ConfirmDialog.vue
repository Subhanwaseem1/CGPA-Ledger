<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

/**
 * ConfirmDialog — composes BaseModal + BaseButton to demonstrate component
 * composition (a component built from other reusable components). Emits
 * `confirm` and `cancel` so the parent decides what actually happens
 * (e.g. deleting a semester), keeping this component free of business logic.
 */
defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmLabel: { type: String, default: 'Confirm' },
  danger: { type: Boolean, default: true },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <BaseModal :open="open" :title="title" size="sm" @close="emit('cancel')">
    <p class="message">{{ message }}</p>
    <template #footer>
      <BaseButton variant="ghost" @click="emit('cancel')">Cancel</BaseButton>
      <BaseButton :variant="danger ? 'danger' : 'primary'" @click="emit('confirm')">
        {{ confirmLabel }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped>
.message {
  color: var(--color-ink-700);
  margin: 0;
}
</style>
