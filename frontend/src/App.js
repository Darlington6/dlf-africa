import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Mentorship from "./pages/Mentorship";
import DonationPage from "./pages/DonationPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseEnrollment from "./components/CourseEnrollment"; // Add this import

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/courses" element={<CourseEnrollment />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/courses/new" element={
          <ProtectedRoute role="admin">
            <CreateCourse />
          </ProtectedRoute>
        } />
        
        {/* Updated Courses Route */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        
        {/* Add new route for enrollment */}
        <Route path="/courses/enroll/:courseId" element={
          <ProtectedRoute>
            <CourseEnrollment />
          </ProtectedRoute>
        } />

        <Route path="/mentorship" element={
          <ProtectedRoute>
            <Mentorship />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;