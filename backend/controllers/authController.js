const bcrypt = require('bcryptjs');
const Employee = require('../models/Login');

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
      email,
      password: hashedPassword,
      role
    });
    await employee.save();
    res.status(201).send("Employee created successfully!");
  } catch (error) {
    res.status(500).send("Error creating employee");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};
