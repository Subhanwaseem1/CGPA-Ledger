import { pointsForLetter } from './gradeScale';

/**
 * Semester GPA = Σ(creditHours × gradePoint) / Σ(creditHours)
 * Courses with isRepeat=true are still included; the "improvement" logic
 * (excluding an earlier attempt) lives in calculateCgpa below, matching
 * how most transcript systems compute CGPA using the *latest* attempt.
 */
export function calculateSemesterGpa(courses = []) {
  const graded = courses.filter((c) => c.grade && c.creditHours > 0);
  const totalCredits = graded.reduce((sum, c) => sum + Number(c.creditHours), 0);
  if (totalCredits === 0) return 0;

  const qualityPoints = graded.reduce(
    (sum, c) => sum + Number(c.creditHours) * pointsForLetter(c.grade),
    0
  );

  return roundTo(qualityPoints / totalCredits, 2);
}

export function totalCredits(courses = []) {
  return courses.reduce((sum, c) => sum + Number(c.creditHours || 0), 0);
}

export function qualityPoints(courses = []) {
  return courses.reduce(
    (sum, c) => sum + Number(c.creditHours || 0) * pointsForLetter(c.grade),
    0
  );
}

/**
 * Overall CGPA across every semester. When a course code appears more than
 * once (a retake), only the attempt with the higher grade point counts —
 * this mirrors real transcript recalculation policies.
 */
export function calculateCgpa(semesters = []) {
  const allCourses = semesters.flatMap((s) => s.courses || []);
  const bestAttemptByCode = new Map();

  for (const course of allCourses) {
    if (!course.grade || !course.creditHours) continue;
    const key = course.code?.trim().toUpperCase() || course.id;
    const existing = bestAttemptByCode.get(key);
    const points = pointsForLetter(course.grade);
    if (!existing || points > pointsForLetter(existing.grade)) {
      bestAttemptByCode.set(key, course);
    }
  }

  const finalCourses = Array.from(bestAttemptByCode.values());
  const credits = totalCredits(finalCourses);
  if (credits === 0) return 0;

  return roundTo(qualityPoints(finalCourses) / credits, 2);
}

/**
 * "What-if" projection: given a current CGPA + credits earned so far,
 * and a planned set of future credit hours with a target grade average,
 * project the resulting CGPA.
 */
export function projectFutureCgpa(currentCgpa, creditsEarned, futureCredits, targetGpa) {
  const currentQuality = currentCgpa * creditsEarned;
  const futureQuality = targetGpa * futureCredits;
  const totalCr = creditsEarned + futureCredits;
  if (totalCr === 0) return 0;
  return roundTo((currentQuality + futureQuality) / totalCr, 2);
}

/**
 * Credits + target GPA required in the next semester to reach a target
 * overall CGPA — solved algebraically from the CGPA formula.
 */
export function creditsNeededForTarget(currentCgpa, creditsEarned, targetCgpa, plannedCredits) {
  const requiredQuality = targetCgpa * (creditsEarned + plannedCredits) - currentCgpa * creditsEarned;
  if (plannedCredits === 0) return 0;
  return roundTo(requiredQuality / plannedCredits, 2);
}

export function roundTo(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function classificationForCgpa(cgpa) {
  if (cgpa >= 3.7) return { label: 'Summa Cum Laude range', tone: 'success' };
  if (cgpa >= 3.3) return { label: 'Magna Cum Laude range', tone: 'success' };
  if (cgpa >= 3.0) return { label: 'Cum Laude range', tone: 'success' };
  if (cgpa >= 2.5) return { label: 'Good standing', tone: 'warning' };
  if (cgpa >= 2.0) return { label: 'Satisfactory standing', tone: 'warning' };
  return { label: 'Below minimum standing', tone: 'danger' };
}
