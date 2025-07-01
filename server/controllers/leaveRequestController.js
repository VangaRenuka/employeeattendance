/*const db = require('../db');

// Get all leave requests for a manager (based on department)
exports.getLeaveRequestsForManager = (req, res) => {
  const managerId = req.params.managerId;

  // Step 1: Get department_id from managers table
  db.execute(
    'SELECT department_id FROM managers WHERE manager_id = ?',
    [managerId],
    (err, managerResult) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (managerResult.length === 0) {
        return res.status(404).json({ message: 'Manager not found' });
      }

      const departmentId = managerResult[0].department_id;

      // Step 2: Get leave requests for employees in that department
      db.execute(
        `SELECT l.id, l.employee_id, e.name AS employee_name, l.from_date, l.to_date, l.reason, l.status
         FROM leaves l
         JOIN employees e ON l.employee_id = e.id
         WHERE e.department_id = ?`,
        [departmentId],
        (err2, leaveResults) => {
          if (err2) {
            console.error('Leave fetch error:', err2);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(200).json(leaveResults);
        }
      );
    }
  );
};

// Update leave status
exports.updateLeaveStatus = (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  db.execute(
    'UPDATE leaves SET status = ? WHERE id = ?',
    [status, requestId],
    (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.status(200).json({ message: 'Leave status updated' });
    }
  );
};*/

const db = require('../db');
const nodemailer = require('nodemailer');

// Configure transporter (use your own email and app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'renuvanga2718@gmail.com',     // 🔁 Replace with your email
    pass: 'wjfl ghih epuw mkze ',              // 🔁 Replace with app password (not your normal password)
  },
});

// Get all leave requests for a manager (based on department)
exports.getLeaveRequestsForManager = (req, res) => {
  const managerId = req.params.managerId;

  // Step 1: Get department_id from managers table
  db.execute(
    'SELECT department_id FROM managers WHERE manager_id = ?',
    [managerId],
    (err, managerResult) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (managerResult.length === 0) {
        return res.status(404).json({ message: 'Manager not found' });
      }

      const departmentId = managerResult[0].department_id;

      // Step 2: Get leave requests for employees in that department
      db.execute(
        `SELECT l.id, l.employee_id, e.name AS employee_name, l.from_date, l.to_date, l.reason, l.status
         FROM leaves l
         JOIN employees e ON l.employee_id = e.id
         WHERE e.department_id = ?`,
        [departmentId],
        (err2, leaveResults) => {
          if (err2) {
            console.error('Leave fetch error:', err2);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(200).json(leaveResults);
        }
      );
    }
  );
};

// Update leave status and send email
exports.updateLeaveStatus = (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  // Step 1: Update the leave status
  db.execute(
    'UPDATE leaves SET status = ? WHERE id = ?',
    [status, requestId],
    (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ message: 'Server error during update' });
      }

      // Step 2: Get employee email and details
      db.execute(
        `SELECT e.email, e.name, l.from_date, l.to_date 
         FROM leaves l 
         JOIN employees e ON l.employee_id = e.id 
         WHERE l.id = ?`,
        [requestId],
        (err2, result2) => {
          if (err2 || result2.length === 0) {
            console.error('Email fetch error:', err2);
            return res.status(500).json({ message: 'Leave updated but failed to get employee info' });
          }

          const { email, name, from_date, to_date } = result2[0];

          // Step 3: Send the notification email
          const subject = `Leave Request ${status}`;
          const text = `
Hi ${name},

Your leave request from ${from_date} to ${to_date} has been *${status}* by your manager.

Regards,
HR Portal
          `;

          transporter.sendMail({
            from: '"HR Portal" <renuvanga2718@gmail.com>',  // 🔁 Replace as needed
            to: email,
            subject,
            text,
          }, (mailErr, info) => {
            if (mailErr) {
              console.error('Email error:', mailErr);
              return res.status(500).json({ message: 'Leave status updated but email failed' });
            }

            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Leave status updated and email sent' });
          });
        }
      );
    }
  );
};





