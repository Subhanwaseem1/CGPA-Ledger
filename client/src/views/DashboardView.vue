<script setup>
import { computed, onMounted } from 'vue';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { classificationForCgpa } from '../utils/gpaFormulas';
import StatsCard from '../components/data/StatsCard.vue';
import ProgressCard from '../components/data/ProgressCard.vue';
import GPAChart from '../components/data/GPAChart.vue';
import SummaryCard from '../components/data/SummaryCard.vue';
import DataTable from '../components/data/DataTable.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { bandForLetter } from '../utils/gradeScale';

const {
  profile,
  semestersWithGpa,
  cgpa,
  totalCreditsEarned,
  totalCoursesTaken,
  bestSemester,
  cgpaTrend,
  loading,
  fetchSemesters,
  fetchProfile,
} = useAcademicRecord();

onMounted(() => {
  fetchSemesters();
  fetchProfile();
});

const classification = computed(() => classificationForCgpa(cgpa.value));
const recentSemesters = computed(() => semestersWithGpa.value.slice(-3).reverse());

const transcriptColumns = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Course' },
  { key: 'semester', label: 'Semester' },
  { key: 'creditHours', label: 'Credits', align: 'align-center' },
  { key: 'grade', label: 'Grade', align: 'align-right' },
];

const transcriptRows = computed(() =>
  semestersWithGpa.value
    .flatMap((s) => s.courses.map((c) => ({ ...c, semester: s.title })))
    .slice(-8)
    .reverse()
);
</script>

<template>
  <div class="page-wrap dashboard">
    <p v-if="loading" class="loading-text">Loading your records...</p>

    <template v-else>
      <section class="hero">
        <div>
          <span class="eyebrow">Overview</span>
          <h2>Welcome back{{ profile?.name ? ', ' + profile.name.split(' ')[0] : '' }}</h2>
          <p>Here's how your academic record is tracking this term.</p>
        </div>
        <RouterLink :to="{ name: 'semesters' }">
          <BaseButton>+ Log a semester</BaseButton>
        </RouterLink>
      </section>

      <section class="grid-cards stats-grid">
        <StatsCard label="Overall CGPA" :value="cgpa.toFixed(2)" suffix="/ 4.00" icon="Σ" :tone="classification.tone" :delta="classification.label" />
        <StatsCard label="Credit hours earned" :value="totalCreditsEarned" suffix="cr" icon="◧" />
        <StatsCard label="Courses completed" :value="totalCoursesTaken" icon="▤" />
        <StatsCard
          v-if="bestSemester"
          label="Strongest semester"
          :value="bestSemester.gpa.toFixed(2)"
          :suffix="bestSemester.title"
          icon="★"
          tone="success"
        />
      </section>

      <section class="split">
        <div class="chart-panel">
          <div class="panel-head">
            <h3>CGPA trend</h3>
            <span class="hint">Across {{ semestersWithGpa.length }} semester{{ semestersWithGpa.length === 1 ? '' : 's' }}</span>
          </div>
          <GPAChart v-if="cgpaTrend.length" :points="cgpaTrend" />
          <EmptyState v-else icon="📈" title="No semesters yet" message="Add your first semester to see your GPA trend." />
        </div>

        <ProgressCard :current="cgpa" :target="profile?.targetCgpa || 3.5" label="Target CGPA progress" />
      </section>

      <section class="recent">
        <div class="panel-head">
          <h3>Recent semesters</h3>
          <RouterLink :to="{ name: 'semesters' }" class="view-all">View all →</RouterLink>
        </div>
        <div v-if="recentSemesters.length" class="grid-cards">
          <RouterLink
            v-for="s in recentSemesters"
            :key="s.id"
            :to="{ name: 'semester-detail', params: { semesterId: s.id } }"
            class="card-link"
          >
            <SummaryCard :title="s.title" :subtitle="`${s.term} ${s.year}`" :gpa="s.gpa" :credits="s.credits" :course-count="s.courses.length" />
          </RouterLink>
        </div>
        <EmptyState v-else icon="🗂" title="No semesters recorded" message="Start by creating your first semester record." />
      </section>

      <section v-if="transcriptRows.length" class="transcript">
        <div class="panel-head">
          <h3>Latest transcript entries</h3>
          <span class="hint">Most recent {{ transcriptRows.length }} courses</span>
        </div>
        <DataTable :columns="transcriptColumns" :rows="transcriptRows">
          <template #cell-grade="{ row }">
            <span class="grade-chip" :class="`band-${bandForLetter(row.grade)}`">{{ row.grade }}</span>
          </template>
        </DataTable>
      </section>
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.loading-text {
  text-align: center;
  color: var(--color-ink-500);
  padding: var(--space-8) 0;
}

.hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero h2 {
  font-size: var(--fs-display-lg);
  margin: var(--space-1) 0;
}

.hero p {
  margin: 0;
  color: var(--color-ink-500);
}

.split {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-5);
  align-items: start;
}

.chart-panel,
.recent {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}
.recent {
  background: transparent;
  border: none;
  padding: 0;
}

.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.panel-head h3 {
  margin: 0;
  font-size: 1.1rem;
}

.hint {
  font-size: var(--fs-caption);
  color: var(--color-ink-500);
}

.view-all {
  font-size: var(--fs-body-sm);
  color: var(--color-accent);
  font-weight: 600;
}

.card-link {
  display: block;
}

.grade-chip {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--fs-caption);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}
.band-a { background: var(--color-success-soft); color: var(--color-success); }
.band-b { background: var(--color-accent-soft); color: var(--color-accent-strong); }
.band-c { background: var(--color-warning-soft); color: var(--color-warning); }
.band-d { background: var(--color-warning-soft); color: var(--color-warning); }
.band-f { background: var(--color-danger-soft); color: var(--color-danger); }

@media (max-width: 900px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
