import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  creditHours: { type: Number, required: true },
  grade: { type: String, required: true },
});

const semesterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  term: { type: String, required: true },
  year: { type: Number, required: true },
  courses: [courseSchema],
}, { timestamps: true });

export default mongoose.model('Semester', semesterSchema);
