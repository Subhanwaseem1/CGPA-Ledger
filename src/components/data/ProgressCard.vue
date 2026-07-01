<script setup>
import { computed } from 'vue';

const props = defineProps({
  current: { type: Number, required: true },
  target: { type: Number, required: true },
  max: { type: Number, default: 4.0 },
  label: { type: String, default: 'Progress toward target CGPA' },
});

const percent = computed(() => Math.min(100, Math.round((props.current / props.max) * 100)));
const targetPercent = computed(() => Math.min(100, Math.round((props.target / props.max) * 100)));
const remaining = computed(() => Math.max(0, +(props.target - props.current).toFixed(2)));
</script>

<template>
  <div class="progress-card">
    <div class="head">
      <span class="label">{{ label }}</span>
      <span class="figures">{{ current.toFixed(2) }} / {{ target.toFixed(2) }}</span>
    </div>
    <div class="track">
      <div class="fill" :style="{ width: percent + '%' }" />
      <div class="target-marker" :style="{ left: targetPercent + '%' }" title="Target CGPA" />
    </div>
    <p class="hint">
      <template v-if="remaining > 0">{{ remaining.toFixed(2) }} points to reach your target.</template>
      <template v-else>Target reached — great work.</template>
    </p>
  </div>
</template>

<style scoped>
.progress-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  font-size: var(--fs-body-sm);
}

.label {
  color: var(--color-ink-500);
  font-weight: 600;
}

.figures {
  font-family: var(--font-mono);
  color: var(--color-ink-900);
}

.track {
  position: relative;
  height: 10px;
  background: var(--color-surface-sunken);
  border-radius: var(--radius-pill);
  overflow: visible;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-strong));
  border-radius: var(--radius-pill);
  transition: width 420ms ease;
}

.target-marker {
  position: absolute;
  top: -3px;
  width: 2px;
  height: 16px;
  background: var(--color-accent-contrast);
  border-radius: 1px;
}

.hint {
  margin: var(--space-3) 0 0;
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}
</style>
