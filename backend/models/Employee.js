// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  email: String,
  name: String,
  location: String,
  department: String,
  state: String,
  phone:String
 
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
