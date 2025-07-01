const db = require('../db');

// ✅ Request Leave
exports.requestLeave = (req, res) => {
  const { employeeId, from_date, to_date, reason } = req.body;

  const query = `
    INSERT INTO leaves (employee_id, from_date, to_date, reason)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(query, [employeeId, from_date, to_date, reason], (err, result) => {
    if (err) {
      console.error('Error requesting leave:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json({ message: 'Leave request submitted successfully' });
  });
};

// ✅ Get leave requests for employee
exports.getEmployeeLeaves = (req, res) => {
  const { employeeId } = req.params;

  db.execute(
    'SELECT * FROM leaves WHERE employee_id = ? ORDER BY from_date DESC',
    [employeeId],
    (err, results) => {
      if (err) {
        console.error('Error fetching leaves:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.status(200).json(results);
    }
  );
};
