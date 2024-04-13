import React, { useState, useEffect } from "react";
import "./Form.css";

const CoolForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [records, setRecords] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/candidates");
      if (!response.ok) {
        throw new Error("Failed to fetch data: " + response.statusText);
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorModalMessage("Error fetching data: " + error.message);
      setShowErrorModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Form submission failed: " + response.statusText);
      }
      console.log("Form submitted successfully");
      const responseData = await response.json();
      console.log("New record added:", responseData); // Log the newly added record
      fetchData(); // Update records
      setShowSuccessModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorModalMessage("Error submitting form: " + error.message);
      setShowErrorModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete record: " + response.statusText);
      }
      console.log("Record deleted successfully");
      fetchData(); // Update records after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
      setErrorModalMessage("Error deleting record: " + error.message);
      setShowErrorModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cool-form-container">
      <div className="custom-header">
        <h1 className="header-text">Candidate Information</h1>
      </div>
      <div className="content-container">
        <form onSubmit={handleSubmit} className="cool-form">
          <h2 className="header-text-1">Database Entry</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <div className="records-container">
          <h2>Records</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          {showErrorModal && (
            <div className="error-message">{errorModalMessage}</div>
          )}
          {filteredRecords.length === 0 ? (
            <p>No matching records found</p>
          ) : (
            <ul>
              {filteredRecords.map((record) => (
                <li key={record.id} className="records">
                  <span>
                    <strong>Name:</strong> {record.name}
                    <br />
                    <strong>Email:</strong> {record.email}
                    <br />
                  </span>
                  <button onClick={() => handleDelete(record.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showSuccessModal && (
        <Modal
          type="success"
          message="Record submitted successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

const Modal = ({ type, message, onClose }) => {
  return (
    <div className={`modal modal-${type}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CoolForm;
