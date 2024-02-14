// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DepartmentPage from './components/Department'
import EmployeePage from './components/employee'



function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/employees" element={<EmployeePage />} />


          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
