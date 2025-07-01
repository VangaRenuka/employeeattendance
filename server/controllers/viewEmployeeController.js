
// Fetch all employees
/*exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM employees');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Error retrieving employees' });
  }
};*/

const connection = require('../db');

// Get employees by manager's department
exports.getEmployeesByManager = (req, res) => {
  const { manager_id } = req.query;

  if (!manager_id) {
    return res.status(400).json({ message: 'Manager ID required' });
  }

  // 1. Find manager's department
  const managerQuery = 'SELECT department_id FROM managers WHERE manager_id = ?';
  connection.query(managerQuery, [manager_id], (err, managerResults) => {
    if (err || managerResults.length === 0) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const departmentId = managerResults[0].department_id;

    // 2. Fetch employees in that department
    const employeeQuery = 'SELECT * FROM employees WHERE department_id = ?';
    connection.query(employeeQuery, [departmentId], (err, employeeResults) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching employees' });
      }
      res.status(200).json(employeeResults);
    });
  });
};

