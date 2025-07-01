const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/adminDashboardController');

// Get all employees under a department
router.get('/employees/:department_id', adminDashboardController.getEmployeesByDepartment);

// Search for a specific employee by ID and department
router.get('/employee/search', adminDashboardController.searchEmployeeById);

// Get attendance records for a specific date and department
router.get('/attendance', adminDashboardController.getAttendanceByDate);

// Get all leave requests under a department
router.get('/leaves/:department_id', adminDashboardController.getLeaveRequests);

// Update leave status (Approve or Reject)
router.put('/leave/update', adminDashboardController.updateLeaveStatus);

// Add a new employee
router.post('/employee/add', adminDashboardController.addEmployee);

module.exports = router;
