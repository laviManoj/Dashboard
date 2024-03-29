import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import DepartmentPage from './components/Department';
import EmployeesPage from './components/employee'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/employees/:department" element={<EmployeesPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
