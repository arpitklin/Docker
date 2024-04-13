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
app.get('/api/candidates', (req, res) => {
  connection.query('SELECT * FROM candidates', (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to add data to MySQL
app.post('/api/candidates', (req, res) => {
  const { name, email, phone, address } = req.body;

  // Insert data into the MySQL database
  connection.query('INSERT INTO candidates (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [name, email, phone, address],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.json({ message: 'Record added successfully' });
      }
    });
});

// Define API endpoint to delete data from MySQL
app.delete('/api/candidates/:id', (req, res) => {
  const id = req.params.id;

  // Delete record from the MySQL database
  connection.query('DELETE FROM candidates WHERE id = ?', id, (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
