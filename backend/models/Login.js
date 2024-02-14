// models/Employee.js

const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String // 'employee' or 'manager'
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
