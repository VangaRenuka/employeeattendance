/*import React, { useState, useEffect, useCallback } from 'react';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [section, setSection] = useState('home');
  const [employee, setEmployee] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [isMarkedToday, setIsMarkedToday] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveMessage, setLeaveMessage] = useState('');

  const employeeId = localStorage.getItem('employeeId');
  const departmentId = localStorage.getItem('departmentId');
  const getStatusColor = (status) => {
  switch (status) {
    case 'Present':
      return 'green';
    case 'Absent':
      return 'red';
    case 'Leave':
      return 'orange';
    default:
      return 'black';
  }
};

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/employee-login';
  };

  const fetchLeaveHistory = useCallback(() => {
    fetch(`http://localhost:5000/api/leaves/employee/${employeeId}`)
      .then((res) => res.json())
      .then((data) => setLeaveHistory(data))
      .catch((err) => console.error('Error fetching leave history:', err));
  }, [employeeId]);

  const checkTodayAttendance = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);

    fetch(`http://localhost:5000/api/attendance/check/${employeeId}/${today}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.marked) {
          setIsMarkedToday(true);
          setAttendanceMessage(
  <>
    You have already marked attendance as{' '}
    <span style={{ color: getStatusColor(data.status), fontWeight: 'bold' }}>
      "{data.status}"
    </span>{' '}
    today.
  </>
);
        } else {
          setIsMarkedToday(false);
        }
      })
      .catch((err) => {
        console.error('Error checking attendance:', err);
      });
  }, [employeeId]);

  useEffect(() => {
    if (section === 'details') {
      fetch(`http://localhost:5000/api/employee-profile/${employeeId}`)
        .then((res) => res.json())
        .then((data) => setEmployee(data))
        .catch((err) => console.error('Error fetching employee details:', err));
    }

    if (section === 'attendance') {
      checkTodayAttendance();
    }

    if (section === 'leaves') {
      fetchLeaveHistory();
    }
  }, [section, checkTodayAttendance, fetchLeaveHistory, employeeId]);

  const handleMarkAttendance = () => {
    if (!attendanceStatus) {
      setAttendanceMessage('Please select a status.');
      return;
    }

    fetch('http://localhost:5000/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, status: attendanceStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendanceMessage(data.message);
        setIsMarkedToday(true);
      })
      .catch((err) => {
        console.error('Error marking attendance:', err);
        setAttendanceMessage('Error occurred while marking attendance.');
      });
  };

  const handleLeaveRequest = () => {
    if (!fromDate || !toDate || !reason) {
      setLeaveMessage('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/api/leaves/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, from_date: fromDate, to_date: toDate, reason }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLeaveMessage(data.message);
        setFromDate('');
        setToDate('');
        setReason('');
        fetchLeaveHistory(); // refresh history
      })
      .catch((err) => {
        console.error('Error requesting leave:', err);
        setLeaveMessage('Error occurred while requesting leave.');
      });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Employee Panel</h2>
        <nav>
          <ul>
            <li onClick={() => setSection('home')}>Home</li>
            <li onClick={() => setSection('details')}>View Personal Details</li>
            <li onClick={() => setSection('attendance')}>Attendance</li>
            <li onClick={() => setSection('leaves')}>Leaves</li>
            <li onClick={handleLogout} className="logout-btn">Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-section">
        {section === 'home' && (
          <div className="welcome">
            <h2>Welcome Employee!</h2>
            <p><strong>Employee ID:</strong> {employeeId}</p>
            <p><strong>Department ID:</strong> {departmentId}</p>
          </div>
        )}

        {section === 'details' && (
          <div className="details-section">
            <h2>Personal Details</h2>
            {employee ? (
              <div className="details-card">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Department ID:</strong> {employee.department_id}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Salary:</strong> {employee.salary}</p>
                <p><strong>Joining Date:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
                <p><strong>Department Name:</strong> {employee.department_name}</p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </div>
        )}

        {section === 'attendance' && (
          <div className="attendance-section">
            <h2>Mark Attendance</h2>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>

            {isMarkedToday ? (
              <p className="info-message">{attendanceMessage}</p>
            ) : (
              <>
                <label>Select Status:</label>
                <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>

                <button onClick={handleMarkAttendance}>Mark Attendance</button>
                {attendanceMessage && <p className="info-message">{attendanceMessage}</p>}
              </>
            )}
          </div>
        )}

        {section === 'leaves' && (
          <div className="leave-section">
            <h2>Leave Request</h2>
            <div className="leave-form">
              <label>From Date:</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

              <label>To Date:</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

              <label>Reason:</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />

              <button onClick={handleLeaveRequest}>Submit Leave Request</button>
              {leaveMessage && <p className="info-message">{leaveMessage}</p>}
            </div>

            <div className="leave-history">
              <h3>Leave History</h3>
              <table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td>{new Date(leave.from_date).toLocaleDateString()}</td>
                      <td>{new Date(leave.to_date).toLocaleDateString()}</td>
                      <td>{leave.reason}</td>
                      <td className={leave.status.toLowerCase()}>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;*/

import React, { useState, useEffect, useCallback } from 'react';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [section, setSection] = useState('home');
  const [employee, setEmployee] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [isMarkedToday, setIsMarkedToday] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveMessage, setLeaveMessage] = useState('');

  const employeeId = localStorage.getItem('employeeId');
  const departmentId = localStorage.getItem('departmentId');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'green';
      case 'Absent':
        return 'red';
      case 'Leave':
        return 'orange';
      default:
        return 'black';
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/employee-login';
  };

  const fetchLeaveHistory = useCallback(() => {
    fetch(`http://localhost:5000/api/leaves/employee/${employeeId}`)
      .then((res) => res.json())
      .then((data) => setLeaveHistory(data))
      .catch((err) => console.error('Error fetching leave history:', err));
  }, [employeeId]);

  const checkTodayAttendance = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);

    fetch(`http://localhost:5000/api/attendance/check/${employeeId}/${today}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.marked) {
          setIsMarkedToday(true);
          setAttendanceMessage(
            <>
              You have already marked attendance as{' '}
              <span style={{ color: getStatusColor(data.status), fontWeight: 'bold' }}>
                "{data.status}"
              </span>{' '}
              today.
            </>
          );
        } else {
          setIsMarkedToday(false);
        }
      })
      .catch((err) => {
        console.error('Error checking attendance:', err);
      });
  }, [employeeId]);

  useEffect(() => {
    if (section === 'details') {
      fetch(`http://localhost:5000/api/employee-profile/${employeeId}`)
        .then((res) => res.json())
        .then((data) => setEmployee(data))
        .catch((err) => console.error('Error fetching employee details:', err));
    }

    if (section === 'attendance') {
      checkTodayAttendance();
    }

    if (section === 'leaves') {
      fetchLeaveHistory();
    }
  }, [section, checkTodayAttendance, fetchLeaveHistory, employeeId]);

  const handleMarkAttendance = () => {
    if (!attendanceStatus) {
      setAttendanceMessage('Please select a status.');
      return;
    }

    fetch('http://localhost:5000/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, status: attendanceStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendanceMessage(data.message);
        setIsMarkedToday(true);
      })
      .catch((err) => {
        console.error('Error marking attendance:', err);
        setAttendanceMessage('Error occurred while marking attendance.');
      });
  };

  const handleLeaveRequest = () => {
    if (!fromDate || !toDate || !reason) {
      setLeaveMessage('Please fill in all fields.');
      return;
    }

    if (toDate < fromDate) {
      setLeaveMessage('To Date cannot be earlier than From Date.');
      return;
    }

    fetch('http://localhost:5000/api/leaves/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, from_date: fromDate, to_date: toDate, reason }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLeaveMessage(data.message);
        setFromDate('');
        setToDate('');
        setReason('');
        fetchLeaveHistory();
      })
      .catch((err) => {
        console.error('Error requesting leave:', err);
        setLeaveMessage('Error occurred while requesting leave.');
      });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Employee Panel</h2>
        <nav>
          <ul>
            <li onClick={() => setSection('home')}>Home</li>
            <li onClick={() => setSection('details')}>View Personal Details</li>
            <li onClick={() => setSection('attendance')}>Attendance</li>
            <li onClick={() => setSection('leaves')}>Leaves</li>
            <li onClick={handleLogout} className="logout-btn">Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-section">
        {section === 'home' && (
          <div className="welcome">
            <h2>Welcome Employee!</h2>
            <p><strong>Employee ID:</strong> {employeeId}</p>
            <p><strong>Department ID:</strong> {departmentId}</p>
          </div>
        )}

        {section === 'details' && (
          <div className="details-section">
            <h2>Personal Details</h2>
            {employee ? (
              <div className="details-card">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Department ID:</strong> {employee.department_id}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Salary:</strong> {employee.salary}</p>
                <p><strong>Joining Date:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
                <p><strong>Department Name:</strong> {employee.department_name}</p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </div>
        )}

        {section === 'attendance' && (
          <div className="attendance-section">
            <h2>Mark Attendance</h2>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>

            {isMarkedToday ? (
              <p className="info-message">{attendanceMessage}</p>
            ) : (
              <>
                <label>Select Status:</label>
                <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                  <option value="Halfday">Halfday</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Weekoff">Weekoff</option>
                </select>

                <button onClick={handleMarkAttendance}>Mark Attendance</button>
                {attendanceMessage && <p className="info-message">{attendanceMessage}</p>}
              </>
            )}
          </div>
        )}

        {section === 'leaves' && (
          <div className="leave-section">
            <h2>Leave Request</h2>
            <div className="leave-form">
              <label>From Date:</label>
              <input
                type="date"
                value={fromDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  if (toDate && e.target.value > toDate) {
                    setToDate('');
                  }
                }}
              />

              <label>To Date:</label>
              <input
                type="date"
                value={toDate}
                min={    fromDate
      ? new Date(new Date(fromDate).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      : ""
  }
                onChange={(e) => setToDate(e.target.value)}
              />

              <label>Reason:</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />

              <button onClick={handleLeaveRequest}>Submit Leave Request</button>
              {leaveMessage && <p className="info-message">{leaveMessage}</p>}
            </div>

            <div className="leave-history">
              <h3>Leave History</h3>
              <table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td>{new Date(leave.from_date).toLocaleDateString()}</td>
                      <td>{new Date(leave.to_date).toLocaleDateString()}</td>
                      <td>{leave.reason}</td>
                      <td className={leave.status.toLowerCase()}>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;



