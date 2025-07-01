import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerLeaveRequests.css';

const ManagerLeaveRequests = () => {
  const managerId = localStorage.getItem('managerId');
  const [requests, setRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leave-requests/manager/${managerId}`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leave-requests/update/${id}`, { status });
      fetchLeaveRequests();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="leave-request-container">
      <h2>Leave Requests</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.employee_name}</td>
              <td>{req.from_date}</td>
              <td>{req.to_date}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                {req.status === 'Pending' && (
                  <>
                    <button className="approve-btn" onClick={() => handleStatusUpdate(req.id, 'Approved')}>Approve</button>
                    <button className="reject-btn" onClick={() => handleStatusUpdate(req.id, 'Rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerLeaveRequests;

