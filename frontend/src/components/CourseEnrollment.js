import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Now used in JSX
import './CourseEnrollment.css';

const CourseEnrollment = () => {
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Successfully enrolled!');
      fetchCourses();
      navigate('/courses'); // Redirect after enrollment
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Enrollment failed. Please try again.');
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    
    if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const endpoint = authMode === 'login' ? 'login' : 'register';
      const response = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        formData
      );

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        credential: credentialResponse.credential
      });

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      fetchCourses();
      navigate('/courses');
    } catch (error) {
      console.error('Google auth error:', error);
      alert('Google authentication failed');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="course-enrollment-container">
      <h2>Available Courses</h2>
      
      {!isAuthenticated ? (
        <div className="auth-prompt">
          <p>Please log in to view and enroll in courses</p>
          <button onClick={() => setShowAuthModal(true)}>Login/Signup</button>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Duration: {course.duration}</p>
              <p>Level: {course.level}</p>
              <button 
                onClick={() => handleEnroll(course._id)}
                disabled={course.isEnrolled}
              >
                {course.isEnrolled ? 'Enrolled' : 'Enroll'}
              </button>
            </div>
          ))}
        </div>
      )}

      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <button className="close-btn" onClick={() => setShowAuthModal(false)}>
              &times;
            </button>
            
            <h3>{authMode === 'login' ? 'Login' : 'Sign Up'}</h3>
            
            <div className="google-auth">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Google Login failed')}
              />
              <p>Or</p>
            </div>
            
            <form onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              
              {authMode === 'signup' && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              )}
              
              <button type="submit">
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            
            <p>
              {authMode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <span 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="auth-toggle"
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;