<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: {
    type: Array,
    required: true,
    // each option: { value, label }
  },
  placeholder: { type: String, default: 'Select…' },
  required: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="base-select">
    <span v-if="label" class="label">
      {{ label }}<span v-if="required" class="required">*</span>
    </span>
    <select
      class="field"
      :value="modelValue"
      :required="required"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.label {
  font-size: var(--fs-body-sm);
  font-weight: 600;
  color: var(--color-ink-700);
}

.required {
  color: var(--color-danger);
  margin-left: 2px;
}

.field {
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  padding: 10px var(--space-3);
  color: var(--color-ink-900);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B756F' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-8);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.field:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}
</style>
