const connection = require('../db');


exports.adminLogin = (req, res) => {
  const { manager_id, password, department_id } = req.body;
  console.log('Login attempt with:', req.body);

  const sql = `SELECT * FROM managers WHERE manager_id = ? AND password = ? AND department_id = ?`;
  console.log('SQL QUERY:', sql);

  connection.query(sql, [manager_id, password, department_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Query results:', results);

    if (results.length > 0) {
      // ✅ Success
      return res.status(200).json({ message: 'Login successful', manager: results[0] });
    } else {
      // ❌ Failed
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};
