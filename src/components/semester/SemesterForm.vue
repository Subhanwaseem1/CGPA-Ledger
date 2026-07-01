<script setup>
import { reactive, watch } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseButton from '../ui/BaseButton.vue';

const props = defineProps({
  semester: { type: Object, default: null },
});

const emit = defineEmits(['save', 'cancel']);

const termOptions = [
  { value: 'Fall', label: 'Fall' },
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
];

const currentYear = new Date().getFullYear();

const form = reactive({
  term: props.semester?.term || 'Fall',
  year: props.semester?.year || currentYear,
});

watch(
  () => props.semester,
  (s) => {
    form.term = s?.term || 'Fall';
    form.year = s?.year || currentYear;
  }
);

function handleSubmit() {
  if (!form.term || !form.year) return;
  emit('save', { term: form.term, year: Number(form.year), title: `${form.term} ${form.year}` });
}
</script>

<template>
  <form class="semester-form" @submit.prevent="handleSubmit">
    <div class="row">
      <BaseSelect v-model="form.term" label="Term" :options="termOptions" required />
      <BaseInput v-model="form.year" type="number" label="Year" min="2015" max="2035" required />
    </div>
    <div class="actions">
      <BaseButton type="button" variant="ghost" @click="emit('cancel')">Cancel</BaseButton>
      <BaseButton type="submit" variant="primary">{{ semester ? 'Save changes' : 'Create semester' }}</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.semester-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
</style>
