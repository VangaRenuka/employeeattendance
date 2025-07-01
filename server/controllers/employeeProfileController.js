const db = require('../db');

exports.getEmployeeProfile = (req, res) => {
  const employeeId = req.params.id;

  const query = `
    SELECT 
      e.id,
      e.name,
      e.email,
      e.phone,
      e.department_id,
      e.position,
      e.salary,
      e.date_of_joining ,
      d.department_name
    
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    WHERE e.id = ?
  `;

  db.execute(query, [employeeId], (error, results) => {
    if (error) {
      console.error('Error fetching employee profile:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(results[0]);
  });
};

