import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';
import AdminDashboard from './components/AdminDashboard'; // ✅ Import the dashboard
import AddEmployee from './components/AddEmployee';
import ViewEmployees from './components/ViewEmployees';
import EmployeeDashboard from './components/EmployeeDashboard'; // ✅ CORRECT
import ManagerAttendanceReport from './components/ManagerAttendanceReport';
import ManagerLeaveRequests from './components/ManagerLeaveRequests';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/add-employee" element={<AddEmployee />}/>
        <Route path="/view-details" element={<ViewEmployees />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> 
        <Route path="/manager-attendance-report" element={<ManagerAttendanceReport />} />
     <Route path="/leaves" element={<ManagerLeaveRequests />} />



      </Routes>
    </Router>
  );
};

export default App;

