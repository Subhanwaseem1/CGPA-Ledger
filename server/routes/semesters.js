import { Router } from 'express';
import Semester from '../models/Semester.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const semesters = await Semester.find({ userId: req.userId }).sort({ year: 1, term: 1 });
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.userId });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, term, year, courses } = req.body;
    const semester = new Semester({ userId: req.userId, title, term, year, courses: courses || [] });
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, term, year, courses } = req.body;
    const semester = await Semester.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, term, year, courses },
      { new: true }
    );
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const semester = await Semester.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.json({ message: 'Semester deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/:id/courses', async (req, res) => {
  try {
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.userId });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    semester.courses.push(req.body);
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id/courses/:courseId', async (req, res) => {
  try {
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.userId });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    const course = semester.courses.id(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    Object.assign(course, req.body);
    await semester.save();
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id/courses/:courseId', async (req, res) => {
  try {
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.userId });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    semester.courses.pull({ _id: req.params.courseId });
    await semester.save();
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
