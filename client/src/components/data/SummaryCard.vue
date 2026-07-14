<script setup>
import { bandForLetter } from '../../utils/gradeScale';

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  gpa: { type: Number, required: true },
  credits: { type: Number, required: true },
  courseCount: { type: Number, required: true },
});
</script>

<template>
  <div class="summary-card">
    <div class="header">
      <div>
        <h4>{{ title }}</h4>
        <span class="subtitle">{{ subtitle }}</span>
      </div>
      <div class="gpa-pill" :class="`band-${gpa >= 3.5 ? 'a' : gpa >= 3 ? 'b' : gpa >= 2 ? 'c' : 'f'}`">
        {{ gpa.toFixed(2) }}
      </div>
    </div>
    <div class="meta">
      <span>{{ courseCount }} course{{ courseCount === 1 ? '' : 's' }}</span>
      <span class="dot">•</span>
      <span>{{ credits }} credit hrs</span>
    </div>
  </div>
</template>

<style scoped>
.summary-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.summary-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

h4 {
  margin: 0;
  font-size: 1.05rem;
}

.subtitle {
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}

.gpa-pill {
  font-family: var(--font-mono);
  font-weight: 600;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-body-sm);
  flex: none;
}

.band-a { background: var(--color-success-soft); color: var(--color-success); }
.band-b { background: var(--color-accent-soft); color: var(--color-accent-strong); }
.band-c { background: var(--color-warning-soft); color: var(--color-warning); }
.band-f { background: var(--color-danger-soft); color: var(--color-danger); }

.meta {
  margin-top: var(--space-4);
  display: flex;
  gap: var(--space-2);
  font-size: var(--fs-body-sm);
  color: var(--color-ink-500);
}

.dot {
  opacity: 0.5;
}
</style>
