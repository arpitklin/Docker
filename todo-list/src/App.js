import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaUser, FaDollarSign, FaTrash } from 'react-icons/fa';

const CardContainer = styled.div`
  //width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

// Styled component for the card title
const CardTitle = styled.h2`
  color: red;
`;

// Styled component for the card content
const CardContent = styled.p`
  color: #666;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: black;
  color: Black;
  padding: 20px;
`;

const Main = styled.main`
  max-width: 600px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  flex: 1 1 calc(33.33% - 20px); /* Adjusted width for three columns */
  max-width: calc(33.33% - 20px); /* Adjusted width for three columns */
`;

const IconInput = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  background-color: transparent;
  color: Black;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  ${({ invalid }) => invalid && `
    border-color: red;
  `}
  ${({ valid }) => valid && `
    border-color: green;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const RecordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecordItem = styled.div`
  flex-basis: calc(33.33% - 20px);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

const RecordDetails = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);
  const [filteredRecord, setFilteredRecord] = useState(null);
  const [emailValid, setEmailValid] = useState(true);

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
      const hireDate = new Date().toLocaleString();
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: name,
          email: email,
          phone: phone,
          hire_date: hireDate,
          salary: salary,
          department: department
        })
      });

      if (response.ok) {
        // Refresh records after successful addition
        refreshRecords();
        // Clear input fields after successful addition
        clearInputs();
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

  // Function to filter records based on search criteria
  const filteredRecords = records.filter(record => {
    return (
      record.first_name.toLowerCase().includes(name.toLowerCase()) &&
      record.email.toLowerCase().includes(email.toLowerCase())
    );
  });

  // Function to handle click on a filtered record to display details
  const handleRecordClick = (record) => {
    setFilteredRecord(record);
  };

  // Function to clear input fields
  const clearInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSalary('');
    setDepartment('');
    setEmailValid(true);
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to handle email change and validation
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validateEmail(emailValue));
  };

  return (
    <AppContainer>
    <>
     <CardContainer>
      <CardTitle>Employee Registration</CardTitle>
      <CardContent>
      <Main>
        <FormContainer>
          <FormGroup>
            <IconInput>
              <FaUser />
              <InputField
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </IconInput>
          </FormGroup>
          <FormGroup>
            <IconInput>
              <FaEnvelope />
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                invalid={!emailValid}
                valid={emailValid}
              />
            </IconInput>
          </FormGroup>
          <FormGroup>
            <IconInput>
              <FaPhone />
              <InputField
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </IconInput>
          </FormGroup>
          <FormGroup>
            <IconInput>
              <FaDollarSign />
              <InputField
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </IconInput>
          </FormGroup>
          <FormGroup>
            <IconInput>
              <FaUser />
              <InputField
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </IconInput>
          </FormGroup>
        </FormContainer>
        <ButtonGroup>
          <Button onClick={handleAddRecord}>Add Record</Button>
          <Button onClick={() => setShowRecords(!showRecords)}>
            {showRecords ? 'Hide Records' : 'Show Records'}
          </Button>
        </ButtonGroup>
        {showRecords && (
          <RecordsContainer>
            {filteredRecords.map(record => (
              <RecordItem key={record.employee_id} onClick={() => handleRecordClick(record)}>
                <div>{record.first_name} {record.last_name}</div>
                <div>Email: {record.email}</div>
                <Button onClick={() => handleDeleteRecord(record.employee_id)}><FaTrash /></Button>
              </RecordItem>
            ))}
          </RecordsContainer>
        )}
        {filteredRecord && (
          <RecordDetails>
            <h3>Employee Details</h3>
            <p>Name: {filteredRecord.first_name} {filteredRecord.last_name}</p>
            <p>Email: {filteredRecord.email}</p>
            <p>Phone: {filteredRecord.phone}</p>
            <p>Salary: {filteredRecord.salary}</p>
            <p>Department: {filteredRecord.department}</p>
          </RecordDetails>
        )}
      </Main>
      </CardContent>
    </CardContainer>
    </>
      
    </AppContainer>
  );
}

export default App;
