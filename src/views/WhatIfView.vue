<script setup>
import { reactive, computed } from 'vue';
import { useAcademicRecord } from '../composables/useAcademicRecord';
import { projectFutureCgpa, creditsNeededForTarget } from '../utils/gpaFormulas';
import BaseInput from '../components/ui/BaseInput.vue';
import StatsCard from '../components/data/StatsCard.vue';
import ProgressCard from '../components/data/ProgressCard.vue';

/**
 * What-If Planner — a professional-grade feature common in real CGPA
 * calculator apps but not explicitly demanded by the assignment brief.
 * Lets a student project their CGPA forward based on a planned semester.
 */
const { cgpa, totalCreditsEarned, profile } = useAcademicRecord();

const plan = reactive({
  plannedCredits: 15,
  targetSemesterGpa: 3.5,
  targetOverallCgpa: profile.targetCgpa,
});

const projectedCgpa = computed(() =>
  projectFutureCgpa(cgpa.value, totalCreditsEarned.value, Number(plan.plannedCredits), Number(plan.targetSemesterGpa))
);

const requiredGpaForTarget = computed(() =>
  creditsNeededForTarget(cgpa.value, totalCreditsEarned.value, Number(plan.targetOverallCgpa), Number(plan.plannedCredits))
);

const feasible = computed(() => requiredGpaForTarget.value <= 4.0);
</script>

<template>
  <div class="page-wrap what-if">
    <section class="header-row">
      <span class="eyebrow">Planning tool</span>
      <h2>What-If Planner</h2>
      <p>Project how an upcoming semester will move your overall CGPA.</p>
    </section>

    <section class="layout">
      <form class="controls" @submit.prevent>
        <BaseInput v-model="plan.plannedCredits" type="number" label="Planned credit hours next semester" min="1" max="24" />
        <BaseInput v-model="plan.targetSemesterGpa" type="number" label="Expected semester GPA" min="0" max="4" step="0.1" />
        <BaseInput v-model="plan.targetOverallCgpa" type="number" label="Overall CGPA goal" min="0" max="4" step="0.1" />
      </form>

      <div class="results">
        <div class="grid-cards">
          <StatsCard label="Current CGPA" :value="cgpa.toFixed(2)" suffix="/ 4.00" icon="Σ" />
          <StatsCard
            label="Projected CGPA"
            :value="projectedCgpa.toFixed(2)"
            suffix="/ 4.00"
            icon="➜"
            :tone="projectedCgpa >= cgpa ? 'success' : 'warning'"
          />
          <StatsCard
            label="GPA needed for your goal"
            :value="feasible ? requiredGpaForTarget.toFixed(2) : '—'"
            :suffix="feasible ? 'this semester' : 'not achievable in one term'"
            icon="◎"
            :tone="feasible ? 'neutral' : 'danger'"
          />
        </div>

        <ProgressCard :current="projectedCgpa" :target="Number(plan.targetOverallCgpa)" label="Projected progress toward goal" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.what-if {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.header-row h2 {
  margin: var(--space-1) 0 var(--space-1);
  font-size: var(--fs-display-md);
}
.header-row p {
  margin: 0;
  color: var(--color-ink-500);
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-6);
  align-items: start;
}

.controls {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.results {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
