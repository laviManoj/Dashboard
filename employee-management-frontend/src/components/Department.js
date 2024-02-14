// DepartmentList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assests/Department.css';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <div>
      <h2>Department List</h2>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Location</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <Link to="/employees">{department.Department}</Link>
              <td>{department.location}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
