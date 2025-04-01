import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "../components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav-container')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
        <div className="nav-logo">
          <NavLink to="/" onClick={closeMobileMenu}>
            <img src="/logo.png" alt="DLF Africa Logo" className="logo-img" />
          </NavLink>
        </div>

        <div className={`mobile-menu-backdrop ${mobileMenuOpen ? 'active' : ''}`}></div>
        
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

        <div className={`nav-auth ${mobileMenuOpen ? "active" : ""}`}>
          {authLinks.map((link) => (
            link.path ? (
              <NavLink
                key={link.path}
                to={link.path}
                className={link.isPrimary ? "register-btn" : "auth-link"}
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

        <button
          className={`mobile-menu-button ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;