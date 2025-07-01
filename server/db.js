// db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Renu123',
  database: 'attendance_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;


