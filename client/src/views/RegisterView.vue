<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();
const { register } = useAuth();
const toast = useToast();

const form = reactive({ name: '', email: '', password: '' });
const errors = reactive({ name: '', email: '', password: '' });
const loading = ref(false);
const serverError = ref('');

function validate() {
  errors.name = form.name.trim().length >= 2 ? '' : 'Name is required.';
  errors.email = form.email.includes('@') ? '' : 'Enter a valid university email.';
  errors.password = form.password.length >= 4 ? '' : 'Password must be at least 4 characters.';
  return !errors.name && !errors.email && !errors.password;
}

async function handleSubmit() {
  if (!validate()) return;
  loading.value = true;
  serverError.value = '';
  try {
    await register(form.name, form.email, form.password);
    toast.success('Account created successfully.');
    router.push({ name: 'dashboard' });
  } catch (err) {
    serverError.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="register-view">
    <h2>Create account</h2>
    <p class="subtitle">Register to start tracking your CGPA.</p>

    <p v-if="serverError" class="error-msg">{{ serverError }}</p>

    <form class="form" @submit.prevent="handleSubmit">
      <BaseInput v-model="form.name" type="text" label="Full name" required :error="errors.name" />
      <BaseInput v-model="form.email" type="email" label="University email" required :error="errors.email" />
      <BaseInput v-model="form.password" type="password" label="Password" required :error="errors.password" placeholder="••••••••" />
      <BaseButton type="submit" full-width :disabled="loading">
        {{ loading ? 'Creating account...' : 'Register' }}
      </BaseButton>
    </form>

    <p class="footnote">Already have an account? <RouterLink :to="{ name: 'login' }">Sign in</RouterLink></p>
  </div>
</template>

<style scoped>
.register-view h2 {
  font-size: var(--fs-display-md);
  margin-bottom: var(--space-1);
}

.subtitle {
  color: var(--color-ink-500);
  margin-bottom: var(--space-6);
  font-size: var(--fs-body-sm);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footnote {
  margin-top: var(--space-6);
  font-size: var(--fs-caption);
  color: var(--color-ink-300);
}

.footnote a {
  color: var(--color-accent);
  font-weight: 600;
}

.error-msg {
  color: var(--color-danger);
  font-size: var(--fs-body-sm);
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background: var(--color-danger-soft);
  border-radius: var(--radius-md);
}
</style>
