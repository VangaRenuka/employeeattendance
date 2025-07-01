import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/employee-auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, phone })
})

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('employeeId', data.employeeId);
      localStorage.setItem('departmentId', data.departmentId);
      navigate('/employee-dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  /*return (
    <div className="employee-login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );*/
 return (
  <div className="employee-login-page">
    <div className="employee-login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  </div>
);

};

export default EmployeeLogin;
