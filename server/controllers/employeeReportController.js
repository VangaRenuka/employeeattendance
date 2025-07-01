/*const db = require('../db');

exports.getDepartmentAttendanceReport = (req, res) => {
  const managerId = req.params.managerId;

  // ✅ Get department from MANAGERS table (NOT employees)
  db.execute(
    'SELECT department_id FROM managers WHERE manager_id = ?',
    [managerId],
    (err, deptResult) => {
      if (err || deptResult.length === 0) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching manager department' });
      }

      const departmentId = deptResult[0].department_id;

      // ✅ Now get attendance of employees in that department
      db.execute(
        `SELECT e.id AS employee_id, e.name, a.date, a.status
         FROM employees e
         LEFT JOIN attendance a ON e.id = a.employee_id
         WHERE e.department_id = ?
         ORDER BY a.date DESC`,
        [departmentId],
        (err2, result) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ message: 'Error fetching attendance report' });
          }

          res.status(200).json(result);
        }
      );
    }
  );
};*/
const db = require('../db');

exports.getDepartmentAttendanceReport = (req, res) => {
  const managerId = req.params.managerId;

  // Step 1: Get department_id of the manager
  db.execute(
    'SELECT department_id FROM managers WHERE manager_id = ?',
    [managerId],
    (err, deptResult) => {
      if (err || deptResult.length === 0) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching manager department' });
      }

      const departmentId = deptResult[0].department_id;

      // Step 2: Fetch detailed attendance report of all employees in that department
      db.execute(
        `SELECT 
           e.id AS employee_id,
           e.name,
           e.email,
           e.phone,
           e.position,
           e.salary,
           d.department_name AS department_name,
           a.date,
           a.status
         FROM employees e
         LEFT JOIN attendance a ON e.id = a.employee_id
         LEFT JOIN departments d ON e.department_id = d.id
         WHERE e.department_id = ?
         ORDER BY a.date DESC`,
        [departmentId],
        (err2, result) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ message: 'Error fetching attendance report' });
          }

          res.status(200).json(result);
        }
      );
    }
  );
};




