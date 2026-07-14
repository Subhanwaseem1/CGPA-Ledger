<script setup>
/**
 * StatsCard — displays a single dashboard KPI (CGPA, credits, courses...).
 * Pure presentational component driven entirely by props; no local state.
 */
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  suffix: { type: String, default: '' },
  icon: { type: String, default: '' },
  tone: {
    type: String,
    default: 'neutral',
    validator: (v) => ['neutral', 'success', 'warning', 'danger'].includes(v),
  },
  delta: { type: String, default: '' },
});
</script>

<template>
  <div class="stats-card" :class="`tone-${tone}`">
    <div class="row">
      <span class="label">{{ label }}</span>
      <span v-if="icon" class="icon" aria-hidden="true">{{ icon }}</span>
    </div>
    <div class="value-row">
      <span class="value">{{ value }}</span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
    </div>
    <p v-if="delta" class="delta">{{ delta }}</p>
  </div>
</template>

<style scoped>
.stats-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-accent);
}

.tone-success::before { background: var(--color-success); }
.tone-warning::before { background: var(--color-warning); }
.tone-danger::before { background: var(--color-danger); }

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.label {
  font-size: var(--fs-body-sm);
  color: var(--color-ink-500);
  font-weight: 600;
}

.icon {
  font-size: 1.1rem;
}

.value-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.value {
  font-family: var(--font-display);
  font-size: var(--fs-display-lg);
  font-weight: 600;
  color: var(--color-ink-900);
}

.suffix {
  color: var(--color-ink-500);
  font-size: var(--fs-body-sm);
}

.delta {
  margin: var(--space-2) 0 0;
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}
</style>
