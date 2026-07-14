<script setup>
import { useRoute } from 'vue-router';
import { useAcademicRecord } from '../../composables/useAcademicRecord';
import { useAuth } from '../../composables/useAuth';

const route = useRoute();
const { cgpa, profile } = useAcademicRecord();
const { logout } = useAuth();
</script>

<template>
  <header class="navbar">
    <div class="title-block">
      <span class="eyebrow">{{ profile.program }}</span>
      <h1>{{ route.meta.title || 'CGPA Ledger' }}</h1>
    </div>

    <div class="right">
      <div class="cgpa-badge">
        <span class="dot" aria-hidden="true" />
        CGPA <strong>{{ cgpa.toFixed(2) }}</strong>
      </div>
      <div class="avatar" :title="profile.name">
        {{ profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) }}
      </div>
      <button class="logout-btn" @click="logout">Sign out</button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface);
  flex: none;
}

.title-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

h1 {
  margin: 0;
  font-size: 1.25rem;
}

.right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.cgpa-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  padding: 6px var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-body-sm);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-caption);
  font-weight: 700;
}

.logout-btn {
  background: none;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: 6px var(--space-3);
  font-size: var(--fs-body-sm);
  color: var(--color-ink-500);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.logout-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

@media (max-width: 560px) {
  .title-block .eyebrow { display: none; }
  h1 { font-size: 1.05rem; }
}
</style>
