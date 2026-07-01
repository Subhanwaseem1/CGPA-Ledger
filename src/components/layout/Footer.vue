<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <span>© {{ year }} CGPA Ledger — a University of Sialkot semester project.</span>
    <span class="version">Client build · v1.0.0</span>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-line);
  font-size: var(--fs-caption);
  color: var(--color-ink-300);
}

@media (max-width: 560px) {
  .app-footer {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
