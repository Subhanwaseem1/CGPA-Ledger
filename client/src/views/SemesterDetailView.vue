<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { useToast } from '../composables/useToast';
import { calculateSemesterGpa, totalCredits } from '../utils/gpaFormulas';
import CourseCard from '../components/course/CourseCard.vue';
import CourseForm from '../components/course/CourseForm.vue';
import BaseModal from '../components/ui/BaseModal.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import StatsCard from '../components/data/StatsCard.vue';

const props = defineProps({
  semesterId: { type: String, required: true },
});

const router = useRouter();
const { findSemester, addCourse, updateCourse, deleteCourse, fetchSemesters } = useAcademicRecord();
const toast = useToast();

onMounted(() => {
  fetchSemesters();
});

const semester = computed(() => findSemester(props.semesterId));
const gpa = computed(() => (semester.value ? calculateSemesterGpa(semester.value.courses) : 0));
const credits = computed(() => (semester.value ? totalCredits(semester.value.courses) : 0));

const showForm = ref(false);
const editingCourse = ref(null);
const coursePendingDelete = ref(null);

function openCreate() {
  editingCourse.value = null;
  showForm.value = true;
}

function openEdit(course) {
  editingCourse.value = course;
  showForm.value = true;
}

async function handleSave(payload) {
  if (editingCourse.value) {
    await updateCourse(props.semesterId, editingCourse.value._id, payload);
    toast.success('Course updated.');
  } else {
    await addCourse(props.semesterId, payload);
    toast.success(`${payload.title} added.`);
  }
  showForm.value = false;
  editingCourse.value = null;
}

async function confirmDelete() {
  if (!coursePendingDelete.value) return;
  await deleteCourse(props.semesterId, coursePendingDelete.value._id);
  toast.info(`${coursePendingDelete.value.title} removed.`);
  coursePendingDelete.value = null;
}
</script>

<template>
  <div v-if="semester" class="page-wrap detail-view">
    <button class="back-link" @click="router.push({ name: 'semesters' })">← Back to semesters</button>

    <section class="header-row">
      <div>
        <span class="eyebrow">{{ semester.term }} {{ semester.year }}</span>
        <h2>{{ semester.title }}</h2>
      </div>
      <BaseButton @click="openCreate">+ Add course</BaseButton>
    </section>

    <section class="grid-cards stats-row">
      <StatsCard label="Semester GPA" :value="gpa.toFixed(2)" suffix="/ 4.00" icon="Σ" />
      <StatsCard label="Credit hours" :value="credits" icon="◧" />
      <StatsCard label="Courses" :value="semester.courses.length" icon="▤" />
    </section>

    <section class="course-list">
      <CourseCard
        v-for="course in semester.courses"
        :key="course._id"
        :course="course"
        @edit="openEdit"
        @delete="coursePendingDelete = $event"
      />
      <EmptyState v-if="!semester.courses.length" icon="📘" title="No courses logged" message="Add the courses you took this semester to calculate your GPA.">
        <template #action>
          <BaseButton @click="openCreate">+ Add course</BaseButton>
        </template>
      </EmptyState>
    </section>

    <BaseModal :open="showForm" :title="editingCourse ? 'Edit course' : 'Add course'" @close="showForm = false">
      <CourseForm :course="editingCourse" @save="handleSave" @cancel="showForm = false" />
    </BaseModal>

    <ConfirmDialog
      :open="!!coursePendingDelete"
      title="Delete course?"
      :message="`Remove ${coursePendingDelete?.title} from this semester?`"
      confirm-label="Delete"
      @confirm="confirmDelete"
      @cancel="coursePendingDelete = null"
    />
  </div>

  <div v-else class="page-wrap">
    <EmptyState icon="❓" title="Semester not found" message="It may have been deleted.">
      <template #action>
        <BaseButton @click="router.push({ name: 'semesters' })">Back to semesters</BaseButton>
      </template>
    </EmptyState>
  </div>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.back-link {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--color-ink-500);
  font-size: var(--fs-body-sm);
  cursor: pointer;
  padding: 0;
}
.back-link:hover {
  color: var(--color-accent);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--space-3);
}

h2 {
  margin: var(--space-1) 0 0;
  font-size: var(--fs-display-md);
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
</style>
