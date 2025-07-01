import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department_id: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employee/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Employee Added!');
        navigate('/admin-dashboard');
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      alert('❌ Server Error');
      console.error(err);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <div className="form-scroll-wrapper">
      <form onSubmit={handleSubmit} className="add-employee-form">
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} />
        <input type="text" name="position" placeholder="Position" required onChange={handleChange} />
        <input type="number" name="salary" placeholder="Salary" required onChange={handleChange} />
        <input type="date" name="date_of_joining" placeholder="JoiningDate" required onChange={handleChange} />
        <input type="number" name="department_id" placeholder="Department ID" required onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>
      </div>
      <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>← Back to Dashboard</button>
    </div>
  );
};

export default AddEmployee;

