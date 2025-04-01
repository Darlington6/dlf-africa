import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "../components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Close mobile menu when clicking any link
  const closeMobileMenu = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/courses", name: "Courses" },
    { path: "/mentorship", name: "Mentorship" },
    { path: "/donation", name: "Donate" }
  ];

  const authLinks = token
    ? [
        { path: "/dashboard", name: "Dashboard", icon: <FaUser /> },
        { action: handleLogout, name: "Logout", icon: <FaSignOutAlt /> }
      ]
    : [
        { path: "/login", name: "Login" },
        { path: "/register", name: "Register", isPrimary: true }
      ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <NavLink to="/" onClick={closeMobileMenu}>
            <img 
              src="/logo.png" 
              alt="DLF Africa Logo" 
              style={{ height: "40px" }}
            />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? "active" : ""} ${
                  link.path === "/donation" ? "donation-link" : ""
                }`
              }
              onClick={closeMobileMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Links */}
        <div className={`nav-auth ${mobileMenuOpen ? "active" : ""}`}>
          {authLinks.map((link) => (
            link.path ? (
              <NavLink
                key={link.path}
                to={link.path}
                className={link.isPrimary ? "register-btn" : ""}
                onClick={closeMobileMenu}
              >
                {link.icon && <span className="icon">{link.icon}</span>}
                {link.name}
              </NavLink>
            ) : (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  closeMobileMenu();
                }}
                className="logout-btn"
              >
                {link.icon && <span className="icon">{link.icon}</span>}
                {link.name}
              </button>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;