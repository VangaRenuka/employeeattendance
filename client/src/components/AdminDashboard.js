/*import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [managerData, setManagerData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    date_of_joining: ''
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) {
      setManagerData(admin);
      fetchDashboardData(admin.department_id);
    }
  }, []);

  const fetchDashboardData = async (departmentId) => {
    try {
      const [empRes, leaveRes, attRes] = await Promise.all([
        fetch(`http://localhost:5000/api/admin/employees?department_id=${departmentId}`),
        fetch(`http://localhost:5000/api/admin/leaves?department_id=${departmentId}`),
        fetch(`http://localhost:5000/api/admin/attendance?department_id=${departmentId}`),
      ]);

      const [empData, leaveData, attData] = await Promise.all([
        empRes.json(),
        leaveRes.json(),
        attRes.json(),
      ]);

      setEmployees(empData);
      setLeaves(leaveData);
      setAttendance(attData);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/admin-login';
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/add-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          department_id: managerData.department_id
        })
      });

      if (res.ok) {
        alert('Employee added successfully!');
        setForm({
          name: '',
          email: '',
          phone: '',
          position: '',
          salary: '',
          date_of_joining: ''
        });
        fetchDashboardData(managerData.department_id); // Refresh employee list
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add employee');
      }
    } catch (err) {
      console.error('Add employee error:', err);
      alert('Server error while adding employee');
    }
  };

  if (!managerData) {
    return <p>Loading admin data...</p>;
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <p>Manager: {managerData.manager_id}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        <section className="add-employee-section">
          <h3>Add New Employee</h3>
          <form className="add-employee-form" onSubmit={handleAddEmployee}>
            <input type="text" name="name" value={form.name} placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} required />
            <input type="text" name="position" value={form.position} placeholder="Position" onChange={handleChange} required />
            <input type="number" name="salary" value={form.salary} placeholder="Salary" onChange={handleChange} required />
            <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} required />
            <button type="submit">Add Employee</button>
          </form>
        </section>

        <section>
          <h3>Employees in Department</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Salary</th><th>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td><td>{emp.name}</td><td>{emp.email}</td><td>{emp.phone}</td><td>{emp.position}</td><td>{emp.salary}</td><td>{emp.date_of_joining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Attendance Records</h3>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(att => (
                <tr key={att.id}>
                  <td>{att.employee_id}</td><td>{att.date}</td><td>{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Leave Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th><th>From</th><th>To</th><th>Reason</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.employee_id}</td><td>{leave.from_date}</td><td>{leave.to_date}</td><td>{leave.reason}</td><td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
*/

/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // if you're using tokens
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span className="welcome-text">Welcome, Admin</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-buttons">
        <button onClick={() => navigate('/add-employee')}>➕ Add New Employee</button>
          <button onClick={() => navigate('/view-details')}>👨‍💼 View Employee Details</button>
        <button onClick={() => navigate('/manager-attendance-report')}>
  📊 Employees Attendance Report
</button>

        <button onClick={() => navigate('/leaves')}>📝 View Leave Requests</button>
      </div>
    </div>
  );
};

export default AdminDashboard;*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-header">
        <span className="welcome-text">Welcome, Admin</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="button-grid">
        <button onClick={() => navigate('/add-employee')}>➕ Add New Employee</button>
        <button onClick={() => navigate('/view-details')}>👨‍💼 View Employee Details</button>
        <button onClick={() => navigate('/manager-attendance-report')}>📊 Attendance Report</button>
        <button onClick={() => navigate('/leaves')}>📝 View Leave Requests</button>
      </div>
    </div>
  );
};

export default AdminDashboard;



