import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Mentorship from "./pages/Mentorship";
import DonationPage from "./pages/DonationPage";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseEnrollment from "./components/CourseEnrollment";
import CreateCourse from "./components/CreateCourse";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/footer" element={<Footer/>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/courses/new" element={
          <ProtectedRoute adminOnly={true}>
            <CreateCourse />
          </ProtectedRoute>
        } />
        
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        
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

        {/* Fallback route for 404 errors */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;