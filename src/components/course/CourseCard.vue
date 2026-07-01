<script setup>
import { bandForLetter, pointsForLetter } from '../../utils/gradeScale';

/**
 * CourseCard — receives a `course` object via Props and communicates user
 * intent (edit/delete) upward via Emits. It never modifies the course
 * itself, keeping data mutation centralised in useAcademicRecord.
 */
defineProps({
  course: { type: Object, required: true },
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="course-card">
    <div class="info">
      <span class="code">{{ course.code }}</span>
      <h4>{{ course.title }}</h4>
      <span class="meta">{{ course.creditHours }} credit hrs · {{ pointsForLetter(course.grade).toFixed(1) }} quality pts</span>
    </div>
    <div class="right">
      <span class="grade-badge" :class="`band-${bandForLetter(course.grade)}`">{{ course.grade }}</span>
      <div class="row-actions">
        <button class="icon-btn" aria-label="Edit course" @click="$emit('edit', course)">✎</button>
        <button class="icon-btn danger" aria-label="Delete course" @click="$emit('delete', course)">🗑</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: border-color var(--transition-fast);
}
.course-card:hover {
  border-color: var(--color-accent);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.code {
  font-family: var(--font-mono);
  font-size: var(--fs-caption);
  color: var(--color-accent);
  font-weight: 600;
}

h4 {
  margin: 0;
  font-size: 0.98rem;
}

.meta {
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}

.right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: none;
}

.grade-badge {
  font-family: var(--font-mono);
  font-weight: 700;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-body-sm);
}

.band-a { background: var(--color-success-soft); color: var(--color-success); }
.band-b { background: var(--color-accent-soft); color: var(--color-accent-strong); }
.band-c { background: var(--color-warning-soft); color: var(--color-warning); }
.band-d { background: var(--color-warning-soft); color: var(--color-warning); }
.band-f { background: var(--color-danger-soft); color: var(--color-danger); }

.row-actions {
  display: flex;
  gap: var(--space-1);
}

.icon-btn {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--color-surface-sunken);
  color: var(--color-ink-500);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.icon-btn:hover {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}
.icon-btn.danger:hover {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
