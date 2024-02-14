// models/Department.js

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  Department:{
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
  // Add more fields as needed
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
