/*const express = require('express');
const router = express.Router();
const { loginAsEmployee } = require('../controllers/employeeAuthController');

// Employee login endpoint
router.post('/login', loginAsEmployee);

module.exports = router;*/

// routes/employeeAuthRoutes.js
const express = require('express');
const router = express.Router();
const { loginAsEmployee } = require('../controllers/employeeAuthController');

router.post('/login', loginAsEmployee);

module.exports = router;

