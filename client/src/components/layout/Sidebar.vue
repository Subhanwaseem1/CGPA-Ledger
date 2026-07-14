<script setup>
/**
 * Sidebar — receives `collapsed` state via Props (owned by DefaultLayout)
 * and emits `toggle` upward, following the "state lives in the parent,
 * child requests changes via emit" pattern used throughout this app.
 */
defineProps({
  collapsed: { type: Boolean, default: false },
});

defineEmits(['toggle']);

const links = [
  { to: { name: 'dashboard' }, label: 'Dashboard', icon: '⌂' },
  { to: { name: 'semesters' }, label: 'Semesters', icon: '☰' },
  { to: { name: 'what-if' }, label: 'What-If Planner', icon: '✦' },
  { to: { name: 'profile' }, label: 'Profile', icon: '◐' },
  { to: { name: 'settings' }, label: 'Settings', icon: '⚙' },
];
</script>

<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="brand">
      <span class="mark">Σ</span>
      <span v-if="!collapsed" class="wordmark">CGPA Ledger</span>
    </div>

    <nav class="nav">
      <RouterLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="nav-link"
        active-class="active"
      >
        <span class="nav-icon" aria-hidden="true">{{ link.icon }}</span>
        <span v-if="!collapsed" class="nav-label">{{ link.label }}</span>
      </RouterLink>
    </nav>

    <button class="collapse-btn" @click="$emit('toggle')" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
      {{ collapsed ? '»' : '«' }}
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--color-surface);
  border-right: 1px solid var(--color-line);
  display: flex;
  flex-direction: column;
  padding: var(--space-5) var(--space-3);
  transition: width var(--transition-base);
  position: relative;
  flex: none;
}
.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-2);
  margin-bottom: var(--space-8);
}

.mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--color-accent);
  flex: none;
}

.wordmark {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  white-space: nowrap;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-ink-700);
  font-weight: 500;
  font-size: var(--fs-body-sm);
  white-space: nowrap;
  overflow: hidden;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.nav-link:hover {
  background: var(--color-surface-sunken);
  color: var(--color-ink-900);
}

.nav-link.active {
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  font-weight: 600;
}

.nav-icon {
  width: 18px;
  text-align: center;
  flex: none;
}

.collapse-btn {
  align-self: center;
  background: var(--color-surface-sunken);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-pill);
  color: var(--color-ink-500);
  cursor: pointer;
}
.collapse-btn:hover {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>
