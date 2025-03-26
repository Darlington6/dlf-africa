import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseEnrollment = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data.courses);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(`/api/courses/${courseId}/enroll`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update UI
      setCourses(courses.map(c => 
        c._id === courseId ? { ...c, isEnrolled: true } : c
      ));
      alert('Enrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {courses.map(course => (
        <div key={course._id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Instructor: {course.instructor}</p>
          <p>Duration: {course.duration}</p>
          <p>Level: {course.level}</p>
          <button
            onClick={() => handleEnroll(course._id)}
            disabled={course.isEnrolled}
            className={course.isEnrolled ? 'enrolled' : ''}
          >
            {course.isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseEnrollment;