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

// Public routes
router.get('/', courseController.getAllCourses);

// Protected student routes
router.post('/:courseId/enroll',
  authController.protect,
  courseController.enrollCourse
);

module.exports = router;