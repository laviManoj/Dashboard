import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import '../assests/Employee.css';
import '../assests/Modal.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const location = useLocation();
  const department = location.pathname.split('/').pop();
  const [showModal, setShowModal] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    email: '',
    location: '',
    state: '',
    phone: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, [department]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees?department=${department}`);
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
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
      fetchEmployees();
      setShowModal(false); // Close modal after successful addition
      alert('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleFilter = (filterValue) => {
    if (!filterValue) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee => 
        employee.location.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleSort = (sortBy) => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'location') {
        return a.location.localeCompare(b.location);
      }
    });
    setFilteredEmployees(sorted);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List: {department}</h2>
      <button onClick={() => setShowModal(true)}>Create New Employee</button>
      <div>
        <input type="text" placeholder="Filter by Name or Location" onChange={(e) => handleFilter(e.target.value)} />
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('location')}>Sort by Location</button>
      </div>
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
          {filteredEmployees.map((employee) => (
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
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Create New Employee</h2>
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

export default EmployeesPage;
