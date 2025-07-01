const express = require('express');
const router = express.Router();
const employeeReportController = require('../controllers/employeeReportController');

// GET attendance report for employees under manager's department
router.get('/attendance-report/:managerId', employeeReportController.getDepartmentAttendanceReport);

module.exports = router;



