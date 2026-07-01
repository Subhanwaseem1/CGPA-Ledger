import { reactive, computed, readonly } from 'vue';
import { buildSampleSemesters, sampleStudentProfile } from '../data/sampleData';
import { generateId } from '../utils/id';
import { calculateSemesterGpa, calculateCgpa, totalCredits } from '../utils/gpaFormulas';
import { persistToLocalStorage } from './useLocalStorage';

// Academic record store: holds semesters and profile in a module-level
// reactive object so any component can import it without prop drilling.
const state = reactive({
  profile: { ...sampleStudentProfile },
  semesters: buildSampleSemesters(),
});

persistToLocalStorage('cgpa-calculator::record', state);

// ---- Getters ----------------------------------------------------------

const semestersWithGpa = computed(() =>
  state.semesters
    .slice()
    .sort((a, b) => a.year - b.year || a.term.localeCompare(b.term))
    .map((s) => ({
      ...s,
      gpa: calculateSemesterGpa(s.courses),
      credits: totalCredits(s.courses),
    }))
);

const cgpa = computed(() => calculateCgpa(state.semesters));

const totalCreditsEarned = computed(() =>
  state.semesters.reduce((sum, s) => sum + totalCredits(s.courses), 0)
);

const totalCoursesTaken = computed(() =>
  state.semesters.reduce((sum, s) => sum + s.courses.length, 0)
);

const bestSemester = computed(() => {
  const list = semestersWithGpa.value;
  if (!list.length) return null;
  return list.reduce((best, s) => (s.gpa > best.gpa ? s : best), list[0]);
});

const cgpaTrend = computed(() => semestersWithGpa.value.map((s) => ({ label: s.title, value: s.gpa })));

function findSemester(semesterId) {
  return state.semesters.find((s) => s.id === semesterId) || null;
}

// ---- Actions (mutations) ----------------------------------------------

function addSemester({ title, term, year }) {
  const semester = { id: generateId('sem'), title, term, year, courses: [] };
  state.semesters.push(semester);
  return semester;
}

function updateSemester(semesterId, patch) {
  const semester = findSemester(semesterId);
  if (semester) Object.assign(semester, patch);
}

function deleteSemester(semesterId) {
  const index = state.semesters.findIndex((s) => s.id === semesterId);
  if (index !== -1) state.semesters.splice(index, 1);
}

function addCourse(semesterId, courseData) {
  const semester = findSemester(semesterId);
  if (!semester) return null;
  const course = { id: generateId('course'), ...courseData };
  semester.courses.push(course);
  return course;
}

function updateCourse(semesterId, courseId, patch) {
  const semester = findSemester(semesterId);
  if (!semester) return;
  const course = semester.courses.find((c) => c.id === courseId);
  if (course) Object.assign(course, patch);
}

function deleteCourse(semesterId, courseId) {
  const semester = findSemester(semesterId);
  if (!semester) return;
  const index = semester.courses.findIndex((c) => c.id === courseId);
  if (index !== -1) semester.courses.splice(index, 1);
}

function updateProfile(patch) {
  Object.assign(state.profile, patch);
}

function resetToSampleData() {
  state.semesters = buildSampleSemesters();
  state.profile = { ...sampleStudentProfile };
}

function clearAllData() {
  state.semesters = [];
}

export function useAcademicRecord() {
  return {
    // read-only state exposed to components
    profile: readonly(state.profile),
    semesters: readonly(state.semesters),

    // getters
    semestersWithGpa,
    cgpa,
    totalCreditsEarned,
    totalCoursesTaken,
    bestSemester,
    cgpaTrend,
    findSemester,

    // actions
    addSemester,
    updateSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
    updateProfile,
    resetToSampleData,
    clearAllData,
  };
}
