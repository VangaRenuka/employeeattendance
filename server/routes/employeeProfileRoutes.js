const express = require('express');
const router = express.Router();
const profileController = require('../controllers/employeeProfileController');

// GET employee profile by ID
router.get('/:id', profileController.getEmployeeProfile);

module.exports = router;
