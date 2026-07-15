import { reactive, computed, ref, toRefs } from 'vue';
import api from '../api/axios.js';
import { calculateSemesterGpa, calculateCgpa, totalCredits } from '../utils/gpaFormulas';

const state = reactive({
  profile: null,
  semesters: [],
});

const loading = ref(false);
const error = ref('');

async function fetchSemesters() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await api.get('/semesters');
    state.semesters = data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load semesters';
  } finally {
    loading.value = false;
  }
}

async function fetchProfile() {
  try {
    const { data } = await api.get('/profile');
    state.profile = data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load profile';
  }
}

const semestersWithGpa = computed(() =>
  state.semesters
    .slice()
    .sort((a, b) => a.year - b.year || a.term.localeCompare(b.term))
    .map((s) => ({
      ...s,
      id: s._id,
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
  return state.semesters.find((s) => s._id === semesterId) || null;
}

async function addSemester({ title, term, year }) {
  const { data } = await api.post('/semesters', { title, term, year });
  state.semesters.push(data);
  return data;
}

async function updateSemester(semesterId, patch) {
  const semester = findSemester(semesterId);
  if (!semester) return;
  const { data } = await api.put(`/semesters/${semesterId}`, { ...semester, ...patch });
  const index = state.semesters.findIndex((s) => s._id === semesterId);
  if (index !== -1) state.semesters[index] = data;
}

async function deleteSemester(semesterId) {
  await api.delete(`/semesters/${semesterId}`);
  const index = state.semesters.findIndex((s) => s._id === semesterId);
  if (index !== -1) state.semesters.splice(index, 1);
}

async function addCourse(semesterId, courseData) {
  const { data } = await api.post(`/semesters/${semesterId}/courses`, courseData);
  const index = state.semesters.findIndex((s) => s._id === semesterId);
  if (index !== -1) state.semesters[index] = data;
  return data;
}

async function updateCourse(semesterId, courseId, patch) {
  const { data } = await api.put(`/semesters/${semesterId}/courses/${courseId}`, patch);
  const index = state.semesters.findIndex((s) => s._id === semesterId);
  if (index !== -1) state.semesters[index] = data;
}

async function deleteCourse(semesterId, courseId) {
  const { data } = await api.delete(`/semesters/${semesterId}/courses/${courseId}`);
  const index = state.semesters.findIndex((s) => s._id === semesterId);
  if (index !== -1) state.semesters[index] = data;
}

async function updateProfile(patch) {
  const { data } = await api.put('/profile', patch);
  state.profile = data;
}

function clearAllData() {
  state.semesters = [];
}

export function useAcademicRecord() {
  const { profile, semesters } = toRefs(state);
  return {
    profile,
    semesters,
    loading,
    error,

    semestersWithGpa,
    cgpa,
    totalCreditsEarned,
    totalCoursesTaken,
    bestSemester,
    cgpaTrend,
    findSemester,

    fetchSemesters,
    fetchProfile,
    addSemester,
    updateSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
    updateProfile,
    clearAllData,
  };
}
