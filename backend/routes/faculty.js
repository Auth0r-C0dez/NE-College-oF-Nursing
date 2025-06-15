import express from 'express';
import { body } from 'express-validator';
import Subject from '../models/Subject.js';
import Attendance from '../models/Attendance.js';
import { auth, isFaculty } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get assigned subjects
router.get('/subjects', auth, isFaculty, async (req, res) => {
  try {
    const subjects = await Subject.find({ faculty: req.user.id })
      .populate('course', 'name code');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get students for a subject
router.get('/subjects/:subjectId/students', auth, isFaculty, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    if (subject.faculty.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this subject' });
    }

    const students = await User.find({ role: 'student' })
      .select('username fullName email');
    
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark attendance
router.post('/attendance', auth, isFaculty, [
  body('student').notEmpty(),
  body('subject').notEmpty(),
  body('date').isDate(),
  body('status').isIn(['present', 'absent', 'late'])
], async (req, res) => {
  try {
    const attendance = new Attendance({
      ...req.body,
      markedBy: req.user.id
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get attendance history for a subject
router.get('/subjects/:subjectId/attendance', auth, isFaculty, async (req, res) => {
  try {
    const { date } = req.query;
    const subject = await Subject.findById(req.params.subjectId);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    if (subject.faculty.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this subject' });
    }

    const query = { subject: req.params.subjectId };
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query)
      .populate('student', 'username fullName')
      .sort({ date: -1 });
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 