import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [manager_id, setManagerId] = useState('');
  const [password, setPassword] = useState('');
  const [department_id, setDepartmentId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manager_id,
          password,
          department_id: parseInt(department_id),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('managerId', manager_id);
        alert('Login successful!');
        localStorage.setItem('admin', JSON.stringify(data));
        window.location.href = '/admin-dashboard';
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <select
            value={department_id}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="1">IT</option>
            <option value="2">HR</option>
            <option value="3">Marketing</option>
            <option value="4">Sales</option>
            <option value="5">Accounting</option>
          </select>

          <input
            type="text"
            placeholder="Manager ID"
            value={manager_id}
            onChange={(e) => setManagerId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;




