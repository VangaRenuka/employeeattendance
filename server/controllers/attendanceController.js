const db = require('../db');

// ✅ Mark attendance
exports.markAttendance = (req, res) => {
  const { employeeId, status } = req.body;
  const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  // Step 1: Check if already marked
  db.execute(
    'SELECT * FROM attendance WHERE employee_id = ? AND date = ?',
    [employeeId, today],
    (err, results) => {
      if (err) {
        console.error('Error checking attendance:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Attendance already marked for today' });
      }

      // Step 2: Insert attendance
      db.execute(
        'INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)',
        [employeeId, today, status],
        (err2, insertResult) => {
          if (err2) {
            console.error('Error inserting attendance:', err2);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(200).json({ message: 'Attendance marked successfully' });
        }
      );
    }
  );
};

// ✅ Check if attendance is already marked
exports.checkAttendance = (req, res) => {
  const { employeeId, date } = req.params;

  db.execute(
    'SELECT status FROM attendance WHERE employee_id = ? AND date = ?',
    [employeeId, date],
    (err, results) => {
      if (err) {
        console.error('Error checking attendance:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        // Already marked
        res.json({ marked: true, status: results[0].status });
      } else {
        // Not marked
        res.json({ marked: false });
      }
    }
  );
};
