/**
 * Standard 4.0 letter-grade scale (HEC / University of Sialkot style).
 * Centralising the scale here means any future change (e.g. a different
 * university policy) only touches one file.
 */
export const GRADE_SCALE = [
  { letter: 'A',  points: 4.0, min: 85, band: 'a' },
  { letter: 'A-', points: 3.7, min: 80, band: 'a' },
  { letter: 'B+', points: 3.3, min: 75, band: 'b' },
  { letter: 'B',  points: 3.0, min: 71, band: 'b' },
  { letter: 'B-', points: 2.7, min: 68, band: 'b' },
  { letter: 'C+', points: 2.3, min: 64, band: 'c' },
  { letter: 'C',  points: 2.0, min: 61, band: 'c' },
  { letter: 'C-', points: 1.7, min: 58, band: 'c' },
  { letter: 'D+', points: 1.3, min: 54, band: 'd' },
  { letter: 'D',  points: 1.0, min: 50, band: 'd' },
  { letter: 'F',  points: 0.0, min: 0,  band: 'f' },
];

export const GRADE_LETTERS = GRADE_SCALE.map((g) => g.letter);

export function pointsForLetter(letter) {
  const entry = GRADE_SCALE.find((g) => g.letter === letter);
  return entry ? entry.points : 0;
}

export function bandForLetter(letter) {
  const entry = GRADE_SCALE.find((g) => g.letter === letter);
  return entry ? entry.band : 'f';
}

export function letterFromPercentage(pct) {
  const entry = GRADE_SCALE.find((g) => pct >= g.min);
  return entry ? entry.letter : 'F';
}
