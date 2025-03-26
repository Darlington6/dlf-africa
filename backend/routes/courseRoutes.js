const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

// Admin routes
router.post('/', 
  authController.protect, 
  authController.restrictTo('admin'),
  courseController.createCourse
);

// Student routes
router.get('/', courseController.getAllCourses);
router.post('/:courseId/enroll', 
  authController.protect,
  courseController.enrollCourse
);

module.exports = router;