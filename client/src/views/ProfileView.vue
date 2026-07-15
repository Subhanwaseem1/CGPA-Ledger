<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { useToast } from '../composables/useToast';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const { profile, updateProfile, fetchProfile } = useAcademicRecord();
const toast = useToast();

const form = reactive({
  name: '',
  rollNumber: '',
  program: '',
  department: '',
  university: '',
  targetCgpa: 3.5,
});
const saving = ref(false);

onMounted(async () => {
  await fetchProfile();
  if (profile.value) {
    Object.assign(form, {
      name: profile.value.name || '',
      rollNumber: profile.value.rollNumber || '',
      program: profile.value.program || '',
      department: profile.value.department || '',
      university: profile.value.university || '',
      targetCgpa: profile.value.targetCgpa || 3.5,
    });
  }
});

async function handleSave() {
  saving.value = true;
  try {
    await updateProfile({ ...form, targetCgpa: Number(form.targetCgpa) });
    toast.success('Profile updated.');
  } catch {
    toast.error('Failed to update profile.');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="page-wrap profile-view">
    <span class="eyebrow">Account</span>
    <h2>Profile</h2>

    <form class="card form" @submit.prevent="handleSave">
      <div class="row">
        <BaseInput v-model="form.name" label="Full name" required />
        <BaseInput v-model="form.rollNumber" label="Roll number" required />
      </div>
      <div class="row">
        <BaseInput v-model="form.program" label="Program" required />
        <BaseInput v-model="form.department" label="Department" required />
      </div>
      <BaseInput v-model="form.university" label="University" required />
      <BaseInput v-model="form.targetCgpa" type="number" label="Target CGPA" min="0" max="4" step="0.1" />

      <div class="actions">
        <BaseButton type="submit" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save changes' }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile-view h2 {
  margin: var(--space-1) 0 var(--space-6);
  font-size: var(--fs-display-md);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 640px;
}

.form {
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
  margin-top: var(--space-2);
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
