const Course = require('../models/Course');

// Admin - Create Course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { course }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Student - Enroll in Course
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Already enrolled in this course'
      });
    }

    // Add student to course
    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({
      status: 'success',
      data: { course }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Get All Courses (with enrollment status)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const coursesWithStatus = courses.map(course => ({
      ...course.toObject(),
      isEnrolled: req.user?.enrolledCourses?.includes(course._id) || false
    }));
    
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses: coursesWithStatus }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};