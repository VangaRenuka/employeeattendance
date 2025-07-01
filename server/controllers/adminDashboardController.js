const connection = require('../db');

// 1. Get all employees under a department
exports.getEmployeesByDepartment = (req, res) => {
  const departmentId = req.params.department_id;

  const query = 'SELECT * FROM employees WHERE department_id = ?';
  connection.query(query, [departmentId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// 2. Search for an employee by ID under a department
exports.searchEmployeeById = (req, res) => {
  const { employee_id, department_id } = req.query;

  const query = 'SELECT * FROM employees WHERE id = ? AND department_id = ?';
  connection.query(query, [employee_id, department_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// 3. Get attendance for a department on a specific date
exports.getAttendanceByDate = (req, res) => {
  const { department_id, date } = req.query;

  const query = `
    SELECT e.id AS employee_id, e.name, a.date, a.status 
    FROM attendance a 
    JOIN employees e ON a.employee_id = e.id 
    WHERE e.department_id = ? AND a.date = ?
  `;
  connection.query(query, [department_id, date], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// 4. Get all leave requests under a department
exports.getLeaveRequests = (req, res) => {
  const departmentId = req.params.department_id;

  const query = `
    SELECT l.id AS leave_id, l.employee_id, e.name, e.position, l.from_date, l.to_date, l.reason, l.status
    FROM leaves l 
    JOIN employees e ON l.employee_id = e.id 
    WHERE e.department_id = ?
  `;
  connection.query(query, [departmentId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// 5. Update leave status (Approve/Reject)
exports.updateLeaveStatus = (req, res) => {
  const { leave_id, status } = req.body;

  const query = 'UPDATE leaves SET status = ? WHERE id = ?';
  connection.query(query, [status, leave_id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Leave status updated successfully' });
  });
};

// 6. Add a new employee
exports.addEmployee = (req, res) => {
  const {
    name, email, phone, department_id, position, salary, date_of_joining
  } = req.body;

  const query = `
    INSERT INTO employees 
    (name, email, phone, department_id, position, salary, date_of_joining) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [name, email, phone, department_id, position, salary, date_of_joining],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Employee added successfully', employee_id: result.insertId });
    }
  );
};
