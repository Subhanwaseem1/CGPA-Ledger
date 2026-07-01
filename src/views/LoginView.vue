<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const toast = useToast();

const form = reactive({ email: 'muhammad.subhan@uskt.edu.pk', password: '' });
const errors = reactive({ email: '', password: '' });

function validate() {
  errors.email = form.email.includes('@') ? '' : 'Enter a valid university email.';
  errors.password = form.password.length >= 4 ? '' : 'Password must be at least 4 characters.';
  return !errors.email && !errors.password;
}

function handleSubmit() {
  if (!validate()) return;
  login(form.email);
  toast.success('Signed in successfully.');
  router.push(route.query.redirect || { name: 'dashboard' });
}
</script>

<template>
  <div class="login-view">
    <h2>Welcome back</h2>
    <p class="subtitle">Sign in to continue tracking your CGPA. This demo accepts any password of 4+ characters.</p>

    <form class="form" @submit.prevent="handleSubmit">
      <BaseInput v-model="form.email" type="email" label="University email" required :error="errors.email" />
      <BaseInput v-model="form.password" type="password" label="Password" required :error="errors.password" placeholder="••••••••" />
      <BaseButton type="submit" full-width>Sign in</BaseButton>
    </form>

    <p class="footnote">Session is stored locally in your browser.</p>
  </div>
</template>

<style scoped>
.login-view h2 {
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
</style>
