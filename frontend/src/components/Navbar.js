import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="DLF Africa Logo" 
                className="h-10"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium ${
                    isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex items-center space-x-4 ml-4">
              {authLinks.map((link) => (
                link.path ? (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded ${
                      link.isPrimary
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.icon && <span className="mr-1">{link.icon}</span>}
                    {link.name}
                  </NavLink>
                ) : (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded flex items-center"
                  >
                    {link.icon && <span className="mr-1">{link.icon}</span>}
                    {link.name}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <div className="px-2 pt-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={toggleMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="px-2 pt-2 border-t border-gray-200 mt-2">
            {authLinks.map((link) => (
              link.path ? (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`block px-3 py-2 text-base font-medium mb-1 ${
                    link.isPrimary
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon && <span className="mr-1">{link.icon}</span>}
                  {link.name}
                </NavLink>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    link.action();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 mb-1"
                >
                  {link.icon && <span className="mr-1">{link.icon}</span>}
                  {link.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;