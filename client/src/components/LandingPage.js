/*import React from 'react';

import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Employee Attendance System</h1>
      <div className="button-container">
        <button onClick={() => navigate('/admin-login')}>Admin Login</button>
        <button onClick={() => navigate('/employee-login')}>Employee Login</button>
      </div>
    </div>
  );
};

export default LandingPage;*/

/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaUserShield, FaUser } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Employee Attendance System</h1>
      <div className="button-container">
        <button onClick={() => navigate('/admin-login')}>
          <FaUserShield /> Admin Login
        </button>
        <button onClick={() => navigate('/employee-login')}>
          <FaUser /> Employee Login
        </button>
      </div>
      <div className="footer">© 2025 Renuka Systems. All rights reserved.</div>
    </div>
  );
};

export default LandingPage;*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaUserShield, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Make sure you place your logo in src/assets/

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading Attendance System...</p>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <img src={logo} alt="Company Logo" className="logo" />
      <h1>Welcome to Employee Attendance System</h1>
      <div className="button-container">
        <button onClick={() => navigate('/admin-login')}>
          <FaUserShield /> Admin Login
        </button>
        <button onClick={() => navigate('/employee-login')}>
          <FaUser /> Employee Login
        </button>
      </div>
      <div className="footer">© 2025 Renuka Systems. All rights reserved.</div>
    </div>
  );
};

export default LandingPage;



