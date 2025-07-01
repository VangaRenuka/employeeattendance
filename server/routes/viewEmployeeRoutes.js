const express = require('express');
const router = express.Router();
const { getEmployeesByManager } = require('../controllers/viewEmployeeController');

router.get('/by-manager', getEmployeesByManager);

module.exports = router;

