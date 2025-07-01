const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

// ✅ Employee requests leave
router.post('/request', leaveController.requestLeave);

// ✅ View own leave requests
router.get('/employee/:employeeId', leaveController.getEmployeeLeaves);

module.exports = router;
