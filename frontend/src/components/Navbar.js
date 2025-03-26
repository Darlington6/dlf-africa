import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">DLF Africa</NavLink>
        </div>

        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/courses" onClick={() => setMobileMenuOpen(false)}>Courses</NavLink>
          <NavLink to="/mentorship" onClick={() => setMobileMenuOpen(false)}>Mentorship</NavLink>
          <NavLink to="/donation" onClick={() => setMobileMenuOpen(false)}>Donate</NavLink>
        </div>

        <div className={`nav-auth ${mobileMenuOpen ? "active" : ""}`}>
          {token ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
              <button onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="register-btn" onClick={() => setMobileMenuOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;