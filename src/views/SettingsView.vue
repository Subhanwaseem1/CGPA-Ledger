<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { useToast } from '../composables/useToast';
import BaseButton from '../components/ui/BaseButton.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';

const { resetToSampleData, clearAllData } = useAcademicRecord();
const toast = useToast();

const isDark = ref(localStorage.getItem('cgpa-calculator::theme') === 'dark');
const confirmClear = ref(false);

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('cgpa-calculator::theme', dark ? 'dark' : 'light');
}

onMounted(() => applyTheme(isDark.value));
watch(isDark, applyTheme);

function handleReset() {
  resetToSampleData();
  toast.success('Sample data restored.');
}

function handleClear() {
  clearAllData();
  toast.info('All records cleared.');
  confirmClear.value = false;
}
</script>

<template>
  <div class="page-wrap settings-view">
    <span class="eyebrow">Preferences</span>
    <h2>Settings</h2>

    <div class="card">
      <div class="setting-row">
        <div>
          <h4>Appearance</h4>
          <p>Toggle between light and dark ledger themes.</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="isDark" />
          <span class="slider" />
        </label>
      </div>
    </div>

    <div class="card">
      <h4>Data management</h4>
      <p>Your records are stored locally in the browser.</p>
      <div class="actions">
        <BaseButton variant="secondary" @click="handleReset">Restore sample data</BaseButton>
        <BaseButton variant="danger" @click="confirmClear = true">Clear all records</BaseButton>
      </div>
    </div>

    <ConfirmDialog
      :open="confirmClear"
      title="Clear all records?"
      message="This deletes every semester and course from local storage. This cannot be undone."
      confirm-label="Clear everything"
      @confirm="handleClear"
      @cancel="confirmClear = false"
    />
  </div>
</template>

<style scoped>
.settings-view h2 {
  margin: var(--space-1) 0 var(--space-6);
  font-size: var(--fs-display-md);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 640px;
  margin-bottom: var(--space-5);
}

.card h4 {
  margin: 0 0 var(--space-1);
}
.card p {
  margin: 0 0 var(--space-3);
  color: var(--color-ink-500);
  font-size: var(--fs-body-sm);
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex: none;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  inset: 0;
  background: var(--color-line);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform var(--transition-fast);
}
.switch input:checked + .slider {
  background: var(--color-accent);
}
.switch input:checked + .slider::before {
  transform: translateX(20px);
}
</style>
