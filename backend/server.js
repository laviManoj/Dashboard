// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect('mongodb+srv://traveller:Manoj1999@traveller.ots9ysb.mongodb.net/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://traveller:Manoj1999@traveller.ots9ysb.mongodb.net/companyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);




// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
