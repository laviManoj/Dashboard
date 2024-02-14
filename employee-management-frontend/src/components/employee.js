// EmployeeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assests/Employee.css'; // Import CSS file for EmployeeList
import '../assests/Modal.css'; // Import CSS file for Modal

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    email: '',
    location:'',
    state:'',
    phone:'',
    department:''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees(); // Refresh employee list after deletion
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({
      ...newEmployeeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', newEmployeeData);
      fetchEmployees(); // Refresh employee list after addition
      setShowModal(false); // Close modal after successful addition
      alert('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <button onClick={() => setShowModal(true)}>Create Employee</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Department</th>
            <th>State</th>
            <th>Phone Number</th>

            
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.location}</td>
              <td>{employee.department}</td>
              <td>{employee.state}</td>
              <td>{employee.phone}</td>

              <td>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={newEmployeeData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={newEmployeeData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={newEmployeeData.location} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" value={newEmployeeData.department} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={newEmployeeData.state} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={newEmployeeData.phone} onChange={handleInputChange} required />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
