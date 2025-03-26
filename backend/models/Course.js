const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: { type: String },
  thumbnail: { type: String },
  lessons: [{
    title: String,
    content: String,
    videoUrl: String,
    duration: Number
  }],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Add virtual field for frontend
CourseSchema.virtual('isEnrolled').get(function() {
  // This would be populated in the route handler based on the requesting user
  return false;
});

module.exports = mongoose.model('Course', CourseSchema);