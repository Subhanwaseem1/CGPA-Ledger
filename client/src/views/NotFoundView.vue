<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();
</script>

<template>
  <div class="not-found">
    <span class="code">404</span>
    <h2>This page isn't on the transcript.</h2>
    <p>The route you followed doesn't exist.</p>
    <BaseButton @click="router.push({ name: 'dashboard' })">Back to dashboard</BaseButton>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-2);
  padding: var(--space-6);
}

.code {
  font-family: var(--font-display);
  font-size: 4rem;
  color: var(--color-accent);
  font-weight: 700;
}

h2 {
  margin: 0;
}

p {
  margin-bottom: var(--space-4);
}
</style>
