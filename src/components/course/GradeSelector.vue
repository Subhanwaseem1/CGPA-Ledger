<script setup>
import { GRADE_SCALE } from '../../utils/gradeScale';

/**
 * GradeSelector — child component that turns letter-grade selection into a
 * row of tappable pills instead of a plain <select>. Communicates the
 * chosen grade back to its parent purely through an emit, never mutating
 * a prop directly (a common Vue anti-pattern this project avoids).
 */
defineProps({
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="grade-selector" role="radiogroup" aria-label="Select letter grade">
    <button
      v-for="grade in GRADE_SCALE"
      :key="grade.letter"
      type="button"
      class="pill"
      :class="[`band-${grade.band}`, { active: modelValue === grade.letter }]"
      role="radio"
      :aria-checked="modelValue === grade.letter"
      @click="emit('update:modelValue', grade.letter)"
    >
      {{ grade.letter }}
    </button>
  </div>
</template>

<style scoped>
.grade-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.pill {
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  color: var(--color-ink-700);
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: var(--fs-body-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pill:hover {
  border-color: var(--color-accent);
}

.pill.active.band-a { background: var(--grade-a); border-color: var(--grade-a); color: #fff; }
.pill.active.band-b { background: var(--grade-b); border-color: var(--grade-b); color: #fff; }
.pill.active.band-c { background: var(--grade-c); border-color: var(--grade-c); color: #fff; }
.pill.active.band-d { background: var(--grade-d); border-color: var(--grade-d); color: #fff; }
.pill.active.band-f { background: var(--grade-f); border-color: var(--grade-f); color: #fff; }
</style>
