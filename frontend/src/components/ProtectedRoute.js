import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      // Removed unused storedUser variable
      
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/validate", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const isAdminAuthorized = !adminOnly || (adminOnly && response.data.user?.isAdmin);
        setIsAuthorized(isAdminAuthorized);
        
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [adminOnly, location.pathname]);

  if (isValidating) {
    return <div className="auth-loading">Verifying session...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;