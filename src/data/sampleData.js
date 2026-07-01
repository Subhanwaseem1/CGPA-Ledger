import { generateId } from '../utils/id';

/**
 * Realistic sample academic record for a Software Engineering student.
 * Used to seed the app on first launch so the dashboard, charts, and
 * tables demonstrate real data instead of an empty state.
 */
export function buildSampleSemesters() {
  return [
    {
      id: generateId('sem'),
      title: 'Fall 2023',
      term: 'Fall',
      year: 2023,
      courses: [
        course('Introduction to Programming', 'CS-101', 3, 'A'),
        course('Calculus I', 'MT-105', 3, 'A-'),
        course('English Composition', 'HU-110', 2, 'B+'),
        course('Islamic Studies', 'HU-101', 2, 'A'),
        course('Applied Physics', 'PH-102', 3, 'B'),
      ],
    },
    {
      id: generateId('sem'),
      title: 'Spring 2024',
      term: 'Spring',
      year: 2024,
      courses: [
        course('Object Oriented Programming', 'CS-102', 3, 'A'),
        course('Discrete Structures', 'CS-104', 3, 'A-'),
        course('Calculus II', 'MT-205', 3, 'B+'),
        course('Digital Logic Design', 'CE-110', 3, 'B+'),
        course('Communication Skills', 'HU-112', 2, 'A'),
      ],
    },
    {
      id: generateId('sem'),
      title: 'Fall 2024',
      term: 'Fall',
      year: 2024,
      courses: [
        course('Data Structures & Algorithms', 'CS-201', 3, 'A-'),
        course('Database Systems', 'CS-205', 3, 'B+'),
        course('Software Requirements Engineering', 'SE-210', 3, 'A'),
        course('Linear Algebra', 'MT-210', 3, 'B'),
        course('Technical Report Writing', 'HU-201', 2, 'A-'),
      ],
    },
    {
      id: generateId('sem'),
      title: 'Spring 2025',
      term: 'Spring',
      year: 2025,
      courses: [
        course('Software Design & Architecture', 'SE-220', 3, 'A'),
        course('Operating Systems', 'CS-220', 3, 'B+'),
        course('Web Engineering', 'SE-230', 3, 'A'),
        course('Probability & Statistics', 'MT-230', 3, 'B+'),
        course('Computer Networks', 'CS-240', 3, 'B'),
      ],
    },
  ];
}

function course(title, code, creditHours, grade) {
  return {
    id: generateId('course'),
    title,
    code,
    creditHours,
    grade,
  };
}

export const sampleStudentProfile = {
  name: 'Muhammad Subhan',
  rollNumber: 'BSE-21-034',
  program: 'BS Software Engineering',
  department: 'Department of Software Engineering',
  university: 'University of Sialkot',
  targetCgpa: 3.7,
  avatarSeed: 'subhan',
};
