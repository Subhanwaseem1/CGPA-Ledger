<script setup>
/**
 * BaseInput — wraps a labeled <input> with v-model (via modelValue/update:modelValue),
 * demonstrating the standard two-way-binding prop/emit pattern used across
 * every form in the app (SemesterForm, CourseForm, ProfileView, LoginView...).
 */
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  min: { type: [String, Number], default: undefined },
  max: { type: [String, Number], default: undefined },
  step: { type: [String, Number], default: undefined },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="base-input">
    <span v-if="label" class="label">
      {{ label }}<span v-if="required" class="required">*</span>
    </span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :required="required"
      class="field"
      :class="{ 'has-error': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
    <span v-else-if="hint" class="hint-text">{{ hint }}</span>
  </label>
</template>

<style scoped>
.base-input {
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
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.field:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.field.has-error {
  border-color: var(--color-danger);
}

.hint-text {
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}

.error-text {
  font-size: var(--fs-caption);
  color: var(--color-danger);
}
</style>
