/*import React, { useEffect, useState } from 'react';
import './ManagerAttendanceReport.css';

const ManagerAttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

 const managerId = localStorage.getItem('managerId');
 // Manager is logged in

  useEffect(() => {
    fetch(`http://localhost:5000/api/manager/attendance-report/${managerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReport(data);
        } else {
          console.error("Unexpected data:", data);
          setReport([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching report:', err);
        setLoading(false);
      });
  }, [managerId]);

  return (
    <div className="attendance-report-container">
      <h2>📊 Department Attendance Report</h2>
      {loading ? (
        <p className="loading-text">Loading report...</p>
      ) : report.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {report.map((entry, index) => (
              <tr key={index}>
                <td>{entry.employee_id}</td>
                <td>{entry.name}</td>
                <td>{entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}</td>
                <td className={`status ${entry.status?.toLowerCase() || 'unknown'}`}>{entry.status || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerAttendanceReport;*/

import React, { useEffect, useState } from 'react';
import './ManagerAttendanceReport.css';

const ManagerAttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    fetch(`http://localhost:5000/api/manager/attendance-report/${managerId}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching report:', err);
        setLoading(false);
      });
  }, [managerId]);

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Email', 'Department', 'Date', 'Status'];
    const rows = report.map(entry => [
      entry.employee_id,
      entry.name,
      entry.email,
      entry.department_name,
      entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A',
      entry.status || 'N/A'
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="attendance-report-container">
      <div className="header">
        <h2>📊 Department Attendance Report</h2>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading report...</p>
      ) : report.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div className="table-wrapper">
          <div className="table-scroll-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {report.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.employee_id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.department_name}</td>
                  <td>{entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}</td>
                  <td className={`status ${entry.status?.toLowerCase() || 'unknown'}`}>
                    {entry.status || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerAttendanceReport;
