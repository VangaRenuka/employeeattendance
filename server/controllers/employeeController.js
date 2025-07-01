// server/controllers/employeeController.js

const connection = require('../db'); // You imported as 'connection', use it below

// Add employee
exports.addEmployee = async (req, res) => {
  const { name, email, phone, position, salary, date_of_joining, department_id } = req.body;
  
  try {
    connection.query(
      'INSERT INTO employees (name, email, phone, position, salary, date_of_joining, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, position, salary, date_of_joining, department_id],
      (err, results) => {
        if (err) {
          console.error('❌ MySQL Insert Error:', err);
          return res.status(500).json({ message: 'Error adding employee' });
        }
        res.status(200).json({ message: '✅ Employee added successfully' });
      }
    );
  } catch (err) {
    console.error('❌ Server Error:', err);
    res.status(500).json({ message: 'Error adding employee' });
  }
};

