// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assests/Login.css'; // Import CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { email, password, role });
      alert('Signup successful!');
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
};

export default Signup;
