// controllers/employeeController.js

const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  try {
    // Check if the department query parameter is present in the request URL
    if (req.query.department) {
      // If department is provided, filter employees by department
      const employees = await Employee.find({ department: req.query.department });
      res.status(200).json(employees);
    } else {
      // If no department is provided, return all employees
      const employees = await Employee.find();
      res.status(200).json(employees);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
