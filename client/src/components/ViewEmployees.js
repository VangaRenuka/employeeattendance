import React, { useEffect, useState } from 'react';
import './ViewEmployees.css';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    if (!managerId) return;

    fetch(`http://localhost:5000/api/view/by-manager?manager_id=${managerId}`)
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Error fetching employees:', err));
  }, [managerId]);

  return (
    <div className="view-employees-container">
      <h2>Employees in Your Department</h2>
      <ul className="employee-list">
        {employees.map(emp => (
          <li key={emp.id} className="employee-card">
            <span><strong>Name:</strong> {emp.name}</span>
            <span><strong>Position:</strong> {emp.position}</span>
            <span><strong>Email:</strong> {emp.email}</span>
            <span><strong>Phone:</strong> {emp.phone}</span>
            <span><strong>Salary:</strong> ₹{emp.salary}</span>
            <span><strong>Joining Date:</strong> {emp.date_of_joining}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEmployees;



