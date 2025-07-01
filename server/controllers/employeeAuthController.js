/*const db = require('../db');

// Employee Login Controller
exports.loginAsEmployee = async (req, res) => {
  const { email, phone } = req.body;
   if (!email || !phone) {
    return res.status(400).json({ message: 'Email and phone are required' });
  }
  try {
    const [rows] = await db.query(
      'SELECT id AS employeeId, department_id AS departmentId FROM employees WHERE email = ? AND phone = ?',
      [email, phone]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or phone number' });
    }

    res.status(200).json({
      message: 'Login successful',
      employeeId: rows[0].employeeId,
      departmentId: rows[0].departmentId
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};*/

// controllers/employeeAuthController.js
const db = require('../db');

exports.loginAsEmployee = (req, res) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: 'Email and phone are required' });
  }

  const query = 'SELECT id AS employeeId, department_id AS departmentId FROM employees WHERE email = ? AND phone = ?';
  db.query(query, [email, phone], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or phone number' });
    }

    const { employeeId, departmentId } = results[0];
    res.status(200).json({
      message: 'Login successful',
      employeeId,
      departmentId
    });
  });
};

