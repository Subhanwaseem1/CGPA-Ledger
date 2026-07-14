<script setup>
/**
 * SemesterCard — a thin, presentational wrapper around SummaryCard-style
 * data plus row actions. Receives the semester (with derived gpa/credits)
 * via Props and emits `delete`; navigation to the detail view is handled
 * declaratively with RouterLink rather than an emitted event, since routing
 * is a cross-cutting concern the router owns.
 */
defineProps({
  semester: { type: Object, required: true },
});

defineEmits(['delete']);
</script>

<template>
  <RouterLink :to="{ name: 'semester-detail', params: { semesterId: semester.id } }" class="semester-card">
    <div class="top">
      <div>
        <h4>{{ semester.title }}</h4>
        <span class="meta">{{ semester.courses.length }} courses · {{ semester.credits }} credit hrs</span>
      </div>
      <span class="gpa-pill">{{ semester.gpa.toFixed(2) }}</span>
    </div>
    <button
      class="delete-btn"
      aria-label="Delete semester"
      @click.prevent.stop="$emit('delete', semester)"
    >
      🗑
    </button>
  </RouterLink>
</template>

<style scoped>
.semester-card {
  position: relative;
  display: block;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}
.semester-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
}

h4 {
  margin: 0;
}

.meta {
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}

.gpa-pill {
  font-family: var(--font-mono);
  font-weight: 700;
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-body-sm);
}

.delete-btn {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  background: var(--color-surface-sunken);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  color: var(--color-ink-500);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast), background var(--transition-fast), color var(--transition-fast);
}
.semester-card:hover .delete-btn {
  opacity: 1;
}
.delete-btn:hover {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
