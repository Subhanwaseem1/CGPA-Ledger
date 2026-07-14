<script setup>
import { reactive, watch } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import GradeSelector from './GradeSelector.vue';
import BaseButton from '../ui/BaseButton.vue';

/**
 * CourseForm — receives an optional `course` prop (Props: parent → child)
 * for edit mode, and emits a fully-formed `save` payload upward
 * (Emits: child → parent) rather than mutating shared state directly.
 * This keeps the form a "dumb" component with a single responsibility:
 * collect and validate course input.
 */
const props = defineProps({
  course: { type: Object, default: null }, // null = create mode
});

const emit = defineEmits(['save', 'cancel']);

const form = reactive({
  title: props.course?.title || '',
  code: props.course?.code || '',
  creditHours: props.course?.creditHours ?? 3,
  grade: props.course?.grade || '',
});

watch(
  () => props.course,
  (course) => {
    form.title = course?.title || '';
    form.code = course?.code || '';
    form.creditHours = course?.creditHours ?? 3;
    form.grade = course?.grade || '';
  }
);

function handleSubmit() {
  if (!form.title || !form.code || !form.grade || !form.creditHours) return;
  emit('save', { ...form, creditHours: Number(form.creditHours) });
}
</script>

<template>
  <form class="course-form" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.title" label="Course title" placeholder="e.g. Data Structures & Algorithms" required />
    <div class="row">
      <BaseInput v-model="form.code" label="Course code" placeholder="e.g. CS-201" required />
      <BaseInput
        v-model="form.creditHours"
        type="number"
        label="Credit hours"
        min="1"
        max="6"
        step="1"
        required
      />
    </div>
    <div class="grade-field">
      <span class="label">Grade obtained<span class="required">*</span></span>
      <GradeSelector v-model="form.grade" />
    </div>

    <div class="actions">
      <BaseButton type="button" variant="ghost" @click="emit('cancel')">Cancel</BaseButton>
      <BaseButton type="submit" variant="primary">{{ course ? 'Save changes' : 'Add course' }}</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.course-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-4);
}

.grade-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
