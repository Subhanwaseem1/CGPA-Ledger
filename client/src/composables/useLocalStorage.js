import { watch } from 'vue';

// Saves a reactive object to localStorage and restores it on page load.
export function persistToLocalStorage(key, state) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    }
  } catch (err) {
    console.warn(`[persistToLocalStorage] could not read "${key}"`, err);
  }

  watch(
    state,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn(`[persistToLocalStorage] could not write "${key}"`, err);
      }
    },
    { deep: true }
  );
}
