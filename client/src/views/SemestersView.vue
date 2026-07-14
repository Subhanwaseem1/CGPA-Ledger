<script setup>
import { ref, onMounted } from 'vue';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { useToast } from '../composables/useToast';
import SemesterCard from '../components/semester/SemesterCard.vue';
import SemesterForm from '../components/semester/SemesterForm.vue';
import BaseModal from '../components/ui/BaseModal.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const { semestersWithGpa, addSemester, deleteSemester, fetchSemesters, loading } = useAcademicRecord();
const toast = useToast();

const showForm = ref(false);
const semesterPendingDelete = ref(null);

onMounted(() => {
  fetchSemesters();
});

async function handleCreate(payload) {
  await addSemester(payload);
  showForm.value = false;
  toast.success(`${payload.title} added.`);
}

async function confirmDelete() {
  if (!semesterPendingDelete.value) return;
  await deleteSemester(semesterPendingDelete.value.id);
  toast.info(`${semesterPendingDelete.value.title} removed.`);
  semesterPendingDelete.value = null;
}
</script>

<template>
  <div class="page-wrap">
    <section class="header-row">
      <div>
        <span class="eyebrow">Academic record</span>
        <h2>Semesters</h2>
      </div>
      <BaseButton @click="showForm = true">+ New semester</BaseButton>
    </section>

    <p v-if="loading" class="loading-text">Loading semesters...</p>

    <div v-else-if="semestersWithGpa.length" class="grid-cards">
      <SemesterCard
        v-for="semester in semestersWithGpa"
        :key="semester.id"
        :semester="semester"
        @delete="semesterPendingDelete = $event"
      />
    </div>
    <EmptyState v-else icon="🗂" title="No semesters yet" message="Create your first semester to begin tracking courses and GPA.">
      <template #action>
        <BaseButton @click="showForm = true">+ New semester</BaseButton>
      </template>
    </EmptyState>

    <BaseModal :open="showForm" title="New semester" size="sm" @close="showForm = false">
      <SemesterForm @save="handleCreate" @cancel="showForm = false" />
    </BaseModal>

    <ConfirmDialog
      :open="!!semesterPendingDelete"
      title="Delete semester?"
      :message="`This will permanently remove ${semesterPendingDelete?.title} and all of its courses.`"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="semesterPendingDelete = null"
    />
  </div>
</template>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-3);
}

h2 {
  margin: var(--space-1) 0 0;
  font-size: var(--fs-display-md);
}

.loading-text {
  text-align: center;
  color: var(--color-ink-500);
  padding: var(--space-8) 0;
}
</style>
