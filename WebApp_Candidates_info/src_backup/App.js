import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:5000/api/employees')
      .then(response => response.json())
      .then(data => {
        // Set the fetched records directly to state
        setRecords(data);
      });
  }, []);

  const handleAddRecord = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: name,
          // Assuming you want to store age as well
          email: email
        })
      });

      if (response.ok) {
        // Refresh records after successful addition
        refreshRecords();
        // Clear input fields after successful addition
        setName('');
        setEmail('');
        console.log('Record added successfully');
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh records after successful deletion
        refreshRecords();
        console.log('Record deleted successfully');
      } else {
        console.error('Failed to delete record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Helper function to refresh records
  const refreshRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        console.error('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Employee Records</h1>
      <div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="var"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleAddRecord}>Add Record</button>
      </div>
      <div>
        {records.map(record => (
          <div key={record.employee_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{record.first_name} {record.last_name}</h3>
            <p>Email: {record.email}</p>
            <p>Phone: {record.phone}</p>
            <p>Hire Date: {record.hire_date}</p>
            <p>Job Title: {record.job_title}</p>
            <p>Salary: {record.salary}</p>
            <p>Department: {record.department}</p>
            <button onClick={() => handleDeleteRecord(record.employee_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

