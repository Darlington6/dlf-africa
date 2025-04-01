import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Main navigation links
  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/courses", name: "Courses" },
    { path: "/mentorship", name: "Mentorship" },
    { path: "/donation", name: "Donate" }
  ];

  // Auth-related links (changes based on login status)
  const authLinks = token
    ? [
        { path: "/dashboard", name: "Dashboard", icon: <FaUser className="mr-1" /> },
        { action: handleLogout, name: "Logout", icon: <FaSignOutAlt className="mr-1" /> }
      ]
    : [
        { path: "/login", name: "Login" },
        { path: "/register", name: "Register", isPrimary: true }
      ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo section - using public folder */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center">
              {/* Using logo from public folder */}
              <img 
                src="/logo.png" 
                alt="DLF Africa Logo" 
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-green-700 hidden sm:block">
                DLF Africa
              </span>
            </NavLink>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-1 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? "text-green-600 border-b-2 border-green-600" 
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Auth buttons for desktop */}
            <div className="ml-6 flex items-center space-x-4">
              {authLinks.map((link) => (
                link.path ? (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      link.isPrimary
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.icon && <span className="inline-flex items-center">{link.icon}</span>}
                    {link.name}
                  </NavLink>
                ) : (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {link.icon}
                    {link.name}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive 
                        ? "bg-green-100 text-green-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-gray-200">
                {authLinks.map((link) => (
                  link.path ? (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium mb-2 ${
                        link.isPrimary
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.icon && <span className="inline-flex items-center">{link.icon}</span>}
                      {link.name}
                    </NavLink>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => {
                        link.action();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 mb-2"
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;