const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/leaveRequestController');

router.get('/manager/:managerId', leaveRequestController.getLeaveRequestsForManager);
router.put('/update/:requestId', leaveRequestController.updateLeaveStatus);

module.exports = router;

