const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'arpit',
  password: 'arpit',
  database: 'Employees'
});

// Connect to MySQL database
connection.connect();

// Add CORS middleware
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define API endpoint to fetch data from MySQL
app.get('/api/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to add data to MySQL
app.post('/api/employees', (req, res) => {
  const { first_name, last_name, email, phone, hire_date, job_title, salary, department } = req.body;

  // Insert data into the MySQL database
  connection.query('INSERT INTO employees (first_name, last_name, email, phone, hire_date, job_title, salary, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, phone, hire_date, job_title, salary, department],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.json({ message: 'Record added successfully' });
      }
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

