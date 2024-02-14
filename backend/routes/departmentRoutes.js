// routes/departmentRoutes.js

const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
// const { verifyToken, restrictTo } = require('../middleware/authMiddleware');

// Middleware to verify token and restrict access to managers
// router.use(verifyToken, restrictTo('manager'));

router.route('/')
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartment);

router.route('/:id')
  .get(departmentController.getDepartment)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
