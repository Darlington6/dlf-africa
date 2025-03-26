import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/courses', courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Course created successfully!');
      navigate('/courses');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <div className="course-form">
      <h2>Create New Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={courseData.title}
          onChange={(e) => setCourseData({...courseData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={courseData.description}
          onChange={(e) => setCourseData({...courseData, description: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Instructor"
          value={courseData.instructor}
          onChange={(e) => setCourseData({...courseData, instructor: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g., 4 weeks)"
          value={courseData.duration}
          onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
          required
        />
        <select
          value={courseData.level}
          onChange={(e) => setCourseData({...courseData, level: e.target.value})}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;