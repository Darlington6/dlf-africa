import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="courses-container">
      <h1>Digital Literacy Courses</h1>
      <p className="subtitle">
        Browse and enroll in our comprehensive digital skills programs
      </p>

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p className="description">{course.description}</p>
            <div className="course-meta">
              <span>Level: {course.level}</span>
              <span>Duration: {course.duration}</span>
            </div>
            <Link
              to={`/courses/enroll/${course._id}`}
              className="enroll-button"
            >
              Enroll Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;