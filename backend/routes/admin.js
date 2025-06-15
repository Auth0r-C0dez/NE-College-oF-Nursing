import express from 'express';
import { body } from 'express-validator';
import { auth, isAdmin } from '../middleware/auth.js';
import Course from '../models/Course.js';
import Subject from '../models/Subject.js';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Get all courses
router.get('/courses', auth, isAdmin, async (req, res) => {
  try {
    const courses = await Course.find().populate('semesters.subjects');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course
router.post('/courses', auth, isAdmin, [
  body('name').notEmpty(),
  body('code').notEmpty(),
  body('description').notEmpty(),
  body('duration').isNumeric(),
  body('credits').isNumeric()
], async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Assign faculty to subject
router.post('/subjects/:subjectId/assign-faculty', auth, isAdmin, async (req, res) => {
  try {
    const { facultyId } = req.body;
    const subject = await Subject.findById(req.params.subjectId);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const faculty = await User.findOne({ _id: facultyId, role: 'faculty' });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    subject.faculty = facultyId;
    await subject.save();
    
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subject schedule
router.put('/subjects/:subjectId/schedule', auth, isAdmin, async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;
    const subject = await Subject.findById(req.params.subjectId);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    subject.schedule = { day, startTime, endTime };
    await subject.save();
    
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance records
router.get('/attendance', auth, isAdmin, async (req, res) => {
  try {
    const { subjectId, date } = req.query;
    const query = {};
    
    if (subjectId) query.subject = subjectId;
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query)
      .populate('student', 'username fullName')
      .populate('subject', 'name code')
      .populate('markedBy', 'username fullName');
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update attendance record (admin override)
router.put('/attendance/:attendanceId', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const attendance = await Attendance.findById(req.params.attendanceId);
    
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    attendance.status = status;
    attendance.markedBy = req.user._id;
    attendance.markedAt = new Date();
    await attendance.save();
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 
