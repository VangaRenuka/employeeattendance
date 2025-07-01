const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to mark attendance
router.post('/mark', attendanceController.markAttendance);

// Route to check if attendance is marked for a date
router.get('/check/:employeeId/:date', attendanceController.checkAttendance);

module.exports = router;

