const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// DB connection
const connection = require('./db');

app.use(cors());
app.use(bodyParser.json());

// Routes
try {
  const adminRoutes = require('./routes/admin');
  app.use('/api/admin', adminRoutes);
} catch (err) {
  console.error('❌ Error loading adminRoutes:', err.stack); // more detail
}
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
app.use('/api/dashboard', adminDashboardRoutes); 

const employeeRoutes = require('./routes/employee');
app.use('/api/employee', employeeRoutes); 

const viewEmployeeRoutes = require('./routes/viewEmployeeRoutes');
app.use('/api/view', viewEmployeeRoutes);

const employeeAuthRoutes = require('./routes/employeeAuthRoutes');
app.use('/api/employee-auth', employeeAuthRoutes);

const employeeProfileRoutes = require('./routes/employeeProfileRoutes');
app.use('/api/employee-profile', employeeProfileRoutes);

const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api/attendance', attendanceRoutes);

const leaveRoutes = require('./routes/leaveRoutes');
app.use('/api/leaves', leaveRoutes);

const employeeReportRoutes = require('./routes/employeeReport');
app.use('/api/manager', employeeReportRoutes);

const leaveRequestRoutes = require('./routes/leaveRequestRoutes');
app.use('/api/leave-requests', leaveRequestRoutes);


// Server start

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


